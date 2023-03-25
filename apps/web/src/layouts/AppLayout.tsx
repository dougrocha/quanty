import Footer from '~/components/footer'
import Navbar from '~/components/main-navbar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-safe-h-screen flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default AppLayout
