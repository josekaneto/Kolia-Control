export default function Forms(){
    return(
        <main className="w-full flex h-full font-main items-center flex-col p-[50px] gap-y-[50px]">

            <section className="bg-white w-full h-40 rounded-xl flex flex-col items-center justify-evenly border-t-8 border-verde ">
                <h2 className="text-4xl font-extrabold text-verde ">REALIZE SEU PRÉ CHECK-IN</h2>
                <p className="font-medium text-2xl">Preencha o Formulário</p>
            </section>

            <section className="w-full">
                <form action="" className="flex flex-col flex ">
                    
                        <div className=" flex flex-col w-11/12 gap-y-5">
                            <select id="hoteis" name="Selecione o seu hotel" title="Selecione o seu hotel" className="font-bold text-lg w-full py-11  px-3 rounded-lg">
                                <option value="Selecione o seu hotel" hidden>Selecione o seu hotel</option>
                                <optgroup label="Rede de Hotéis 1">
                                    <option value="1">Hotel 1.1</option>
                                    <option value="1">Hotel 1.2</option>
                                </optgroup>
                                <optgroup label="Rede de Hotéis 2">
                                    <option value="2">Hotel 2.1</option>
                                    <option value="2">Hotel 2.2</option>
                                </optgroup>
                                <optgroup label="Rede de Hotéis 3">
                                    <option value="3">Hotel 3.1</option>
                                    <option value="3">Hotel 3.2</option>
                                </optgroup>
                            </select>
                            <div className="flex flex-col bg-white py-5 gap-y-5 w rounded-lg">
                                <label htmlFor="reserva" className="font-bold text-lg px-5">Número da reserva:</label>
                                <input className="px-5 focus:outline-none" type="text" id="reserva" placeholder="Digite o número da sua reserva"/>
                            </div>
                            <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                                <label className="px-5 font-bold text-lg" htmlFor="nome">Nome:</label>
                                <input className="px-5 focus:outline-none" type="text" id="nome" placeholder="Digite o seu Nome"/>
                            </div>

                            <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                                <label className="px-5 font-bold text-lg" htmlFor="email">E-mail:</label>
                                <input className="px-5 focus:outline-none" type="email" id="email" placeholder="Digite o seu E-mail"/>
                            </div>

                            <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                                <label className="px-5 font-bold text-lg" htmlFor="telefone">Telefone:</label>
                                <input className="px-5 focus:outline-none" type="tel" id="telefone" placeholder="(XX) XXXXX-XXXX" />
                            </div>

                        </div>
                        
                        <div className="flex flex-col w-11/12 gap-y-5">
                            <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                                <label className="px-5 font-bold text-lg" htmlFor="estado">Estado(UF):</label>
                                <input className="px-5 focus:outline-none" type="text" id="estado" placeholder="Digite sua UF"/>
                            </div>
                            <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                                <label className="px-5 font-bold text-lg" htmlFor="cidade">Cidade:</label>
                                <input className="px-5 focus:outline-none" type="text" id="cidade" placeholder="Digite a sua Cidade:"/>
                            </div>
                            <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                                <label className="px-5 font-bold text-lg" htmlFor="endereco">Endereço:</label>
                                <input className="px-5 focus:outline-none" type="text" id="endereco" placeholder="Digite o seu Endereço:"/>
                            </div>
                            <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                                <label className="px-5 font-bold text-lg" htmlFor="cep">CEP:</label>
                                <input className="px-5 focus:outline-none" type="text" id="cep" placeholder="Digite o seu CEP:"/>
                            </div>
                            <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                            <label className="px-5 font-bold" htmlFor="cpf">CPF:</label>
                            <input className="px-5 focus:outline-none" type="text" id="cpf" placeholder="Digite o seu CPF"/>
                        </div>
                        </div>

                        <div className="flex flex-col w-11/12 gap-y-5">
 
  
 
                        <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                            <label className="px-5 font-bold" htmlFor="rg">RG:</label>
                            <input className="px-5 focus:outline-none" type="text" id="rg" placeholder="Digite o seu RG"/>
                        </div>  
 
                        <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                            <label className="px-5 font-bold" htmlFor="fotoRgFrente">Adicione a imagem da frente do seu RG:</label>
                            <input className="px-5 focus:outline-none" type="file" id="fotoRgFrente" accept="image/*"required/>
                        </div>
 
                        <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                            <label className="px-5 font-bold" htmlFor="fotoRgVerso">Adicione a imagem do verso do seu RG:</label>
                            <input className="px-5 focus:outline-none" type="file" id="fotoRgVerso" accept="image/*"required/>
                        </div>

                        <h1 className=" text-2xl font-extrabold text-verde" >Reconhecimento Facial</h1>

                        <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg">
                            <label className="px-5 font-bold" htmlFor="fotoRgVerso">Adicione uma imagem do seu rosto:</label>
                            <input className="px-5 focus:outline-none" type="file" id="fotoRgVerso" accept="image/*"required/>
                        </div>
                </div>
                       
                    <input type="submit" value="ENVIAR" className="block w-full bg-verde" />

                    
                </form>

            </section>



        </main>

        
    )
}