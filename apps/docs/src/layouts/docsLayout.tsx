interface LayoutProps {
  children: React.ReactNode
  meta: Record<string, unknown>
}

export const DocsLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="prose h-full w-full bg-blue-500 dark:prose-invert">
        {children}
      </div>
    </div>
  )
}
