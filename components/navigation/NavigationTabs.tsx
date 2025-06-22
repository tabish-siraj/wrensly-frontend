"use client";

import { Button } from "@/components/ui/button";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs?: Array<{
    id: string;
    label: string;
  }>;
}

export function NavigationTabs({
  activeTab,
  onTabChange,
  tabs,
}: NavigationTabsProps) {
  const defaultTabs = [
    { id: "for-you", label: "For you" },
    { id: "following", label: "Following" },
  ];

  const tabsToRender = tabs || defaultTabs;

  return (
    <div className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-16 z-40">
      <div className="flex">
        {tabsToRender.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={`flex-1 rounded-none h-14 font-medium ${
              activeTab === tab.id
                ? "text-black border-b-2 border-blue-500"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
