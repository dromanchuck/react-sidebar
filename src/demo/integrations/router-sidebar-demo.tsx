import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { StyledSidebar } from "@/demo/styled-sidebar";
import { usePersistedState } from "@/hooks/use-persisted-state";
import { matchMenuKey, MENU_PATHS, type MenuKey } from "@/demo/menu-keys";

export function RouterSidebarDemo() {
  const location = useLocation();
  const [collapsed, setCollapsed] = usePersistedState(
    "sidebar-collapsed",
    false,
  );

  return (
    <div className="flex flex-1 bg-stone-100">
      <StyledSidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        isActive={(key) => matchMenuKey(key, location.pathname)}
        renderNavItem={(_, path) => (
          <NavLink to={path!} className="block w-full no-underline" />
        )}
      />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/inventory/expiring" replace />}
        />
        {Object.values(MENU_PATHS).map((path) => (
          <Route key={path} path={path} element={<div>{path}</div>} />
        ))}
        <Route
          path="*"
          element={<Navigate to="/inventory/expiring" replace />}
        />
      </Routes>
    </div>
  );
}

export type RouterMenuKey = MenuKey;
