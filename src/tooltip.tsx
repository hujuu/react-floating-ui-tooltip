"use client";
import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal
} from "@floating-ui/react";

import "./styles.css";

export function Tooltip({
  children,
  contents
}: {
  children: React.ReactNode;
  contents: any;
}) {
  const [open, setOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
        crossAxis: false
      }),
      shift()
    ]
  });

  // Event listeners to change the open state
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });
  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ]);

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        {contents}
      </button>
      <FloatingPortal>
        {open && (
          <div
            className="Tooltip"
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0
            }}
            {...getFloatingProps()}
          >
            {children}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
