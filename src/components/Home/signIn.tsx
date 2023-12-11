import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const signInFormSchema = z.object({
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de email inválido')
    .toLowerCase()
    .refine(email => {
      return email.endsWith('@gmail.com')
    }, 'Digite algum gmail'),
  password: z.string()
  .min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

type signInFormData = z.infer<typeof signInFormSchema>

export default function SignIn(){
  const { register, handleSubmit, formState: {errors} } = useForm<signInFormData>({
    resolver: zodResolver(signInFormSchema)
  })

  function signIn(data: signInFormData){
    console.log(data)
    // Place to send datas to a API
  }

  return (
    <div className='bg-neutral-100 py-24 flex flex-col justify-center'>
        
        <h2 className='text-3xl font-bold text-center mb-10'>Sign In</h2>
        <form onSubmit={handleSubmit(signIn)} className='flex flex-col items-center gap-4'>
          
          <p className='text-sm text-zinc-700'>Digite seu email e senha para entrar na sua conta</p>
        
          <div className='flex flex-col'>
            <input 
              className='bg-neutral-200 rounded px-3 py-1 w-96 h-9 text-sm'
              placeholder='E-mail'
              type="email"
              {...register('email')} 
            />
            {errors.email && <span className='text-red-400'>{errors.email.message}</span> }
          </div>
          
          <div className='flex flex-col'>
            <input 
              className='bg-neutral-200 rounded px-3 py-1 w-96 h-9 text-sm'
              placeholder='Senha'
              type="password"
              {...register('password')} 
            />
            {errors.password && <span className='text-red-400'>{errors.password.message}</span> }
          </div>


          <button type="submit" className='text-white mt-5 font-semibold text-sm bg-indigo-950 rounded-md w-52 h-9'>SIGN IN</button>
        </form>
      </div>
  )
}