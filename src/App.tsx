import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod'

export function App() {
    const regrasDeValidacao = z.object({
        rua: z.string().min(1, "Campos Obrigatório"),
        numero: z.string().min(1, "Campo Obrigatório"),
        complemento: z.string().min(1, "Campo Obrigatório").max(50, "Máximo de 50 caracteres"),
        bairro: z.string().min(1, "Campo Obrigatório"),
        cidade: z.string().min(1, "Campo Obrigatório"),
        uf: z.string().min(2, "Campo Obrigatório").max(2, "Máximo de dois campos por UF").toUpperCase(),
        cep: z.string().length(8, "O campo deve ter exatamente 8 números")

    })

    type FormType = z.infer<typeof regrasDeValidacao>

    const formulario = useForm<FormType>({
        resolver: zodResolver(regrasDeValidacao)
    })

    const [enderecos, setEnderecos] = useState<FormType[]>([])

    function enviaFormulario(data: FormType) {
        setEnderecos((prevValores) => [...prevValores, data]);
        formulario.reset()
    }

    return (
        <>
            <form className="flex flex-col items-center justify-center bg-zinc-300 w-screen h-screen gap-4" onSubmit={formulario.handleSubmit(enviaFormulario)}   >
                <h1 className="font-sans">Cadastro de endereço</h1>
                <div className="flex flex-col max-w-400px">
                    <label className="p-2" htmlFor="rua">Rua:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("rua")} />
                </div>
                <div className="flex flex-col">
                    <label className="p-2" htmlFor="numero">Número:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("numero")} />
                </div>
                <div className="flex flex-col">
                    <label className="p-2" htmlFor="complemento">Complemento:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("complemento")} />
                </div>
                <div className="flex flex-col">
                    <label className="p-2" htmlFor="bairro">Bairro:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("bairro")} />
                </div>
                <div className="flex flex-col">
                    <label className="p-2" htmlFor="cidade">Cidade:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("cidade")} />
                </div>
                <div className="flex flex-col">
                    <label className="p-2" htmlFor="uf">UF:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("uf")} />
                </div>
                <div className="flex flex-col">
                    <label className="p-2" htmlFor="cep">CEP:</label>
                    <input className="px-3 py-2  border border-red-500 focus:outline-none" type="text" {...formulario.register("cep")} />
                </div>
                <div className="flex gap-8">
                    <button
                        type="button"
                        onClick={() => formulario.reset()}
                        className="bg-emerald-300"
                    >Limpar</button>
                    <button className="bg-emerald-300 " type="submit">Enviar</button>
                </div>
            </form>
            <div>
                <div className="mt-6">
                    {enderecos.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <h2 className="font-bold text-lg">Endereços cadastrados:</h2>

                            {enderecos.map((endereco, index) => (
                                <div
                                    key={index}
                                    className="bg-zinc-200 p-3 rounded shadow"
                                >
                                    <p><strong>Rua:</strong> {endereco.rua}</p>
                                    <p><strong>Número:</strong> {endereco.numero}</p>
                                    <p><strong>Complemento:</strong> {endereco.complemento}</p>
                                    <p><strong>Bairro:</strong> {endereco.bairro}</p>
                                    <p><strong>Cidade:</strong> {endereco.cidade}</p>
                                    <p><strong>UF:</strong> {endereco.uf}</p>
                                    <p><strong>CEP:</strong> {endereco.cep}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            </>
        )
}

