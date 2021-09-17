import React, { useState, useContext } from "react";

const ManageCropContext = React.createContext(null);

export const ManageCropProvider = ({ children }) => {
  const [cropToGrowDetails, setCropToGrowDetails] = useState({
    cropName: "",
    month: "",
    action: "",
    variety: "", //crop type
    cropVariety: "", //user variety
    monthIndex: 0,
    cropId: "",
    fromJobs: false,
    fromJobHistory: false,
    category: "",
    jobId: "",
    jobDate: "",
    job_type: "PENDING",
    jobStatus: "",
    currentlySetToRemind: false,
    currentlySetToRemindStage: "",
    growItStarted: "",
    sowItDate: "",
    plantItDate: "",
    harvestItStartDate: "",
    harvestItEndDate: "",
    editCropName: false,
    stageOneComplete: false,
    stageTwoComplete: false,
    stageThreeComplete: false,
      notNewCalendarSow: false,
      notNewCalendarPlant: false,
      notNewCalendarHarvest: false,
      addedNewCrop: false,
  });

  const [endHarvest, setEndharvest] = useState(false);

  const [growInMonthIndex, setGrowInMonthIndex] = useState(0);

  const cleanContextState = () => {
    setCropToGrowDetails((prevState) => ({
      cropName: "",
      month: "",
      action: "",
      variety: "", //crop type
      cropVariety: "", //user variety
      monthIndex: 0,
      cropId: "",
      fromJobs: false,
      fromJobHistory: false,
      category: "",
      jobId: "",
      jobDate: "",
      job_type: "",
      jobStatus: "",
      currentlySetToRemind: false,
      currentlySetToRemindStage: "",
      growItStarted: "",
      sowItDate: "",
      plantItDate: "",
      harvestItStartDate: "",
      harvestItEndDate: "",
      editCropName: false,
      stageOneComplete: false,
      stageTwoComplete: false,
      stageThreeComplete: false,
      notNewCalendarSow: false,
        notNewCalendarPlant: false,
        notNewCalendarHarvest: false,
        addedNewCrop: false,
    }));

    setEndharvest(false);
  };

  const updateCropToGrowDetails = (info) => {
    setCropToGrowDetails((prevState) => ({
      ...cropToGrowDetails,
      ...info,
    }));
  };
  const values = {
    data: { cropToGrowDetails, endHarvest, growInMonthIndex },
    actions: {
      updateCropToGrowDetails,
      setEndharvest,
      cleanContextState,
      setGrowInMonthIndex,
    },
  };
  return (
    <ManageCropContext.Provider value={values}>
      {children}
    </ManageCropContext.Provider>
  );
};

export const useManageCropContext = () => useContext(ManageCropContext);

export default ManageCropContext;
