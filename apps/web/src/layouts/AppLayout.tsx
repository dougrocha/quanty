import Footer from '~/components/Footer'
import Navbar from '~/components/Navbar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default AppLayout
