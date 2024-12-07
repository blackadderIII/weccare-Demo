import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { carecards, recentcards } from "../lib/fakeCareCards";
import { faker } from "@faker-js/faker";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

// styling
import "../css/dashboard.css";

// components
import {
  TitleComponentH1,
  TitleComponentH3,
} from "../components/titleComponent";
import { LoadingComponentGrey } from "../components/loading";
import OverviewTab from "../components/overviewTab";
import Legend from "../components/legend";

// utils
import { ThemeContext } from "../utils/themeContext";
import { UserContext } from "../utils/userContext";
import { color } from "../utils/color";
import { errorToast } from "../components/toastComponent";

export default function Dashboard() {
  const navigate = useNavigate();

  const { theme, applyTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // --------------------------------------------------------------------------------------------------------------

  const [date, setDate] = useState(null);

  // get date
  useEffect(() => {
    const getDate = () => {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const currentDate = new Date();
      const dayOfWeek = daysOfWeek[currentDate.getDay()];
      const dayOfMonth = currentDate.getDate();
      const month = monthsOfYear[currentDate.getMonth()];
      const year = currentDate.getFullYear();

      setDate(`${dayOfWeek}, ${dayOfMonth} ${month} ${year}`);
    };
    getDate();
  }, []);

  const [totalCards, setTotalCards] = useState(0);
  const [pendingCards, setPendingCards] = useState(0);
  const [completedCards, setCompletedCards] = useState(0);
  const [uncompletedCards, setUncompletedCards] = useState(0);

  // get card numbers
  useEffect(() => {
    const getCards = () => {
      try {
        // Calculate totals based on the local carecards dataset
        const totalCards = carecards.length;
        const pendingCards = carecards.filter(
          (card) => card.status === "Pending"
        ).length;
        const completedCards = carecards.filter(
          (card) => card.status === "Completed"
        ).length;
        const uncompletedCards = carecards.filter(
          (card) => card.status === "Uncompleted"
        ).length;

        // Set the states with calculated values
        setTotalCards(totalCards);
        setPendingCards(pendingCards);
        setCompletedCards(completedCards);
        setUncompletedCards(uncompletedCards);
      } catch (error) {
        console.error("Error processing cards:", error);
        errorToast("An error occurred while processing cards.");
      }
    };

    getCards(); // Call the function to process local data
  }, [carecards]); // Add carecards as a dependency to re-run when dataset changes

  // --------------------------------------------------------------------------------------------------------------

  const [isDesignationsLoading, setIsDesignationsLoading] = useState(false);
  const [designationData, setDesignationData] = useState([]);

  // get designation info
  useEffect(() => {
    setIsDesignationsLoading(true);
    // Replace this with your local dataset
    const designationData = { numbers: [2, 16, 1, 28, 17, 13, 1, 51] };
    setDesignationData(designationData.numbers);
    setTimeout(() => {
      setIsDesignationsLoading(false);
    }, 1500);
  }, []); // Empty dependency array ensures it runs once on mount

  const designations = [
    "ExCo Member",
    "Manager",
    "Head of Department",
    "Supervisor",
    "Graduate Trainee",
    "National Service Personel",
    "Visitor",
    "Other",
  ];

  const designationInfo = {
    labels: designations,
    datasets: [
      {
        data: designationData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 159, 64)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 205, 86)",
        ],
        borderWidth: 1,
        borderRadius: 7,
      },
    ],
  };

  // --------------------------------------------------------------------------------------------------------------

  const [departments, setDepartments] = useState([]);
  const [cardsByDepartment, setCardByDepartment] = useState([]);
  const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);

  // getDepartments
  useEffect(() => {
    setIsDepartmentLoading(true);
    const response = {
      departments: [
        "Business Development",
        "Client Rep",
        "Commercial & Contracts",
        "Design and Engineering",
        "Finance & Accounts",
        "HR & Admin",
        "HSE",
        "HSSEQ",
        "IT",
        "Logistics and Stores",
        "Maintenance",
        "Operations",
        "Planning",
        "Procurement",
        "Projects",
        "QAQC",
        "Security",
        "Visitors",
        "Workshop",
      ],
      numbers: [0, 0, 4, 10, 3, 7, 30, 7, 15, 4, 3, 6, 10, 1, 3, 13, 1, 0, 26],
    };
    const result = response.departments;
    result.sort((a, b) => a.localeCompare(b));
    setDepartments(result);
    setCardByDepartment(response.numbers);
    setTimeout(() => {
      setIsDepartmentLoading(false);
    }, 1500);
    return;
  }, []);

  const departmentData = {
    labels: departments,
    datasets: [
      {
        id: 0,
        data: cardsByDepartment,
        fill: true,
        backgroundColor: "#39b54a2c",
        pointBackgroundColor: "#ffffff",
        borderColor: "#39b54a",
        pointRadius: 5,
        tension: 0.35,
        borderWidth: 3,
      },
    ],
  };

  // --------------------------------------------------------------------------------------------------------------

  const [isObservationTypeEmpty, setIsObservationTypeEmpty] = useState(false);
  const [observationTypeData, setObservationTypeData] = useState([]);

  // get observation data
  useEffect(() => {
    const response = {
      improvementCount: 8,
      positiveCount: 8,
      substandardCount: 14,
    };

    setObservationTypeData([
      response.improvementCount,
      response.positiveCount,
      response.substandardCount,
    ]);
    setTimeout(() => {
      setIsObservationTypeEmpty(false);
    }, 1500);
  }, []);

  const observationType = {
    labels: ["Improvement", "Positive", "Substandard Hazard"],
    datasets: [
      {
        id: 1,
        data: isObservationTypeEmpty ? [1] : observationTypeData,
        backgroundColor: isObservationTypeEmpty
          ? "#cccccc"
          : ["#51e3bc", "#ffb981", "#5893ff"],
        cutout: "50%",
        borderWidth: 2,
        borderColor: theme === "light" ? "#fff" : color.darkComponent,
      },
    ],
  };

  // --------------------------------------------------------------------------------------------------------------

  const [isIOGPLoading, setIsIOGPLoading] = useState(false);
  const [iogpImpactData, setIOGPImpactData] = useState([]);

  // get iogp impact level
  useEffect(() => {
    setIsIOGPLoading(true);
    const response = {
      numbers: [5, 6, 3, 2, 4, 1, 3, 6, 2],
    };

    setIOGPImpactData(response.numbers);
    setTimeout(() => {
      setIsIOGPLoading(false);
    }, 1500);
  }, []);

  const iogpRules = [
    "Bypass Safety Controls",
    "Line Of Fire",
    "Working At Height",
    "Hot Work",
    "Driving",
    "Confined Space",
    "Permit To Work",
    "Energy Isolation",
    "Mechanical Lifting",
  ];
  iogpRules.sort((a, b) => a.localeCompare(b));

  const iogpImpactLevels = {
    labels: iogpRules,
    datasets: [
      {
        data: iogpImpactData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 159, 64)",
          "rgb(54, 162, 235)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
        borderRadius: 7,
      },
    ],
  };

  // --------------------------------------------------------------------------------------------------------------

  const [isObservationLoading, setIsObservationLoading] = useState(false);
  const [observationData, setObservationData] = useState([]);

  useEffect(() => {
    setIsObservationLoading(true);

    const response = {
      numbers: [30, 22, 10, 8, 18, 27, 34],
    };

    // Set the observation data and then update the loading state
    setObservationData(response.numbers);
    setTimeout(() => {
      setIsObservationLoading(false);
    }, 1500);
  }, []);

  const Labelobservations = [
    "Peoples|Acts",
    "Condition",
    "Environmental",
    "Assets | Equipment",
    "Procedure | System",
    "Quality",
    "Security",
  ];
  Labelobservations.sort((a, b) => a.localeCompare(b));

  const observation = {
    labels: Labelobservations,
    datasets: [
      {
        id: 0,
        data: observationData,
        pointBackgroundColor: "#ffffff",
        borderColor: "#39b54a",
        pointRadius: 5,
        borderWidth: 3,
      },
    ],
  };

  // --------------------------------------------------------------------------------------------------------------

  const [riskAssessmentData, setRiskAssessmentData] = useState([]);

  // get risks assessments
  useEffect(() => {
    setIsObservationLoading(true);
    const response = {
      numbers: [9, 10, 5],
    };
    setRiskAssessmentData(response.numbers);
    setTimeout(() => {
      setIsObservationLoading(false);
    }, 1500);
  }, []);

  const riskAssessments = ["High", "Medium", "Low"];

  const riskAssessment = {
    labels: riskAssessments,
    datasets: [
      {
        data: riskAssessmentData,
        backgroundColor: ["#ffa3c0", "#fecd8c", "#a2d0fd"],
        borderColor: ["#eb034c", "#fe9100", "#0580fc"],
        borderWidth: 2,
        borderRadius: 7,
      },
    ],
  };

  // --------------------------------------------------------------------------------------------------------------

  const [isRecentCardsLoading, setIsRecentCardsLoading] = useState(false);
  const [recentCardsData, setRecentCardsData] = useState([]);
  const [profilePictures, setProfilePictures] = useState([]);

  // get recent cards
  useEffect(() => {
    setIsRecentCardsLoading(true);
    const response = recentcards;
    setProfilePictures(response.profilePictures);
    setRecentCardsData(response.cards);
    setTimeout(() => {
      setIsRecentCardsLoading(false);
    }, 1500);
  }, []);

  // --------------------------------------------------------------------------------------------------------------

  const formatDate = (dateString) => {
    const newDate = new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return newDate;
  };

  // --------------------------------------------------------------------------------------------------------------

  return (
    <section className="dashboard">
      <div className="today">
        <h3 className="text-theme">{date}</h3>
      </div>

      <div className="greeting">
        <TitleComponentH1 title={`Hello, ${user.firstname} 👋`} />
      </div>

      <section className="row-00">
        <div className="overview-tabs">
          <div className="totalCards">
            <div className="info">
              <h2 className="text-theme">{totalCards}</h2>
              <span className="text-theme">
                total
                <br />
                cards
              </span>
            </div>
          </div>
          <OverviewTab
            onclick={() => {
              navigate("/pendingCards");
            }}
            bgColor={"#ffb981"}
            illustration={"fad fa-hourglass"}
            illustrationColor={"#ff841f"}
            amount={pendingCards}
            name={"Pending Cards"}
            percentage={((pendingCards / totalCards) * 100).toFixed(1) + "%"}
          />
          <OverviewTab
            onclick={() => {
              navigate("/completedCards");
            }}
            bgColor={"#51e3bc"}
            illustration={"fas fa-check"}
            illustrationColor={"#00c993"}
            amount={completedCards}
            name={"Completed Cards"}
            percentage={((completedCards / totalCards) * 100).toFixed(1) + "%"}
          />
          <OverviewTab
            onclick={() => {
              navigate("/uncompletedCards");
            }}
            bgColor={"#5893ff"}
            illustration={"fas fa-xmark"}
            illustrationColor={"#004ddb"}
            amount={uncompletedCards}
            name={"Uncompleted Cards"}
            percentage={
              ((uncompletedCards / totalCards) * 100).toFixed(1) + "%"
            }
          />
        </div>
      </section>

      <section className="row-02">
        <section className="left-col">
          <div className="iogp-overview theme">
            <TitleComponentH3 title={"Designation Overview"} />

            <div className="h-chart-container">
              {isDesignationsLoading ? (
                <LoadingComponentGrey />
              ) : (
                <Bar
                  data={designationInfo}
                  options={{
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    scales: {
                      x: {
                        beginAtZero: true,
                        suggestedMax: Math.max(...iogpImpactData) + 1,
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </section>

        <section className="right-col">
          <div className="department-overview theme">
            <TitleComponentH3 title={"Departments Overview"} />
            <div className="area-chart-container">
              {isDepartmentLoading ? (
                <LoadingComponentGrey />
              ) : (
                <Line
                  data={departmentData}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        suggestedMax: Math.max(...cardsByDepartment) + 2,
                      },
                    },
                  }}
                  className="area-chart"
                />
              )}
            </div>
          </div>
        </section>
      </section>

      <section className="row-01">
        <section className="left-col">
          <div className="multi-charts">
            <div className="iogp-overview theme">
              <TitleComponentH3 title={"IOGP Rules Impact Level"} />

              <div className="h-chart-container">
                {isIOGPLoading ? (
                  <LoadingComponentGrey />
                ) : (
                  <Bar
                    data={iogpImpactLevels}
                    options={{
                      maintainAspectRatio: false,
                      indexAxis: "y",
                      scales: {
                        x: {
                          beginAtZero: true,
                          suggestedMax: Math.max(...iogpImpactData) + 1,
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>

            <div className="observation-overview theme">
              <TitleComponentH3 title={"Observation Category"} />

              <div className="line-chart-container">
                {isObservationLoading ? (
                  <LoadingComponentGrey />
                ) : (
                  <Line
                    data={observation}
                    options={{
                      maintainAspectRatio: false,
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                          suggestedMax: Math.max(...observationData) + 2,
                        },
                      },
                    }}
                    className="area-chart"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="recent-table theme">
            <TitleComponentH3 title={"Recent Care Cards"} />
            <div className="recent-table-container">
              {isRecentCardsLoading ? (
                <LoadingComponentGrey />
              ) : (
                <table>
                  <thead>
                    <tr className="theme">
                      <th></th>
                      <th className="text-theme">User Info</th>
                      <th className="text-theme">Department</th>
                      <th className="text-theme">Location</th>
                      <th style={{ textAlign: "center" }}></th>
                      <th className="text-theme">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCardsData.map((card, index) => {
                      {
                        /* const pic = profilePictures.find(pic => pic.email === card.observerEmail); */
                      }
                      {
                        /* console.log(pic) */
                      }
                      return (
                        <tr key={index}>
                          <td>{card.cardID}</td>
                          <td>
                            <div className="user-info">
                              <img
                                src={faker.image.urlPicsumPhotos()}
                                alt="profile"
                              />
                              <div className="user-info-details">
                                <h4 className="text-theme">
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
                          <td style={{ textAlign: "center" }}>
                            <div className={`status ${card.status}`}>
                              {card.status}
                            </div>
                          </td>
                          <td>{formatDate(card.dateAdded)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>

        <section className="right-col">
          <div className="card-chart-overview theme">
            <TitleComponentH3 title={"Type of Observation Overview"} />

            <div className="doughnut-chart-container">
              <Doughnut data={observationType} />
              <div className="info">
                <h2 className="text-theme">{totalCards}</h2>
                <span className="text-theme">
                  total
                  <br />
                  cards
                </span>
              </div>
            </div>

            <div className="legend-container">
              <Legend backgroundColor={"#00c993"} name={"Improvement"} />
              <Legend backgroundColor={"#ffb981"} name={"Positive"} />
              <Legend backgroundColor={"#5893ff"} name={"Substandard Hazard"} />
            </div>
          </div>

          <div className="risk-assessment-chart-overview theme">
            <TitleComponentH3 title={"Risk Assessment Overview"} />

            <div className="vertical-bar-chart-container">
              <Bar
                data={riskAssessment}
                className="vertical-bar-chart"
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      ticks: {
                        beginAtZero: true,
                      },
                      suggestedMax: Math.max(...riskAssessmentData) + 1,
                    },
                  },
                }}
              />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
