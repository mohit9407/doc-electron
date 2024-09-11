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

export function Tooltip({ message, className, children }) {
  return (
    <div class="group relative">
      {children}
      <span
        class={`absolute z-[999] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap ${className}`}
      >
        {message}
      </span>
    </div>
  );
}