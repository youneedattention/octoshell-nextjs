"use client";
import type { ReactNode } from "react";

const PARTS = ["info", "@", "octoshell", ".", "jp"];

interface Props {
  className?: string;
  showAddress?: boolean;
  customContent?: ReactNode;
}

export default function ObfuscatedEmail({ className, showAddress = true, customContent }: Props) {
  const handleClick = () => {
    window.location.href = `mailto:${PARTS.join("")}`;
  };
  return (
    <span role="link" tabIndex={0} onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      style={{ cursor: "pointer" }}
      className={className}>
      {customContent ?? (showAddress ? PARTS.join("") : "Email us")}
    </span>
  );
}
