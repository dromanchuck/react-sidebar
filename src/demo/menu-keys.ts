export type MenuKey =
  | "dashboard"
  | "deliveries"
  | "partners"
  | "customers"
  | "analytics"
  | "inventory-stock"
  | "inventory-suppliers"
  | "inventory-expiring"
  | "billing";

export const MENU_PATHS: Record<MenuKey, string> = {
  dashboard: "/dashboard",
  deliveries: "/deliveries",
  partners: "/partners",
  customers: "/customers",
  analytics: "/analytics",
  "inventory-stock": "/inventory/stock",
  "inventory-suppliers": "/inventory/suppliers",
  "inventory-expiring": "/inventory/expiring",
  billing: "/billing",
};

export function isInventoryKey(key: MenuKey) {
  return (
    key === "inventory-stock" ||
    key === "inventory-suppliers" ||
    key === "inventory-expiring"
  );
}

export function matchMenuKey(key: MenuKey, pathname: string): boolean {
  const path = MENU_PATHS[key];

  return pathname === path || pathname.startsWith(`${path}/`);
}
