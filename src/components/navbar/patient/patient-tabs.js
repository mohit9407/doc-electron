"use client";

import { cn } from "../lib/utils";

const PatientTabs = ({ currentTab, setActiveTab }) => {
  return (
    <div className="flex flex-row justify-between w-full px-4 py-2 rounded">
      <div
        className={cn(
          "w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground",
          currentTab === "general-info" && "bg-muted pointer-events-none"
        )}
        aria-disabled={currentTab === "general-info"}
        onClick={() => setActiveTab("general-info")}
      >
        General Info
      </div>
      <div
        className={cn(
          "w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground",
          currentTab === "history" && "bg-muted pointer-events-none"
        )}
        aria-disabled={currentTab === "history"}
        onClick={() => setActiveTab("history")}
      >
        History
      </div>
      <div
        className={cn(
          "w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground",
          currentTab === "payments" && "bg-muted pointer-events-none"
        )}
        aria-disabled={currentTab === "payments"}
        onClick={() => setActiveTab("payments")}
      >
        Payments
      </div>
    </div>
  );
};

export default PatientTabs;
