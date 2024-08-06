import HistoryTable from "./patient-history-table";

const EditPatientHistory = ({ setPatientInfo, patientInfo }) => {
  const historyData = [
    {
      id: "123",
      isDeleted: false,
      chiefComplaints: "11",
      allergicHistory: "11",
      pastTreatmentReceived: "11",
      examinationFindings: "111",
      investigationAdvice: "1111",
      date: "2024-08-05T17:12:30.723Z",
    },
    {
      id: "1234",
      isDeleted: false,
      chiefComplaints: "11",
      allergicHistory: "11",
      pastTreatmentReceived: "11",
      examinationFindings: "111",
      investigationAdvice: "1111",
      date: "2024-08-05T17:12:30.723Z",
    },
    {
      id: "12345",
      isDeleted: false,
      chiefComplaints: "11",
      allergicHistory: "11",
      pastTreatmentReceived: "11",
      examinationFindings: "111",
      investigationAdvice: "1111",
      date: "2024-08-05T17:12:30.723Z",
    },
  ];
  const historyWithDateTime = historyData.map((historyObj) => {
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
      <HistoryTable data={historyWithDateTime} />
    </>
  );
};

export default EditPatientHistory;
