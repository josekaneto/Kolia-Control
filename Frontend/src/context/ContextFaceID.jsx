import  { createContext, useState } from 'react';

// Crie o contexto
export const ContextFaceID = createContext();

export const FaceIdProvider = ({ children }) => {

  const [nome, setNome] = useState('');
  const [ email, setEmail ] = useState('');
  const [ telefone, setTelefone ] = useState('');
  const [ estado, setEstado ] = useState('');
  const [ cidade, setCidade] = useState('');
  const [ endereco, setEndereco ] = useState('');
  const [ cep, setCep ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ rgNumero, setRgNumero] = useState('');
  const [ numeroReserva, setNumeroReserva] = useState('');
  const [ hotel, setHotel] = useState('');
  const [ allHospedes, setAllHospedes] = useState('')
  const [ selectedFiles, setSelectedFiles ] = useState('')
  const [ fotoFrenteRG, setFotoFrenteRG] = useState('')
  const [ fotoVersoRG, setFotoVersoRG] = useState('')


  return (
    <ContextFaceID.Provider value={
        { nome, setNome,
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
    }}>
      {children}
    </ContextFaceID.Provider>
  );
};