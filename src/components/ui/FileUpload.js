import { useEffect, useState } from "react";
import { Button } from "./button";

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
        ...jsonData,
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center w-[20%]">
      <Button
            className="scale-90 mt-auto mb-auto mr-2.5 ml-0"
            variant="outline"
          >
        <input type="file" accept=".json" hidden id="actual-btn" onChange={handleFileChange} />
        <label for="actual-btn">Restore</label>
      </Button>
    </div>
  );
}
