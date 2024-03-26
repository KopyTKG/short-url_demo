'use client'
import { useEffect } from 'react'

export default function Error({
 error,
}: {
 error: Error & { digest?: string }
 reset: () => void
}) {
 useEffect(() => {
  console.error(error)
 }, [error])

 return (
  <div className="w-full h-[90vh] flex flex-col justify-center items-center gap-10">
   <h2 className="text-3xl font-bold">Something went wrong!</h2>
   <button className="text-xl bg-blue-400 rounded-xl px-4 py-2 text-black hover:bg-blue-500" onClick={() => window.location.reload()}>
    Try again
   </button>
   <button className="text-xl bg-red-400 rounded-xl px-4 py-2 text-black hover:bg-red-500" onClick={() => window.history.back()}>
    Go Back
   </button>
   <div className="flex flex-col justify-center items-center gap-1">
    <code>Name: {error.name}</code>
    <code>Message: {error.message}</code>
   </div>
  </div>
 )
}
     