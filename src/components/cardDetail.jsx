import React, { useContext, useEffect, useState } from "react";

import "../css/cardDetail.css";

import { ErrorIcon } from "../components/empty";
import { carecards } from "../lib/fakeCareCards";
import { ThemeContext } from "../utils/themeContext";
import { UserContext } from "../utils/userContext";
import { SaveButtonComponent } from "./buttonComponent";
import { Loading } from "./loading";
import { errorToast, successToast } from "./toastComponent";

export default function CardDetail({
  isLoading,
  crashed,
  isActive,
  closeCard,
  card,
  reload,
}) {
  // --------------------------------------------------------------------------------------------------------------

  const { theme, applyTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // --------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    setRiskLevel(card.riskLevel ? card.riskLevel : "Select a risk level");
    setBypassSafety(card.bypassSafety);
    setConfinedSpace(card.confinedSpace);
    setDriving(card.driving);
    setEnergyIsolation(card.energyIsolation);
    setHotWork(card.hotWorK);
    setLineOfFire(card.lineOfFire);
    setMachanicalLifting(card.mechanicalLifting);
    setPermitToWork(card.permitToWork);
    setWorkingAtHeight(card.workingAtHeight);
    setCorrectiveAction(card.correctiveAction);
    setEditedBy(card.editedBy ? card.editedBy : "Not edited");
  }, [card]);

  // --------------------------------------------------------------------------------------------------------------

  const riskLevels = ["High", "Medium", "Low"];

  // --------------------------------------------------------------------------------------------------------------

  const [riskLevel, setRiskLevel] = useState("Select a risk level");
  const [bypassSafety, setBypassSafety] = useState(false);
  const [confinedSpace, setConfinedSpace] = useState(false);
  const [driving, setDriving] = useState(false);
  const [energyIsolation, setEnergyIsolation] = useState(false);
  const [hotWork, setHotWork] = useState(false);
  const [lineOfFire, setLineOfFire] = useState(false);
  const [mechanicalLifting, setMachanicalLifting] = useState(false);
  const [permitToWork, setPermitToWork] = useState(false);
  const [workingAtHeight, setWorkingAtHeight] = useState(false);
  const [correctiveAction, setCorrectiveAction] = useState("");
  const [editedBy, setEditedBy] = useState("Not edited");
  const [isSaving, setIsSaving] = useState(false);

  const saveCard = async () => {
    setIsSaving(true);

    try {
      // Find the card in the dataset
      const cardIndex = carecards.findIndex((c) => c.cardID === card.cardID);

      if (cardIndex === -1) {
        setIsSaving(false);
        errorToast(`Card No. ${card.cardID} not found.`);
        return;
      }

      // Update the card in the dataset
      carecards[cardIndex] = {
        ...carecards[cardIndex],
        riskLevel:
          riskLevel !== "Select a risk level"
            ? riskLevel
            : carecards[cardIndex].riskLevel,
        bypassSafety: bypassSafety,
        confinedSpace: confinedSpace,
        driving: driving,
        energyIsolation: energyIsolation,
        hotWork: hotWork,
        lineOfFire: lineOfFire,
        mechanicalLifting: mechanicalLifting,
        permitToWork: permitToWork,
        workingAtHeight: workingAtHeight,
        correctiveAction: correctiveAction,
        editedBy: `${user.firstname} ${user.lastname}`,
      };

      setIsSaving(false);
      successToast(`Card No. ${card.cardID} saved successfully.`);
      return;
    } catch (error) {
      setIsSaving(false);
      console.log("Error saving card:", error);
      errorToast("An error occurred. Please try again later.");
      return;
    }
  };

  // --------------------------------------------------------------------------------------------------------------

  const [isMarkingAsPending, setIsMarkingAsPending] = useState(false);
  const [isMarkingAsCompleted, setIsMarkingAsCompleted] = useState(false);
  const [isMarkingAsUncompleted, setIsMarkingAsUncompleted] = useState(false);

  const markAsPending = async (cc) => {
    setIsMarkingAsPending(true);

    try {
      // Find the card
      const cardIndex = carecards.findIndex((card) => card.cardID === cc);

      if (cardIndex === -1) {
        setIsMarkingAsPending(false);
        errorToast(`Card No. ${cc} not found.`);
        return;
      }

      // Update the card's status
      carecards[cardIndex] = {
        ...carecards[cardIndex],
        status: "Pending",
      };

      setIsMarkingAsPending(false);
      successToast(`Card No. ${cc} marked as Pending.`);
      closeCard();
      reload(); // Reload the UI if necessary
      return;
    } catch (error) {
      setIsMarkingAsPending(false);
      console.log("Error marking card as Pending:", error);
      errorToast("An error occurred. Please try again later.");
      return;
    }
  };

  const markAsCompleted = async (cc) => {
    setIsMarkingAsCompleted(true);

    try {
      // Find the card
      const cardIndex = carecards.findIndex((card) => card.cardID === cc);

      if (cardIndex === -1) {
        setIsMarkingAsCompleted(false);
        errorToast(`Card No. ${cc} not found.`);
        return;
      }

      // Update the card's status
      carecards[cardIndex] = {
        ...carecards[cardIndex],
        status: "Completed",
      };

      setIsMarkingAsCompleted(false);
      successToast(`Card No. ${cc} marked as Completed.`);
      closeCard();
      reload(); // Reload the UI if necessary
      return;
    } catch (error) {
      setIsMarkingAsCompleted(false);
      console.log("Error marking card as Completed:", error);
      errorToast("An error occurred. Please try again later.");
      return;
    }
  };

  const markAsUncompleted = async (cc) => {
    setIsMarkingAsUncompleted(true);

    try {
      // Find the card
      const cardIndex = carecards.findIndex((card) => card.cardID === cc);

      if (cardIndex === -1) {
        setIsMarkingAsUncompleted(false);
        errorToast(`Card No. ${cc} not found.`);
        return;
      }

      // Update the card's status
      carecards[cardIndex] = {
        ...carecards[cardIndex],
        status: "Uncompleted",
      };

      setIsMarkingAsUncompleted(false);
      successToast(`Card No. ${cc} marked as Uncompleted.`);
      closeCard();
      reload(); // Reload the UI if necessary
      return;
    } catch (error) {
      setIsMarkingAsUncompleted(false);
      console.log("Error marking card as Uncompleted:", error);
      errorToast("An error occurred. Please try again later.");
      return;
    }
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

  return (
    <div
      className={isActive ? "card-detail theme active" : "card-detail theme"}
    >
      <div className="top">
        <i className="fas fa-xmark" onClick={closeCard}></i>
        <button className="save-btn" onClick={() => saveCard()}>
          {isSaving ? <Loading /> : "Save"}
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : crashed ? (
        <ErrorIcon name={"Something went wrong"} />
      ) : (
        <>
          <span className="card-number text-theme">{card.cardID}</span>

          <div className="card-detail-render">
            <div className="user-info">
              {/* <img src={`../profilePictures/${profilePic}`} alt='user profile' /> */}
              <div>
                <h3 className="text-theme">
                  {card.observerFirstname + " " + card.observerLastname}
                </h3>
                <a>{card.observerEmail}</a>
                <span className="text-theme">{card.observerDepartment}</span>
              </div>
            </div>

            <hr></hr>

            <div className="field">
              <label className={"title"}>Country</label>
              <input
                type="text"
                title="country"
                defaultValue={card.observerCountry}
                readOnly={true}
              />
            </div>

            <div className="field">
              <label className={"title"}>Location</label>
              <input
                type="text"
                title="location"
                defaultValue={card.observerLocation}
                readOnly={true}
              />
            </div>

            <div className="field">
              <label className={"title"}>Observation Type</label>
              <input
                type="text"
                title="observation_type"
                defaultValue={card.observationType}
                readOnly={true}
              />
            </div>

            <div className="field">
              <label className={"title"}>Observation</label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={card.peopleActs === 1}
                  readOnly={true}
                  defaultValue={card.peopleActs}
                />
                People | Acts
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={card.condition === 1}
                  readOnly={true}
                  defaultValue={card.condition}
                />
                Condition
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={card.environmental === 1}
                  readOnly={true}
                  defaultValue={card.environmental}
                />
                Environmental
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={card.assetsEquipment === 1}
                  readOnly={true}
                  defaultValue={card.assetsEquipment}
                />
                Asset | Equipment
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={card.procedureSystem === 1}
                  readOnly={true}
                  defaultValue={card.procedureSystem}
                />
                Procudeure | System
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={card.quality === 1}
                  readOnly={true}
                  defaultValue={card.quality}
                />
                Quality
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={card.security === 1}
                  readOnly={true}
                  defaultValue={card.security}
                />
                Security
              </label>
            </div>

            <div className="field">
              <label className={"title"}>Description</label>
              <textarea
                readOnly={true}
                defaultValue={card.description ? card.description : ""}
                rows={6}
              />
            </div>

            <div className="field">
              <label className={"title"}>Action Taken</label>
              <p className="text-theme">
                {card.actionsTaken ? card.actionsTaken : "N/A"}
              </p>
            </div>

            <div className="field">
              <label className={"title"}>Suggestion</label>
              <textarea
                readOnly={true}
                defaultValue={card.suggestion ? card.suggestion : ""}
                rows={6}
              />
            </div>

            <hr></hr>

            <div className="field">
              <label className={"title"}>Potential Risk Level</label>
              <select
                className="text-theme"
                value={riskLevel ? riskLevel : "Select a risk level"}
                onChange={(e) => setRiskLevel(e.target.value)}
                title="risk level"
              >
                <option
                  defaultValue={
                    card.riskLevel ? card.riskLevel : "Select a risk level"
                  }
                  hidden
                >
                  {card.riskLevel ? card.riskLevel : "Select a risk level"}
                </option>
                {riskLevels.map((risk, index) => {
                  return (
                    <option
                      className="theme text-theme"
                      key={index}
                      defaultValue={risk}
                    >
                      {risk}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="field">
              <label className={"title"}>Affected IOGP Rule(s)</label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={bypassSafety}
                  value={bypassSafety}
                  onChange={() => setBypassSafety(!bypassSafety)}
                />
                Bypass Safety Controls
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={lineOfFire}
                  value={lineOfFire}
                  onChange={() => setLineOfFire(!lineOfFire)}
                />
                Line of Fire
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={workingAtHeight}
                  value={workingAtHeight}
                  onChange={() => setWorkingAtHeight(!workingAtHeight)}
                />
                Working At Height
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={hotWork}
                  value={hotWork}
                  onChange={() => setHotWork(!hotWork)}
                />
                Hot Work
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={confinedSpace}
                  value={confinedSpace}
                  onChange={() => setConfinedSpace(!confinedSpace)}
                />
                Confined Space
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={driving}
                  value={driving}
                  onChange={() => setDriving(!driving)}
                />
                Driving
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={permitToWork}
                  value={permitToWork}
                  onChange={() => setPermitToWork(!permitToWork)}
                />
                Permit To Work
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={energyIsolation}
                  value={energyIsolation}
                  onChange={() => setEnergyIsolation(!energyIsolation)}
                />
                Energy Isolation
              </label>
              <label className="check-box text-theme">
                <input
                  type="checkbox"
                  checked={mechanicalLifting}
                  value={mechanicalLifting}
                  onChange={() => setMachanicalLifting(!mechanicalLifting)}
                />
                Mechanical Lifting
              </label>
            </div>

            <hr></hr>

            <div className="field">
              <label className={"title"}>Corrective Action Taken</label>
              <textarea
                rows={6}
                value={correctiveAction}
                onChange={(e) => setCorrectiveAction(e.target.value)}
              />
            </div>

            <hr></hr>

            <span className="date">{`${formatDate(card.dateAdded)}-${formatTime(
              card.dateAdded
            )}`}</span>
            <span className="date">Edited by: {editedBy}</span>
          </div>

          <div className="cta">
            {card.status === "Pending" ? (
              <>
                <SaveButtonComponent
                  isLoading={isMarkingAsCompleted}
                  title={"Mark as Completed"}
                  bgColor={"#00c993"}
                  color={"#fff"}
                  onclick={() => markAsCompleted(card.cardID)}
                />
                <SaveButtonComponent
                  isLoading={isMarkingAsUncompleted}
                  title={"Mark as Uncompleted"}
                  bgColor={"#5893ff"}
                  color={"#fff"}
                  onclick={() => markAsUncompleted(card.cardID)}
                />
              </>
            ) : card.status === "Completed" ? (
              <>
                <SaveButtonComponent
                  isLoading={isMarkingAsPending}
                  title={"Mark as Pending"}
                  bgColor={"#ff841f"}
                  color={"#fff"}
                  onclick={() => markAsPending(card.cardID)}
                />
                <SaveButtonComponent
                  isLoading={isMarkingAsUncompleted}
                  title={"Mark as Uncompleted"}
                  bgColor={"#5893ff"}
                  color={"#fff"}
                  onclick={() => markAsUncompleted(card.cardID)}
                />
              </>
            ) : (
              <>
                <SaveButtonComponent
                  isLoading={isMarkingAsPending}
                  title={"Mark as Pending"}
                  bgColor={"#ff841f"}
                  color={"#fff"}
                  onclick={() => markAsPending(card.cardID)}
                />
                <SaveButtonComponent
                  isLoading={isMarkingAsCompleted}
                  title={"Mark as Completed"}
                  bgColor={"#00c993"}
                  color={"#fff"}
                  onclick={() => markAsCompleted(card.cardID)}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
