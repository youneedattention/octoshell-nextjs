"use client";
import type { ReactNode } from "react";

const PARTS = ["info", "@", "octoshell", ".", "jp"];

interface Props {
  className?: string;
  showAddress?: boolean;
  customContent?: ReactNode;
}

export default function ObfuscatedEmail({ className, showAddress = true, customContent }: Props) {
  const email = PARTS.join("");
  return (
    <a href={`mailto:${email}`} className={className}>
      {customContent ?? (showAddress ? email : "Email us")}
    </a>
  );
}
