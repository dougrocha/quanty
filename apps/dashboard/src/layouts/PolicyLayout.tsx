import { NextSeo } from 'next-seo'

interface PolicyLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

const PolicyLayout = ({ children, title, description }: PolicyLayoutProps) => {
  return (
    <>
      <NextSeo
        title={title}
        titleTemplate="Quanty | %s"
        description={description}
        canonical={`${process.env.NEXT_PUBLIC_QUANTY_APP_URL}`}
      />
      <div className="flex h-screen">
        <article className="prose mx-auto dark:prose-invert">
          <h1>{title}</h1>
          <p>
            Please be aware that this page may change in the near future. As we
            roll out updates, we promise to be transparent with what data we
            store and how we handle that data.
          </p>
          {children}
        </article>
      </div>
    </>
  )
}

export default PolicyLayout
