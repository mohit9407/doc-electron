import React from "react";
import HistoryTable from "./patient-history-table";
import { dateFormat } from "../../lib/utils";

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
        displayDate: dateFormat(historyObj.date),
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