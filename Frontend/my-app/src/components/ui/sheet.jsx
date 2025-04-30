"use client"

import { createContext, forwardRef, useContext, useState } from "react"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

const SheetContext = createContext({})

const Sheet = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open || false)

  const handleOpenChange = (open) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }

  return (
    <SheetContext.Provider value={{ open: open ?? isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetTrigger = forwardRef(({ className, children, ...props }, ref) => {
  const { onOpenChange } = useContext(SheetContext)

  return (
    <button ref={ref} className={className} onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetClose = forwardRef(({ className, children, ...props }, ref) => {
  const { onOpenChange } = useContext(SheetContext)

  return (
    <button ref={ref} className={className} onClick={() => onOpenChange(false)} {...props}>
      {children}
    </button>
  )
})
SheetClose.displayName = "SheetClose"

const SheetContent = forwardRef(({ className, children, side = "right", ...props }, ref) => {
  const { open, onOpenChange } = useContext(SheetContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        ref={ref}
        className={cn(
          "fixed z-50 bg-background p-6 shadow-lg transition ease-in-out",
          side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          className,
        )}
        {...props}
      >
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
})
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent, SheetClose }
