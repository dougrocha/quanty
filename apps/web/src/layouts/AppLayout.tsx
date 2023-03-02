import Footer from '~/components/Footer'
import Navbar from '~/components/Navbar'

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
