"use client";
import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"

export function BackgroundBox() {
  return (
    <>
    
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-2xl text-white relative z-20")}>
        Real-time Dataset Dashboard
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20 text-xl">
      This is the best site to visualize your data interactively using various chart types. You can analyze your data through charts such as pie, line, bar, and more.
      </p>

    </div>
        <Button>
            <EnvelopeOpenIcon /> Get Started 
        </Button>
    </>
  );
}
