import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod'

export function App() {
    const regrasDeValidacao = z.object({
        rua: z.string().min(1, "Campos Obrigatório"),
        numero: z.string().min(1,"Campo Obrigatório"),
        complemento: z.string().min(1, "Campo Obrigatório").max(50, "Máximo de 50 caracteres"),
        bairro: z.string().min(1,"Campo Obrigatório"),
        cidade: z.string().min(1,"Campo Obrigatório"),
        uf: z.string().min(1, "Campo Obrigatório").max(2, "Máximo de dois campos por UF").toUpperCase(),
        cep: z.string().length(8, "O campo deve ter exatamente 8 números")

    })
    
    type FormType = z.infer<typeof regrasDeValidacao>

    const formulario = useForm<FormType>({
    resolver: zodResolver(regrasDeValidacao)
  })

  const [valoresFormulario, setValoresFormulario] = useState<FormType[]>([])

  console.log("Erros do formulário -> ", formulario.formState.errors)
  function enviaFormulario(data: FormType) {
    console.log("Data", data)
    setValoresFormulario((prevValores) => [...prevValores, data]);
    formulario.reset()
  console.log(valoresFormulario)
  }
   
    return (
        <>
            <form onSubmit={formulario.handleSubmit(enviaFormulario)}   >
            <div className="flex flex-col items-center justify-center bg-zinc-300 w-screen h-screen gap-4">
                <h1 className="font-sans">Cadastro de endereço</h1>
                <div className="">
                    <label className="p-2" htmlFor="rua">Rua:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("rua")} />
                </div>
                <div className="">
                    <label className="p-2" htmlFor="numero">Número:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("numero")}/>
                </div>
                <div className="">
                    <label className="p-2" htmlFor="complemento">Complemento:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("complemento")}/>
                </div>
                <div className="">
                    <label className="p-2" htmlFor="bairro">Bairro:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("bairro")}/>
                </div>
                <div className="">
                    <label className="p-2" htmlFor="cidade">Cidade:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("cidade")}/>
                </div>
                <div className="">
                    <label className="p-2" htmlFor="uf">UF:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("uf")}/>
                </div>
                <div className="">
                    <label className="p-2" htmlFor="cep">CEP:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("cep")}/>
                </div>
                <div>
                    <button className="bg-emerald-300 " type="submit">Enviar</button>
                </div>
            </div>
            </form>
         </>
         
    )
}

