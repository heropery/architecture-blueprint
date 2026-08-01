import { useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

/**
 * Input — label above, helper text below.
 * docs/08_COMPONENT_LIBRARY.md §5.1
 */
export function Input({ label, helperText, error, className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error || helperText ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-caption text-muted-foreground">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          "bg-surface text-foreground border-border placeholder:text-muted-foreground h-12 w-full rounded-[var(--radius-button)] border px-4 text-[16px]",
          "focus-visible:border-primary focus-visible:ring-primary/40 outline-none focus-visible:ring-2",
          "transition-colors duration-150",
          error && "border-danger focus-visible:border-danger focus-visible:ring-danger/40",
          className,
        )}
        {...props}
      />
      {(error || helperText) && (
        <p
          id={describedBy}
          className={cn("text-caption", error ? "text-danger" : "text-muted-foreground")}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
