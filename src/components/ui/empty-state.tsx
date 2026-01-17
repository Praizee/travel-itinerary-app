import { AlertCircle, Search, FileX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface EmptyStateProps {
  type?: "empty" | "error" | "no-results";
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  type = "empty",
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const icons = {
    empty: FileX,
    error: AlertCircle,
    "no-results": Search,
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 text-center h-[50vh]",
        className
      )}
    >
      <div className="rounded-full bg-neutral-300 p-4">
        <Icon className="h-8 w-8 text-neutral-600" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-black-primary">{title}</h3>
        {description && (
          <p className="text-sm text-neutral-700 max-w-sm">{description}</p>
        )}
      </div>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <EmptyState
      type="error"
      title={title}
      description={message}
      action={onRetry ? { label: "Try again", onClick: onRetry } : undefined}
      className={className}
    />
  );
}

