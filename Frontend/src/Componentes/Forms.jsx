import { Link } from 'react-router-dom';
import api from '../services/api'
import { useContext, useState } from 'react';
import { ContextFaceID } from '../context/ContextFaceID';



export default function Forms() {

  const { nome, setNome,
    email, setEmail,
    telefone, setTelefone,
    estado, setEstado,
    cidade, setCidade,
    endereco, setEndereco,
    cep, setCep,
    cpf, setCpf,
    rgNumero, setRgNumero,
    numeroReserva, setNumeroReserva,
    hotel, setHotel,
    allHospedes, setAllHospedes,
    selectedFiles, setSelectedFiles,
    fotoFrenteRG, setFotoFrenteRG,
    fotoVersoRG, setFotoVersoRG


  } = useContext(ContextFaceID);


  async function handleSubmit(e) {
    e.preventDefault(); 

    try {
      const res = await api.post('/hospedes', {
        nome,
        email,
        telefone,
        estado,
        cidade,
        endereco,
        cep,
        cpf,
        rgNumero,
        numeroReserva,
        hotel,
      });

      setAllHospedes([...allHospedes, res.data]);

      setNome('');
      setEmail('');
      setTelefone('');
      setEstado('');
      setCidade('');
      setEndereco('');
      setCep('');
      setCpf('');
      setRgNumero('');
      setNumeroReserva('');
      setHotel('');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return (
    <main className="w-full flex h-full font-main items-center flex-col p-[50px] gap-y-[50px]">
      <section className="bg-white w-full h-40 rounded-xl flex flex-col items-center justify-evenly border-t-8 border-verde ">
        <h2 className="text-4xl font-extrabold text-verde ">
          REALIZE SEU PRÉ CHECK-IN
        </h2>
        <p className="font-medium text-2xl">Preencha o Formulário</p>
      </section>

      <section className="w-full">
        <form onSubmit={handleSubmit} action="" className="flex flex-wrap flex-col gap-y-5 items-center" >
          <select
            id="hoteis"
            name="Selecione o seu hotel"
            title="Selecione o seu hotel"
            className="font-bold text-lg py-11 w-3/6 px-3 rounded-lg"
            required 
            value={hotel} 
            onChange={e => setHotel(e.target.value)}
            
          >
            <option hidden>
              Selecione o seu hotel
            </option>
            <optgroup label="Rede de Hotéis 1">
              <option value="1.1">Hotel 1.1</option>
              <option value="1.2">Hotel 1.2</option>
            </optgroup>
            <optgroup label="Rede de Hotéis 2">
              <option value="2.1">Hotel 2.1</option>
              <option value="2.2">Hotel 2.2</option>
            </optgroup>
            <optgroup label="Rede de Hotéis 3">
              <option value="3.1">Hotel 3.1</option>
              <option value="3.2">Hotel 3.2</option>
            </optgroup>
          </select>
          <div className="flex flex-col bg-white py-5 gap-y-5 w rounded-lg w-3/6">
            <label htmlFor="reserva" className="font-bold text-lg px-5">
              Número da reserva:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="text"
              id="reserva"
              placeholder="Digite o número da sua reserva"
              required 
              value={numeroReserva} 
              onChange={e => setNumeroReserva(e.target.value)}

            />
          </div>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="nome">
              Nome:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="text"
              id="nome"
              placeholder="Digite o seu Nome"
              required
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </div>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="email">
              E-mail:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="email"
              id="email"
              placeholder="Digite o seu E-mail"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="telefone">
              Telefone:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="tel"
              id="telefone"
              placeholder="(XX) XXXXX-XXXX"
              required
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
            />
          </div>

          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="estado">
              Estado(UF):
            </label>
            <input
              className="px-5 focus:outline-none"
              type="text"
              id="estado"
              placeholder="Digite sua UF"
              required
              value={estado}
              onChange={e => setEstado(e.target.value)}
            />
          </div>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="cidade">
              Cidade:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="text"
              id="cidade"
              placeholder="Digite a sua Cidade:"
              required
              value={cidade}
              onChange={e => setCidade(e.target.value)}
            />
          </div>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="endereco">
              Endereço:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="text"
              id="endereco"
              placeholder="Digite o seu Endereço:"
              required
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
            />
          </div>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="cep">
              CEP:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="text"
              id="cep"
              placeholder="Digite o seu CEP:"
              required
              value={cep}
              onChange={e => setCep(e.target.value)}
            />
          </div>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold" htmlFor="cpf">
              CPF:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="text"
              id="cpf"
              placeholder="Digite o seu CPF"
              required
              value={cpf}
              onChange={e => setCpf(e.target.value)}
            />
          </div>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold" htmlFor="rg">
              RG:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="text"
              id="rg"
              placeholder="Digite o seu RG"
              required
              value={rgNumero}
              onChange={e => setRgNumero(e.target.value)}
            />
          </div>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold" htmlFor="fotoRgFrente">
              Adicione a imagem da frente do seu RG:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="file"
              id="fotoRgFrente"
              accept="image/*"
              required
              onChange={e => setFotoFrenteRG(e.target.files)}
            />
          </div>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold" htmlFor="fotoRgVerso">
              Adicione a imagem do verso do seu RG:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="file"
              id="fotoRgVerso"
              multiple accept="image/png, image/jpg"
              required
              onChange={e => setFotoVersoRG(e.target.files)}
            />
          </div>
          <h1 className=" text-2xl font-extrabold text-verde">
            Reconhecimento Facial
          </h1>
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold" htmlFor="fotoRosto">
              Adicione uma imagem do seu rosto:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="file"
              id="fotoRosto"
              multiple accept="image/png, image/jpg"
              required
              onChange={e => setSelectedFiles(e.target.files)}
            />
          </div>
          <Link
            to={`/FaceID/${nome}`}
            type="submit"
            value="Enviar"
            id="button_submit"
            className="block bg-verde w-3/6 p-3 rounded-lg hover:bg-white hover:border-verde hover:border-2 font-bold text-center"
          >Enviar</Link>
        </form>
      </section>
    </main>
  );
}
