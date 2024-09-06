"use client";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { forwardRef } from "react";

const DynamicLink = forwardRef(({ href, children, ...props }, ref) => {
  const router = useRouter();

  return (
    <Link
      {...props}
      ref={ref}
      href={href}
    >
      {children}
    </Link>
  );
});

DynamicLink.displayName = "DynamicLink";

export default DynamicLink;