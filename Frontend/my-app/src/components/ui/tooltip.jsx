"use client"

import { createContext, forwardRef, useContext, useState } from "react"
import { cn } from "../../lib/utils"

const TooltipContext = createContext({})

const Tooltip = ({ children, delayDuration = 700 }) => {
  const [open, setOpen] = useState(false)

  return <TooltipContext.Provider value={{ open, setOpen, delayDuration }}>{children}</TooltipContext.Provider>
}

const TooltipTrigger = forwardRef(({ className, asChild = false, ...props }, ref) => {
  const { setOpen, delayDuration } = useContext(TooltipContext)
  const Comp = asChild ? "div" : "button"

  return (
    <Comp
      ref={ref}
      className={className}
      onMouseEnter={() => {
        const timeout = setTimeout(() => setOpen(true), delayDuration)
        return () => clearTimeout(timeout)
      }}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...props}
    />
  )
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = forwardRef(({ className, sideOffset = 4, ...props }, ref) => {
  const { open } = useContext(TooltipContext)

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = "TooltipContent"

const TooltipProvider = ({ children }) => {
  return children
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
