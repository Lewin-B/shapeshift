"use client"

import React from "react";
import { Button } from "~/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "~/components/ui/tooltip";
import { type LucideIcon } from "lucide-react";

type ToolbarButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  variant?: "default" | "ghost" | "outline" | "secondary";
  active?: boolean;
};

export function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  tooltipSide = "left",
  variant = "ghost",
  active = false
}: ToolbarButtonProps) {


  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant={active ? "secondary" : variant}
            size="icon"
            onClick={onClick}
            disabled={disabled}
            className={active ? "bg-accent" : ""}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide}>
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}