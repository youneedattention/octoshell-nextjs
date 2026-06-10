"use client";

const PARTS = ["info", "@", "octoshell", ".", "jp"];

interface Props {
  className?: string;
  showAddress?: boolean; // false = show "Email us" text instead
}

export default function ObfuscatedEmail({ className, showAddress = true }: Props) {
  const email = PARTS.join("");
  return (
    <a href={`mailto:${email}`} className={className}>
      {showAddress ? email : "Email us"}
    </a>
  );
}
