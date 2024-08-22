import React from "react";
import HistoryTable from "./patient-history-table";
import moment from "moment";

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
      return {
        ...historyObj,
        displayDate: moment(historyObj.date).format("DD-MM-YYYY HH:mm:ss a"),
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
