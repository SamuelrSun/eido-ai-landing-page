import React from "react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

/**
 * A button with a shimmer/spotlight effect that follows the cursor on hover.
 */
const ShimmerButton = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const handleMouseMove = (e) => {
      const { currentTarget: target } = e;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.style.setProperty("--x", `${x}px`);
      target.style.setProperty("--y", `${y}px`);
    };

    return (
      <Button
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn("shimmer-button", className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;