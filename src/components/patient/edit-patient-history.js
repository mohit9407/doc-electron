import React from "react";
import HistoryTable from "./patient-history-table";

const EditPatientHistory = ({
  isOpenAddHistory = false,
  setIsOpenAddHistory = () => {},
  patientInfo,
  deleteHistoryHandler,
  updatePatientHistory,
}) => {
  const historyWithDateTime = patientInfo?.historyInfo
    ?.filter((historyObj) => !historyObj.isDeleted)
    .map((historyObj) => {
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
        isOpenAddHistory={isOpenAddHistory}
        setIsOpenAddHistory={setIsOpenAddHistory}
        data={historyWithDateTime?.reverse()}
        deleteHistoryHandler={deleteHistoryHandler}
        updatePatientHistory={updatePatientHistory}
      />
    </>
  );
};

export default EditPatientHistory;
