import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import { LOGO } from '@quanty/lib'

import { api } from '~/api'
import AppLayout from '~/layouts/AppLayout'
import { NextPageWithLayout } from '~/lib/types'

const Home: NextPageWithLayout = () => {
  const { data: session } = api.auth.getSession.useQuery()

  return (
    <div className="my-auto flex min-h-full flex-col items-center justify-center py-4">
      <Image
        src={LOGO.lg}
        alt="Quanty Profile Image"
        width={256}
        height={256}
        priority
        className="h-64 w-64 overflow-hidden rounded-full"
      />

      {session ? (
        <div className="mt-6 flex overflow-hidden rounded-md border border-theme-secondary">
          <span className="py-2 px-4">Logged in: {session.user.name}</span>
          <button
            className="bg-theme-secondary px-2"
            onClick={() => {
              signOut()
            }}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-y-4">
        <Link
          href="/invite"
          target="_blank"
          rel="noreferrer"
          className="w-full rounded-md bg-theme-primary px-8 py-3 text-center font-medium hover:bg-dark-purple-400 focus:border-theme-secondary"
        >
          Invite Quanty
        </Link>
        <Link
          href="/dashboard"
          className="w-full rounded-md bg-theme-primary px-8 py-3 text-center font-medium hover:bg-dark-purple-400 focus:border-theme-secondary"
        >
          Dashboard (WIP)
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL}
          target="_blank"
          rel="noreferrer"
          className="w-full rounded-md bg-theme-primary px-8 py-3 text-center font-medium hover:bg-dark-purple-400 focus:border-theme-secondary"
        >
          Join the community
        </Link>
      </div>
    </div>
  )
}

Home.getLayout = page => <AppLayout>{page}</AppLayout>

// const PostCard: React.FC<{
//   post: RouterOutputs['post']['all'][number]
//   onPostDelete?: () => void
// }> = ({ post, onPostDelete }) => {
//   return (
//     <div className="flex w-full max-w-2xl flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
//       <div className="flex-grow">
//         <h2 className="text-2xl font-bold text-[hsl(280,100%,70%)]">
//           {post.title || <i>Untitled</i>}
//         </h2>
//         <p className="mt-2 text-sm">{post.content || <i>No content</i>}</p>
//       </div>
//       <div>
//         <span
//           className="cursor-pointer text-sm font-bold uppercase text-pink-400"
//           onClick={onPostDelete}
//         >
//           Delete
//         </span>
//       </div>
//     </div>
//   )
// }

// const CreatePostForm: React.FC = () => {
//   const utils = api.useContext()

//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')

//   const { mutate } = api.post.create.useMutation({
//     async onSuccess() {
//       setTitle('')
//       setContent('')
//       await utils.post.all.invalidate()
//     },
//   })

//   return (
//     <div className="flex w-[80vw] flex-col p-4 md:w-[60vw] xl:w-[35vw]">
//       <input
//         className="mb-2 rounded bg-white/10 p-2 text-white"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//         placeholder="Title"
//       />
//       <input
//         className="mb-2 rounded bg-white/10 p-2 text-white"
//         value={content}
//         onChange={e => setContent(e.target.value)}
//         placeholder="Content"
//       />
//       <button
//         className="rounded bg-pink-700 p-2 font-bold"
//         onClick={() => {
//           mutate({
//             title,
//             content,
//           })
//         }}
//       >
//         Create
//       </button>
//     </div>
//   )
// }

// const Home: NextPage = () => {
//   const postQuery = api.post.all.useQuery()

//   const deletePostMutation = api.post.delete.useMutation({
//     onSettled: () => postQuery.refetch(),
//   })

//   return (
//     <>
//       <Head>
//         <title>Create T3 App</title>
//         <meta name="description" content="Generated by create-t3-app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//         <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
//           <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//             Create <span className="text-[hsl(280,100%,70%)]">T3</span> Turbo
//           </h1>
//           <AuthShowcase />

//           {/* <CreatePostForm /> */}

//           {/* {postQuery.data ? (
//             <div>
//               {postQuery.data?.length === 0 ? (
//                 <span>There are no posts!</span>
//               ) : (
//                 <div className="flex h-[40vh] w-[80vw] justify-center overflow-y-scroll px-4 text-2xl md:w-[60vw] xl:w-[35vw]">
//                   <div className="flex w-full flex-col gap-4">
//                     {postQuery.data?.map(p => {
//                       return (
//                         <PostCard
//                           key={p.id}
//                           post={p}
//                           onPostDelete={() => deletePostMutation.mutate(p.id)}
//                         />
//                       )
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <p>Loading..</p>
//           )}
//         */}
//         </div>
//       </main>
//     </>
//   )
// }

export default Home

// const AuthShowcase: React.FC = () => {
//   const { data: session } = api.auth.getSession.useQuery()

//   const { data: secretMessage } = api.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: !!session?.user },
//   )

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       {session?.user && (
//         <p className="text-center text-2xl text-white">
//           {session && <span>Logged in as {session?.user?.name}</span>}
//           {secretMessage && <span> - {secretMessage}</span>}
//         </p>
//       )}
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={session ? () => void signOut() : () => void signIn('discord')}
//       >
//         {session ? 'Sign out' : 'Sign in'}
//       </button>
//     </div>
//   )
// }