"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  dropDownContentClassName,
  dropDownItemClassName,
  size = "icon",
  variant = "outline",
}: {
  className?: string;
  dropDownContentClassName?: string;
  dropDownItemClassName?: string;
  size?: "icon" | "sm" | "lg" | "default";
  variant?:
    | "outline"
    | "default"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
}) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          className={cn(
            "focus-visible:ring-0 focus-visible:ring-offset-0 border-2 hover:bg-accent/50",
            className
          )}
          size={size}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn("border-accent", dropDownContentClassName)}
      >
        <DropdownMenuItem
          className={cn("", dropDownItemClassName)}
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn("", dropDownItemClassName)}
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn("", dropDownItemClassName)}
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
