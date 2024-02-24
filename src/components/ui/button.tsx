import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

import { LoadingSpinner } from "../loading-spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-80 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "shadow bg-primary-700 text-zinc-50 hover:bg-primary-800 border border-primary-600 hover:border-primary-700",
        destructive: "shadow-sm bg-red-700 text-zinc-50 hover:bg-red-800",
        outline:
          "border shadow-sm border-primary-700 text-primary-500 hover:bg-primary-700 hover:text-zinc-50",
        secondary:
          "shadow-sm bg-zinc-700 text-zinc-50 hover:bg-zinc-800 border border-zinc-600 hover:border-zinc-700",
        ghost: "hover:bg-zinc-800 hover:text-zinc-50",
        link: "underline-offset-4 hover:underline text-zinc-50",
      },
      size: {
        default: "h-[38px] px-[14px] py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading === true ? true : props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <div className="absolute m-auto">
              <LoadingSpinner />
            </div>
            <div className="opacity-0">{props.children}</div>
          </>
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
