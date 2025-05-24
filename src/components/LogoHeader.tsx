
import React from "react";
import { LineChart, ShieldCheck } from "lucide-react";

export const LogoHeader = () => {
  return (
    <header className="border-b bg-background py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <ShieldCheck size={28} className="text-primary" />
              <LineChart size={24} className="text-primary" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">
              ScoreSense Credit AI
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Help
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
