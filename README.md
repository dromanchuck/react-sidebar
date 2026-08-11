# Headless Sidebar Menu

Reusable **headless** sidebar navigation for React. Logic and accessibility live in `src/components/sidebar-menu/`; styling and routing live only in the consumer (`src/demo/`).

## Live demo

**https://dromanchuck.github.io/react-sidebar/dashboard**

## Isolation rules

`sidebar-menu/` and `bottom-sheet/` must **not** import:

- `react-router-dom`
- `lucide-react`
- Tailwind utility classes / CSS modules for look-and-feel

Active state is always passed in as `isActive: boolean`. Navigation elements are passed via the `render` prop (`NavLink`, `button`, `a`, …).

## Modes

| Mode        | When                | Submenus                 |
| ----------- | ------------------- | ------------------------ |
| `wide`      | Desktop, expanded   | Inline under parent      |
| `collapsed` | Desktop, collapsed  | Flyout on hover/click    |
| `mobile`    | Viewport &lt; 768px | Bottom bar + BottomSheet |

## Quick start

```bash
npm install
npm run dev
```

Use the top-right tabs to switch between:

- **Router demo** — `useLocation` + `NavLink` (collapse persisted in `localStorage`)
- **State demo** — `useState` for the active item (no router)

### Build for GitHub Pages locally

```bash
VITE_BASE_PATH=/react-sidebar/ npm run build:pages
npm run preview
```

## Compound API

```tsx
<SidebarMenu collapsed={collapsed} onCollapsedChange={setCollapsed}>
  <SidebarMenu.Desktop>
    <SidebarMenu.Nav aria-label="Main">
      <SidebarMenu.Group>
        <SidebarMenu.Item>
          <SidebarMenu.Link
            isActive={isActive('dashboard')}
            render={<NavLink to="/" />}
          >
            {({ isActive, mode }) => /* your styles */}
          </SidebarMenu.Link>
        </SidebarMenu.Item>

        <SidebarMenu.Submenu defaultOpen={inventoryActive}>
          <SidebarMenu.SubmenuTrigger isActive={inventoryActive}>
            {({ isOpen, isActive, mode }) => /* ... */}
          </SidebarMenu.SubmenuTrigger>
          <SidebarMenu.SubmenuContent title="Inventory">
            <SidebarMenu.Item>
              <SidebarMenu.Link
                isActive={isActive('inventory-expiring')}
                render={<NavLink to="/inventory/expiring" />}
              >
                {({ isActive }) => /* ... */}
              </SidebarMenu.Link>
            </SidebarMenu.Item>
          </SidebarMenu.SubmenuContent>
        </SidebarMenu.Submenu>
      </SidebarMenu.Group>
    </SidebarMenu.Nav>
    <SidebarMenu.CollapseToggle />
  </SidebarMenu.Desktop>

  <SidebarMenu.MobileBar>{/* icon items + same Submenu */}</SidebarMenu.MobileBar>
</SidebarMenu>
```

### Collapsed tooltips

`SidebarMenu.Tooltip` is headless (open state + a11y only). Style via render props:

```tsx
<SidebarMenu.Tooltip enabled="collapsed">
  {({ open, enabled, triggerProps, contentProps }) => (
    <span {...triggerProps}>
      {children}
      {enabled && open && <span {...contentProps}>Label</span>}
    </span>
  )}
</SidebarMenu.Tooltip>
```
