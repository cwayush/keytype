import * as React from "react";
import { cn } from "@/lib/utils";

export type IconPosition = "left" | "right";

export interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  onIconClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>
  ) => void;
  iconInteractive?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      icon,
      iconPosition = "left",
      onIconClick,
      iconInteractive = false,
      ...props
    },
    ref
  ) => {
    const showLeft = !!icon && iconPosition === "left";
    const showRight = !!icon && iconPosition === "right";

    const paddingClass = showLeft ? "pl-10" : showRight ? "pr-10" : "";

    return (
      <div className={cn("relative w-full rounded-md", className)}>
        {showLeft &&
          (iconInteractive ? (
            <button
              type="button"
              onClick={(e) => {
                onIconClick?.(e);
                (ref as React.RefObject<HTMLInputElement>)?.current?.focus();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded focus:outline-none focus-visible:ring-1"
              aria-hidden={false}
            >
              {icon}
            </button>
          ) : (
            <span
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 pointer-events-none"
              aria-hidden
            >
              {icon}
            </span>
          ))}

        {showRight &&
          (iconInteractive ? (
            <button
              type="button"
              onClick={(e) => {
                onIconClick?.(e);
                (ref as React.RefObject<HTMLInputElement>)?.current?.focus();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded focus:outline-none focus-visible:ring-1"
              aria-hidden={false}
            >
              {icon}
            </button>
          ) : (
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 pointer-events-none"
              aria-hidden
            >
              {icon}
            </span>
          ))}

        <input
          ref={ref}
          type={type}
          className={cn(
            "flex w-full rounded-md text-muted-foreground border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            paddingClass
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
