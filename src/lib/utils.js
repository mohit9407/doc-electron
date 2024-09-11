import { clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (date) =>
  moment(date).format("DD-MM-YYYY HH:mm:ss a");

Array.prototype.extend = function (iterable) {
  if (typeof iterable[Symbol.iterator] === "function") {
    for (const item of iterable) {
      this.push(item);
    }
  } else {
    throw new Error("Argument is not iterable");
  }
};
