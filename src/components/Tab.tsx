import Button from "@/components/Button";
import { cn } from "@/utils/cn";
import React, { type ButtonHTMLAttributes } from "react";

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: React.ReactNode;
}

export default function Tab({ isActive, children, ...props }: TabProps) {
  return (
    <Button
      className={cn(
        "text-sub1 text-black py-[10px] border-b-2 px-[15px]",
        isActive ? "border-primary-500" : "border-gray-50"
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
