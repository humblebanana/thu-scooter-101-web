import React from "react";

import { cn } from "@/lib/utils";

export const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E2E2_0%,#4B4B4B_70%,#E2E2E2_100%)]" />
      <span className="absolute inset-0 bg-gradient-to-t from-[#E2E2E2] to-[#4B4B4B]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,#E2E2E2_0%,#4B4B4B_90%,#E2E2E2_100%)] px-6 py-2 text-sm font-medium text-white/90 backdrop-blur-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]">
        {props.children}
      </span>
    </button>
  )
})
RainbowButton.displayName = "RainbowButton"
