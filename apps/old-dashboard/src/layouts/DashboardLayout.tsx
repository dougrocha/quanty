interface LayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <h1>Dashboard</h1>
      <main>{children}</main>
    </>
  )
}

export default DashboardLayout
