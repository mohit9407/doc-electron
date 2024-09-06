"use client";

import DynamicLink from "../../../components/dynamic-link";
import { cn } from "../../../lib/utils";
import { usePathname } from "next/navigation";

const StaffTabs = () => {
  const location = usePathname();
  return (
    <div className="flex flex-row justify-between w-full px-4 py-2 rounded">
      <DynamicLink
        className={cn(
          "w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground",
          location === "/patients/manage" && "bg-muted"
        )}
        href="/patients/manage"
      >
        Manage Patients
      </DynamicLink>
      <DynamicLink
        className={cn(
          "w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground",
          location === "/patients/new" && "bg-muted"
        )}
        href="/patients/new"
      >
        New Patient
      </DynamicLink>
      <DynamicLink
        className={cn(
          "w-full text-center px-4 py-2 cursor-pointer transition-colors border-x border-foreground",
          location === "/patients/trash" && "bg-muted"
        )}
        href="/patients/trash"
      >
        Trash
      </DynamicLink>
    </div>
  );
};

export default StaffTabs;