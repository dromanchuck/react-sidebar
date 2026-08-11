import { useState } from "react";
import { StyledSidebar } from "@/demo/styled-sidebar";
import type { MenuKey } from "@/demo/menu-keys";

export function StateSidebarDemo() {
  const [activeId, setActiveId] = useState<MenuKey>("inventory-expiring");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100 flex">
      <StyledSidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        isActive={(key) => key === activeId}
        renderNavItem={(key) => (
          <button
            type="button"
            className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
            onClick={() => {
              setActiveId(key);
            }}
          />
        )}
      />
      <div className="flex flex-1">Active ID: {activeId}</div>
    </div>
  );
}
