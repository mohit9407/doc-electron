import { useEffect, useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);

  useEffect(() => {
    handleFileUpload();
  }, [file]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      const jsonData = JSON.parse(event.target.result);

      await global.api.sendSync("recoveryPatientInfo", {
        patientData: jsonData,
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center w-[20%]">
      <input type="file" accept=".json" onChange={handleFileChange} />
    </div>
  );
}
