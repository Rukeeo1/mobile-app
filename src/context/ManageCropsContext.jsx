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
  });

  const updateCropToGrowDetails = (info) => {
    setCropToGrowDetails((prevState) => ({
      ...cropToGrowDetails,
      ...info,
    }));
  };
  const values = {
    data: { cropToGrowDetails },
    actions: {
      updateCropToGrowDetails,
    },
  };
  return (
    <ManageCropContext.Provider value={values}>
      {children}
    </ManageCropContext.Provider>
  );
};

export default ManageCropContext;
