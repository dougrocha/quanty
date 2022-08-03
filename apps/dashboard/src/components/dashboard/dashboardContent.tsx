const DashboardContent = ({
  title,
  children,
  description,
  seperateTitle = false,
  actionButton,
}: {
  title?: string
  description?: string
  children?: React.ReactNode
  seperateTitle?: boolean
  actionButton?: React.ReactNode
}) => {
  if (seperateTitle)
    return (
      <>
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-xl font-semibold capitalize text-primary-white">
              {title}
            </h1>
            <p className="text-secondary-white">{description}</p>
          </div>
          {actionButton}
        </div>
        <div className="min-h-full w-full rounded-md bg-primary-purple-10 p-10">
          {children}
        </div>
      </>
    )

  return (
    <div className="min-h-full w-full rounded-md bg-primary-purple-10 p-10">
      {title && (
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-xl font-semibold capitalize text-primary-white">
              {title}
            </h1>
            <p className="text-secondary-white">{description}</p>
          </div>

          {actionButton}
        </div>
      )}

      {children}
    </div>
  )
}

export default DashboardContent
