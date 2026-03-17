"use client";

import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import GlobalNotebook from "./GlobalNotebook";
import GlobalMailMagnet from "./GlobalMailMagnet";
import GlobalNotificationCenter from "./GlobalNotificationCenter";

function AppContent({ children }: { children: React.ReactNode }) {
  const { isNotebookOpen, toggleNotebook, isMailMagnetOpen, toggleMailMagnet, isNotificationCenterOpen, toggleNotificationCenter } = useTheme();
  
  return (
    <div className="flex flex-col h-full relative">
      <Header />
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        {children}
      </main>
      <Footer />
      <GlobalNotebook isOpen={isNotebookOpen} onClose={toggleNotebook} />
      <GlobalMailMagnet isOpen={isMailMagnetOpen} onClose={toggleMailMagnet} />
      <GlobalNotificationCenter isOpen={isNotificationCenterOpen} onClose={toggleNotificationCenter} />
    </div>
  );
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppContent>{children}</AppContent>
    </ThemeProvider>
  );
}
