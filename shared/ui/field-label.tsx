import type { ReactNode } from "react"
import { cn } from "@/shared/lib/utils"

interface FieldLabelProps {
  children: ReactNode
  icon?: ReactNode
  className?: string
}

export function FieldLabel({ children, icon, className }: FieldLabelProps) {
  return (
    <label className={cn("block text-sm font-medium text-muted-foreground mb-1.5", className)}>
      {icon}
      {children}
    </label>
  )
}
