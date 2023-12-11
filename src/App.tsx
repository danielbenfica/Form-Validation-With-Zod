import { useState } from 'react'
import './styles/global.css'

import SignIn from './components/Home/signIn'
import SignUp from './components/Home/signUp'

export default function Home() {

  const [signUp, setSignUp] = useState(false)

  return(
    <main className='flex items-center justify-center h-screen bg-gradient-to-r from-slate-300 via-blue-100 to-blue-200'>
      
      <div className='relative grid grid-cols-2 rounded-3xl overflow-hidden w-full max-w-5xl bg-neutral-100'>

      <SignIn />
      
      <SignUp />
      
      <div data-signup={signUp} className='absolute h-full w-1/2 right-0 bg-gradient-to-br from-violet-700 to-violet-900 rounded-l-[100px] text-white flex flex-col items-center justify-center px-10 data-[signup=true]:rounded-l-none data-[signup=true]:rounded-r-[100px] transition-transform data-[signup=true]:-translate-x-full'>
        <h2 className='text-4xl font-bold mb-5'>{signUp?"Bem vindo de volta!": "Boas vindas!"}</h2>
        <p className='text-center'>{signUp?" seu dados pessoais para usar todas as features do site": "Crie uma conta com seu dados pessoais para usar todas as features do site"}</p>
        <button type='button' onClick={() => setSignUp(!signUp)} className=' rounded-md border-2 border-white w-40 h-9 mt-5'>{signUp?"Sign In": "Sign Up"}</button>        
       </div>
      </div>
      
    </main>
  )

}