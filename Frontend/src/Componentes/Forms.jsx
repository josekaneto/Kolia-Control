import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useState } from 'react';

export default function Forms() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [rgNumero, setRgNumero] = useState('');
  const [numeroReserva, setNumeroReserva] = useState('');
  const [hotel, setHotel] = useState('');
  const [allHospedes, setAllHospedes] = useState([]);
  const [fotoRosto, setFotoRosto] = useState(null);
  const [error, setError] = useState(''); // Para armazenar mensagens de erro

  async function handleSubmit(e) {
    e.preventDefault();

    // Log dos valores dos campos para depuração
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Telefone:', telefone);
    console.log('Estado:', estado);
    console.log('Cidade:', cidade);
    console.log('Endereço:', endereco);
    console.log('CEP:', cep);
    console.log('CPF:', cpf);
    console.log('RG:', rgNumero);
    console.log('Número da Reserva:', numeroReserva);
    console.log('Hotel:', hotel);
    console.log('Foto:', fotoRosto);

    // Validação dos campos obrigatórios
    const requiredFields = [nome, email, telefone, hotel, fotoRosto];
    const fieldNames = ['Nome', 'E-mail', 'Telefone', 'Hotel', 'Foto do Rosto'];

    for (let i = 0; i < requiredFields.length; i++) {
      if (!requiredFields[i]) {
        setError(`Por favor, preencha o campo: ${fieldNames[i]}`);
        return;
      }
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('telefone', telefone);
    formData.append('estado', estado);
    formData.append('cidade', cidade);
    formData.append('endereco', endereco);
    formData.append('cep', cep);
    formData.append('cpf', cpf);
    formData.append('rgNumero', rgNumero);
    formData.append('numeroReserva', numeroReserva);
    formData.append('hotel', hotel);
    formData.append('fotoRosto', fotoRosto);

    // Log para depuração
    console.log('FormData:', Array.from(formData.entries()));

    try {
      const res = await api.post('/hospedes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAllHospedes(prev => [...prev, res.data]);
      resetForm();
    } catch (error) {
      if (error.response) {
        console.error('Error saving data:', error.response.data);
        setError(error.response.data.message || 'Erro ao salvar os dados. Tente novamente.');
      } else {
        console.error('Error saving data:', error);
        setError('Erro ao salvar os dados. Tente novamente.');
      }
    }
  }

  const resetForm = () => {
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
    setFotoRosto(null);
    setError('');
  };

  return (
    <main className="w-full flex h-full font-main items-center flex-col p-[50px] gap-y-[50px]">
      <section className="bg-white w-full h-40 rounded-xl flex flex-col items-center justify-evenly border-t-8 border-verde ">
        <h2 className="text-4xl font-extrabold text-verde ">
          REALIZE SEU PRÉ CHECK-IN
        </h2>
        <p className="font-medium text-2xl">Preencha o Formulário</p>
      </section>

      {error && <p className="text-red-500">{error}</p>} {/* Mensagem de erro */}

      <section className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-wrap flex-col gap-y-5 items-center">
          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold" htmlFor="hoteis">
              Selecione o seu hotel:
            </label>
            <select
              id="hoteis"
              name="hoteis"
              className="font-bold text-lg py-3 w-full px-3 rounded-lg"
              required
              value={hotel}
              onChange={e => setHotel(e.target.value)}
            >
              <option hidden>Selecione o seu hotel</option>
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
          </div>

          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="reserva">
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
              Estado (UF):
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
              placeholder="Digite seu Endereço:"
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
              placeholder="Digite seu CEP"
              required
              value={cep}
              onChange={e => setCep(e.target.value)}
            />
          </div>

          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="cpf">
              CPF:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="text"
              id="cpf"
              placeholder="Digite seu CPF"
              required
              value={cpf}
              onChange={e => setCpf(e.target.value)}
            />
          </div>

          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="rgNumero">
              RG:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="text"
              id="rgNumero"
              placeholder="Digite seu RG"
              required
              value={rgNumero}
              onChange={e => setRgNumero(e.target.value)}
            />
          </div>

          <div className="flex flex-col bg-white py-5 gap-y-5 rounded-lg w-3/6">
            <label className="px-5 font-bold text-lg" htmlFor="fotoRosto">
              Foto do Rosto:
            </label>
            <input
              className="px-5 focus:outline-none"
              type="file"
              id="fotoRosto"
              required
              accept="image/*"
              onChange={e => setFotoRosto(e.target.files[0])}
            />
          </div>

          <div className="flex justify-center bg-white rounded-lg w-3/6">
            <button className="bg-verde text-white rounded-lg px-5 py-3 font-bold hover:bg-green-600">
              Enviar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
