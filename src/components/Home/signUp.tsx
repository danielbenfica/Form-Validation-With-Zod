import { useFieldArray, useForm } from "react-hook-form" 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const createUserFormSchema = z.object({
  name: z.string()
    .nonempty('O nome é obrigatório')
    .transform(name=> {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de email inválido')
    .toLowerCase()
    .refine(email => {
      return email.endsWith('@gmail.com')
    }, 'Digite algum gmail'),
  password: z.string()
  .min(6, 'A senha precisa de no mínimo 6 caracteres'),
  mainAddress: z.array(z.object({
    secondary: z.string().nonempty('O endereço é obrigatório'),
  }))
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function SignUp(){
  const {
    register,
    handleSubmit,
    formState: {errors},
    control
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  const {fields, append, remove } = useFieldArray({
    control,
    name: 'mainAddress'
  })

  function addNewTech(){
    append({secondary: ''})
  }
  function removeNewTech(index: number){
    remove(index)
  }

  function createUser(data:CreateUserFormData){
    // Place to send datas to a API
    console.log(data);
  }

  return (
    <div className='bg-neutral-100 py-20'>
        
        <h2 className='text-3xl font-bold text-center mb-10'>Sign Up</h2>
        <form onSubmit={handleSubmit(createUser)} className='flex flex-col items-center gap-2'>
          
          <p className='text-sm text-zinc-700'>Digite seu nome, email, senha e enderço</p>
          <div className='flex flex-col'>
            <input 
              className='bg-neutral-200 rounded px-3 py-1 w-96 h-9 text-sm text-neutral-800'
              placeholder='Nome'
              type="text"
              {...register('name')} 
            />
            {errors.name && <span className='text-red-400'>{errors.name.message}</span> }
          </div>
        
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

          <div className="space-y-2 flex flex-col items-center">
              

            
          <div className='flex flex-col w-96 mt-1'>
           <div className="flex gap-2">
            <input 
                className='bg-neutral-200 rounded px-3 py-1 flex-1 h-9 text-sm text-neutral-800'
                placeholder='Endereço'
                type="text"
              />
              {fields.length == 0 && <button type='button' className='bg-neutral-200 w-9 h-9 rounded' onClick={addNewTech}>
                    +
                </button>}
           </div>
          {errors.mainAddress && <span className='text-red-400'>{errors.mainAddress.message}</span> }

          </div>
          
          {fields.map((field, index) => {
            return (
              <div key={field.id} className='flex flex-col w-96'>
                <div className="flex gap-2">
                  <input 
                    className='bg-neutral-200 rounded px-3 py-1 flex-1 h-9 text-sm text-neutral-800'
                    placeholder='Endereço'
                    type="text"
                    {...register(`mainAddress.${index}.secondary`)} 
                    />
                  
                  {(index + 1) == fields.length && (index+1) < 2 ? (
                    <>
                    
                    <button type='button' className='bg-neutral-200 w-9 h-9 rounded' onClick={addNewTech}>
                      +
                    </button>
                    <button type='button' className='bg-neutral-200 w-9 h-9 rounded' onClick={() => removeNewTech(index)}>
                    -
                    </button>
                    
                  </>
                ): (index + 1) == fields.length && (index + 1) == 2 && (
                    <button type='button' className='bg-neutral-200 w-9 h-9 rounded' onClick={() => removeNewTech(index)}>
                    -
                    </button>
                )   }
                </div>
                  {errors.mainAddress?.[index]?.secondary && <span className='text-red-400'>{errors.mainAddress?.[index]?.secondary?.message}</span> }
                  

                  
                </div>
              )}
            )}  
          </div>


          <button type="submit" className='text-white mt-5 font-semibold text-sm bg-indigo-950 rounded-md w-52 h-9'>SIGN UP</button>
        </form>
        
      </div>
  )
}