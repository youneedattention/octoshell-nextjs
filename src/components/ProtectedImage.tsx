"use client";
import Image, { type ImageProps } from "next/image";

type Props = ImageProps & {
  wrapperClassName?: string;
};

/**
 * Drop-in replacement for <Image>.
 * - Blocks right-click / drag / long-press save on all browsers
 * - alt="" by default so image search engines get no description
 */
export default function ProtectedImage({ wrapperClassName = "", className = "", ...props }: Props) {
  // When fill is used, the wrapper must be absolute+inset-0 to not break layout
  const isFill = !!props.fill;
  const wrapperBase = isFill
    ? `absolute inset-0 select-none ${wrapperClassName}`
    : `relative select-none ${wrapperClassName}`;

  return (
    <div
      className={wrapperBase}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Image
        {...props}
        alt={props.alt ?? ""}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        className={`pointer-events-none ${className}`}
      />
      {/* transparent shield — catches right-click on all browsers */}
      <div className="absolute inset-0" onContextMenu={(e) => e.preventDefault()} />
    </div>
  );
}
