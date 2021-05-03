import React from 'react';

const ManageCropContext = React.createContext(null);

export const ManageCropProvider = ({ children }) => {
  const values = {
    data: {},
    actions: {},
  };
  return (
    <ManageCropContext.Provider value={values}>
      {children}
    </ManageCropContext.Provider>
  );
};

export default ManageCropContext;
