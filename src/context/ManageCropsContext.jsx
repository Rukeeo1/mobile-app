import React, { useState } from 'react';

const ManageCropContext = React.createContext(null);

export const ManageCropProvider = ({ children }) => {
  const [cropToGrowDetails, setCropToGrowDetails] = useState({
    cropName: '',
    month: '',
    action: 'Sow',
    variety: '',
    monthIndex: 0,
    cropId: '',
    fromJobs: false,
    cropType:'',
    jobId: '',
  });

  const [endHarvest, setEndharvest] = useState(false);

  const [growInMonthIndex, setGrowInMonthIndex] = useState(0);

  const cleanContextState = () => {
    setCropToGrowDetails((prevState) => ({
      cropName: '',
      month: '',
      action: 'Sow',
      variety: '',
      monthIndex: 0,
      cropId: '',
      fromJobs: false,
      category:''
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

export default ManageCropContext;
