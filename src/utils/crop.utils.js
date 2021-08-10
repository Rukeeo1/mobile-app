export const getCropCardData = (cropCycleDetails, cropSteps, activeState) => {
  let cropData;
  const { plant_summary, plant_tip, harvest_summary, harvest_tip } =
    cropCycleDetails || {};

  if (activeState === 0) {
    cropData = {
      title: "How to Sow Seeds",
      summary: cropCycleDetails?.sow_summary,
      tip: cropCycleDetails?.sow_tip,
      steps: cropSteps?.crops?.filter((step) => step.step_type === "SOW"),
    };
  }
  if (activeState === 1) {
    cropData = {
      title: "Keep it Growing",
      summary: plant_summary,
      tip: plant_tip,
      steps: cropSteps?.crops?.filter((step) => step.step_type === "PLANT"),
    };
  }

  if (activeState === 2) {
    cropData = {
      title: "How to Harvest",
      summary: harvest_summary,
      tip: harvest_tip,
      steps: cropSteps?.crops?.filter((step) => step.step_type === "HARVEST"),
    };
  }

  return cropData;
};

export const getCropStepsBasedOnActiveScreen = (steps, activeStep) => {
  const { crops } = steps;
  if (activeStep === 0) {
    return crops?.filter((step) => step.step_type === "SOW");
  }
};
