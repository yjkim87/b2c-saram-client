"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TabValue = "counseling" | "coaching";

interface TabContextValue {
  activeTab: TabValue;
  setActiveTab: (tab: TabValue) => void;
}

const TabContext = createContext<TabContextValue>({
  activeTab: "counseling",
  setActiveTab: () => {},
});

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabValue>("counseling");
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  return useContext(TabContext);
}
