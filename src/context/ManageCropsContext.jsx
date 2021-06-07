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
    jobId: ''
  });

  const [endHarvest, setEndharvest] = useState(false);

  const cleanContextState = () => {
    setCropToGrowDetails((prevState) => ({
      cropName: '',
      month: '',
      action: 'Sow',
      variety: '',
      monthIndex: 0,
      cropId: '',
      fromJobs: false,
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
    data: { cropToGrowDetails, endHarvest },
    actions: {
      updateCropToGrowDetails,
      setEndharvest,
      cleanContextState,
    },
  };
  return (
    <ManageCropContext.Provider value={values}>
      {children}
    </ManageCropContext.Provider>
  );
};

export default ManageCropContext;
