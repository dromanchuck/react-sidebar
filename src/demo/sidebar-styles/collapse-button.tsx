import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface CollapseButtonProps {
  collapsed: boolean;
}

export function CollapseButton({ collapsed }: CollapseButtonProps) {
  const Icon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <span className="flex size-9 items-center justify-center rounded-md text-accent transition-colors hover:bg-accent-soft">
      <Icon className="size-5" aria-hidden />
    </span>
  );
}
