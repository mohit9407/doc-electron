import { useEffect, useState } from "react";
import { Button } from "./button";

export default function FileUpload({ details = () => {} }) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    handleFileUpload();
  }, [file]);

  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
    localStorage.setItem("isDataRestored", true);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      const jsonData = JSON.parse(event.target.result);

      const patientList = await global.api.sendSync("recoveryPatientInfo", {
        ...jsonData,
      });

      if (patientList.data.status === 200) {
        details();
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center">
      <Button
        className="scale-90 mt-auto mb-auto mr-2.5 ml-0"
        variant="outline"
      >
        <input
          type="file"
          accept=".json"
          hidden
          id="actual-btn"
          onChange={handleFileChange}
        />
        <label for="actual-btn">Restore</label>
      </Button>
    </div>
  );
}
