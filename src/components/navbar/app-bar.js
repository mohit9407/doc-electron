"use client";

import { Button } from "../../components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { usePathname } from "next/navigation";
import ThemeToggle from "../../components/theme-toggle";
import DynamicLink from "../../components/dynamic-link";
import { Sheet, SheetTrigger } from "../../components/ui/sheet";
import FileUpload from "../ui/FileUpload";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";

const AppBar = ({
  title = "Dashboard",
  isBack = false,
  backHref = "/",
  isSecondary = false,
  details = () => {},
}) => {
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem("isDataRestored") === "true") {
      toast({
        title: "Patient data restored",
      });
      localStorage.setItem("isDataRestored", false);
    }
  }, []);

  const backupHandler = (e) => {
    e.preventDefault();
    const fetchJson = async () => {
      const { data } = await global.api.sendSync("generateBackup");
      return data;
    };

    const saveAsJson = async () => {
      const jsonData = await fetchJson();
      const blob = new Blob([JSON.stringify(jsonData?.data, null, 2)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "backup.json";
      link.click();
    };
    saveAsJson();
  };

  return (
    <header
      className={cn(
        "w-full flex flex-row py-2",
        isSecondary
          ? "bg-muted border-y border-y-muted my-2 scale-90 z-10"
          : "bg-primary rounded"
      )}
    >
      <div
        className={cn(
          "px-4 py-2 text-lg w-[68%]",
          isSecondary ? "text-muted-foreground" : "text-primary-foreground ",
          pathname === "/" && "mr-auto"
        )}
      >
        {isBack && (
          <DynamicLink href={backHref}>
            <Button
              variant={isSecondary ? "default" : "secondary"}
              size="icon"
              className={cn("mr-2")}
            >
              <ArrowLeftIcon />
            </Button>
          </DynamicLink>
        )}
        {title}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="scale-90 mt-auto mb-auto mr-2.5 ml-auto"
            variant="outline"
            onClick={backupHandler}
          >
            Backup
          </Button>
        </SheetTrigger>
        <SheetTrigger asChild>
          <FileUpload details={details}/>
        </SheetTrigger>
      </Sheet>
      {pathname === "/" && (
        <>
          <ThemeToggle />
        </>
      )}
    </header>
  );
};

export default AppBar;