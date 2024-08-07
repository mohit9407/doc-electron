import React from "react";
import HistoryTable from "./patient-history-table";

const EditPatientHistory = ({
  patientInfo,
  deleteHistoryHandler,
  updatePatientHistory,
}) => {
  const historyWithDateTime = patientInfo?.historyInfo?.map((historyObj) => {
    const localDate = new Date(historyObj.date);
    const localDateStr = localDate.toLocaleDateString();
    const localTimeStr = localDate.toLocaleTimeString();
    return {
      ...historyObj,
      displayDate: `${localDateStr} ${localTimeStr}`,
    };
  });

  return (
    <>
      <HistoryTable
        data={historyWithDateTime}
        deleteHistoryHandler={deleteHistoryHandler}
        updatePatientHistory={updatePatientHistory}
      />
    </>
  );
};

export default EditPatientHistory;
