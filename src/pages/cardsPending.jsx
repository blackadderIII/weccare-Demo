import { faker } from "@faker-js/faker";
import exceljs from 'exceljs';
import { saveAs } from 'file-saver';
import React, { useContext, useEffect, useState } from "react";
import { carecards } from "../lib/fakeCareCards";

// styling
import "../css/cards.css";

// components
import CardDetail from "../components/cardDetail";
import SearchComponent from "../components/searchComponent";
import { TitleComponentH1 } from "../components/titleComponent";

// utils
import Empty, { ErrorIcon, NotFoundIcon } from "../components/empty";
import LoadingComponent from "../components/loading";
import {
  errorToast,
  successToast
} from "../components/toastComponent";
import { ThemeContext } from "../utils/themeContext";


export default function CardsPending() {
  const { theme, applyTheme } = useContext(ThemeContext);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // --------------------------------------------------------------------------------------------------------------

  const [pendingCardsData, setPendingCardData] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const { Workbook } = exceljs

  // Fetch cards
  useEffect(() => {
    setIsLoading(true);
    fetchCards()
  }, []);


  const fetchCards = () =>{
    setTimeout(() => {
        const pendingCards = carecards.filter(
          (card) => card.status === "Pending"
        );
        setPendingCardData(pendingCards);
        setIsLoading(false);
      }, 2500);
  }
  // --------------------------------------------------------------------------------------------------------------

  const [card, setCard] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [profilePic, setProfilePic] = useState()
  const [crashed, setCrashed] = useState(false);
  const [isCardLoading, setIsCardLoading] = useState(false);

  const viewCard = async (cc) => {
    setIsCardLoading(true);
    setIsActive(true);

    try {
      const card = carecards.find((card) => card.cardID === cc);

      if (!card) {
        throw new errorToast("Card not found");
      }

      setCard(card);
      setIsCardLoading(false);
      return;
    } catch (error) {
      setIsCardLoading(false);
      setCrashed(true);
      errorToast("Can't load that card now. Please try again later");
      console.log("error loading card info", error);
      return;
    }
  };

  const closeCard = () => {
    setIsActive(false);
    setTimeout(() => setCard([]), 300);
  };

  // --------------------------------------------------------------------------------------------------------------

  const formatDate = (dateString) => {
    const newDate = new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const formatTime = (dateString) => {
    const newTime = new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return newTime;
  };

  // --------------------------------------------------------------------------------------------------------------

  // search
  const [searchResult, setSearchResult] = useState();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("cardID");
  const [isSearhing, setIsSearching] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) {
      return; // Prevent searching for empty strings
    }

    setIsSearching(true); // Start search loading state

    try {
      // Filter the local carecards data based on the selected filter and status
      const filteredCards = carecards.filter((card) => {
        let valueToSearch = ""; // Default empty value

        // Handle special filters
        if (filter === "username") {
          // Check both first name and last name separately
          const firstNameMatch = card.observerFirstname
            ?.toLowerCase()
            .includes(search.toLowerCase());
          const lastNameMatch = card.observerLastname
            ?.toLowerCase()
            .includes(search.toLowerCase());
          return (firstNameMatch || lastNameMatch) && card.status === "Pending";
        }

        // Handle other filters (email, department, cardID)
        if (filter === "email") {
          valueToSearch = card.observerEmail?.toLowerCase();
        } else if (filter === "department") {
          valueToSearch = card.observerDepartment?.toLowerCase();
        } else {
          // Default to the selected filter value
          valueToSearch = card[filter]?.toString().toLowerCase();
        }

        // Perform the search for other fields
        return (
          valueToSearch?.includes(search.toLowerCase()) &&
          card.status === "Pending"
        );
      });

      if (filteredCards.length === 0) {
        setIsSearching(false);
        setEmptySearch(true);
        setSearchResult([]);
        return;
      }

      setIsSearching(false); // Stop loading state
      setEmptySearch(false); // Reset empty state
      setSearchResult(filteredCards); // Update search results
    } catch (error) {
      console.log(filter);
      setIsSearching(false); // Stop loading state
      setEmptySearch(false); // Reset empty state
      console.error("Error searching cards:", error);
      errorToast("An error occurred. Please try again later.");
    }
  };

  const checkIsEmpty = (value) => {
    if (!value || value.trim() === "") {
      setEmptySearch(false);
      setSearchResult();
    }
  };

  // --------------------------------------------------------------------------------------------------------------

  const [isExporting, setIsExporting] = useState(false);

  const exportCards = async () => {
    setIsExporting(true);
  
    try {
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Pending Cards');
  
      // Define the columns
      worksheet.columns = [
        { header: 'Card ID', key: 'cardID', width: 15 },
        { header: 'Card Title', key: 'cardTitle', width: 20 },
        { header: 'Observer Firstname', key: 'observerFirstname', width: 20 },
        { header: 'Observer Lastname', key: 'observerLastname', width: 20 },
        { header: 'Observer Email', key: 'observerEmail', width: 30 },
        { header: 'Observer Department', key: 'observerDepartment', width: 20 },
        { header: 'Observer Designation', key: 'observerDesignation', width: 20 },
        { header: 'Observer Country', key: 'observerCountry', width: 15 },
        { header: 'Observer Location', key: 'observerLocation', width: 20 },
        { header: 'Observation Type', key: 'observationType', width: 20 },
        { header: 'People | Acts', key: 'peopleActs', width: 15 },
        { header: 'Condition', key: 'condition', width: 15 },
        { header: 'Environmental', key: 'environmental', width: 15 },
        { header: 'Assets | Equipment', key: 'assetsEquipment', width: 15 },
        { header: 'Procedure | System', key: 'procedureSystem', width: 20 },
        { header: 'Quality', key: 'quality', width: 15 },
        { header: 'Security', key: 'security', width: 15 },
        { header: 'Description', key: 'description', width: 40 },
        { header: 'Actions Taken', key: 'actionsTaken', width: 20 },
        { header: 'Suggestion', key: 'suggestion', width: 30 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Risk Level', key: 'riskLevel', width: 15 },
        { header: 'Corrective Action', key: 'correctiveAction', width: 40 },
        { header: 'Edited By', key: 'editedBy', width: 15 },
        { header: 'Date Added', key: 'dateAdded', width: 20 },
      ];
  
      // Add rows for each pending card
      carecards.filter((card) => card.status === 'Pending')
        .forEach((card) => {
          worksheet.addRow({
            cardID: card.cardID,
            cardTitle: card.cardTitle,
            observerFirstname: card.observerFirstname,
            observerLastname: card.observerLastname,
            observerEmail: card.observerEmail,
            observerDepartment: card.observerDepartment,
            observerDesignation: card.observerDesignation,
            observerCountry: card.observerCountry,
            observerLocation: card.observerLocation,
            observationType: card.observationType,
            peopleActs: card.peopleActs ? 'Yes' : 'No',
            condition: card.condition ? 'Yes' : 'No',
            environmental: card.environmental ? 'Yes' : 'No',
            assetsEquipment: card.assetsEquipment ? 'Yes' : 'No',
            procedureSystem: card.procedureSystem ? 'Yes' : 'No',
            quality: card.quality ? 'Yes' : 'No',
            security: card.security ? 'Yes' : 'No',
            description: card.description,
            actionsTaken: card.actionsTaken,
            suggestion: card.suggestion,
            status: card.status,
            riskLevel: card.riskLevel,
            correctiveAction: card.correctiveAction,
            editedBy: card.editedBy,
            dateAdded: new Date(card.dateAdded).toLocaleString(),
          });
        });
  
      // Format header row
      worksheet.getRow(1).font = { bold: true };
  
      // Generate Excel file
      const buffer = await workbook.xlsx.writeBuffer();
  
      // Save file locally
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Pending_Cards_${new Date().toISOString().slice(0, 10)}.xlsx`);
  
      setIsExporting(false);
      successToast('Pending Cards exported successfully');
    } catch (error) {
      setIsExporting(false);
      errorToast('An error occurred while exporting. Please try again.');
      console.error('Error exporting cards:', error);
    }
  };

  // --------------------------------------------------------------------------------------------------------------

  return (
    <>
      <section className="care-cards">
        <div className="row-01">
          <SearchComponent
            placeholder={"Search Pending Cards..."}
            search={search}
            onSearch={(value) => {
              setSearch(value);
              checkIsEmpty(value);
            }}
            onFilterChange={(value) => setFilter(value)}
            initiateSearch={() => handleSearch()}
          />
        </div>
        <div className="row-02">
          <TitleComponentH1 title={"Pending Care Cards"} />
          <button onClick={() => exportCards()} className="export-btn">
            {isExporting ? (
              <LoadingComponent />
            ) : (
              <>
                Export<i className="fal fa-file-export"></i>
              </>
            )}
          </button>
        </div>
        <div className="row-03">
          {isLoading ? (
            <LoadingComponent />
          ) : isCrashed ? (
            <ErrorIcon name={"Something went wrong"} />
          ) : isEmpty ? (
            <Empty name={"Nothing here yet"} />
          ) : isSearhing ? (
            <LoadingComponent />
          ) : emptySearch ? (
            <NotFoundIcon name={"Oops! Couldn't find that"} />
          ) : (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>User</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Observation Type</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              {searchResult ? (
                <tbody>
                  {searchResult.map((card, index) => {
                    {
                      /* const pic = profilePictures.find(pic => pic.email === card.observerEmail); */
                    }
                    return (
                      <tr onClick={() => viewCard(card.cardID)} key={index}>
                        <td>{card.cardID}</td>
                        <td>
                          <div className="user-info">
                            <img
                              src={faker.image.urlPicsumPhotos()}
                              alt="profile"
                            />
                            <div>
                              <h4>
                                {card.observerFirstname +
                                  " " +
                                  card.observerLastname}
                              </h4>
                              <a href={`mailto:${card.observerEmail}`}>
                                {card.observerEmail}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>{card.observerDepartment}</td>
                        <td>{card.observerLocation}</td>
                        <td>{card.observationType}</td>
                        <td>{formatDate(card.dateAdded)}</td>
                        <td>{formatTime(card.dateAdded)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  {pendingCardsData.map((card, index) => {
                    {
                      /* const pic = profilePictures.find(pic => pic.email === card.observerEmail); */
                    }
                    return (
                      <tr onClick={() => viewCard(card.cardID)} key={index}>
                        <td>{card.cardID}</td>
                        <td>
                          <div className="user-info">
                            <img
                              src={faker.image.urlPicsumPhotos()}
                              alt="profile"
                            />
                            <div>
                              <h4>
                                {card.observerFirstname +
                                  " " +
                                  card.observerLastname}
                              </h4>
                              <a href={`mailto:${card.observerEmail}`}>
                                {card.observerEmail}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>{card.observerDepartment}</td>
                        <td>{card.observerLocation}</td>
                        <td>{card.observationType}</td>
                        <td>{formatDate(card.dateAdded)}</td>
                        <td>{formatTime(card.dateAdded)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          )}
        </div>
      </section>
      <CardDetail
        isActive={isActive}
        closeCard={() => (crashed ? setIsActive(false) : closeCard())}
        isLoading={isCardLoading}
        crashed={crashed}
        card={card}
        reload={() => fetchCards()}
      />
    </>
  );
}
