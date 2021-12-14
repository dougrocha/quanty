interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <nav>Dashboard</nav>
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
