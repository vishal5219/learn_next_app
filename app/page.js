'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  console.log('session', session);
  return (
    <section>
      <h2>homepage</h2>
      <h3>sign in with google</h3>
      <button onClick={() => { signIn('google') }}>Sign In</button>
      <button onClick={() => { signOut() }}>Sign Out</button>
    </section>
  )
}
