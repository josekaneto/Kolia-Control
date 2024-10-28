import  { useContext } from 'react';
import { ContextFaceID } from '../context/ContextFaceID';

const FaceID = () => {
  const { 
    nome, setNome,
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
    selectedFiles, setSelectedFiles,
    fotoFrenteRG, setFotoFrenteRG,
    fotoVersoRG, setFotoVersoRG
  }
  = useContext(ContextFaceID)

    console.log(selectedFiles)

  return (
    <div>
      <p>Nome recebido: {nome}</p>
      <img src={`/${selectedFiles[0].name}`}/>
      <p>{email}</p>
      <p>{telefone}</p>
      <p>{estado}</p>
      <p>{cidade}</p>
      <p>{endereco}</p>
      <p>{cep}</p>
      <p>{cpf}</p>
      <p>{rgNumero}</p>
      <p>{numeroReserva}</p>
      <p>{hotel}</p>
      <img src={`/${fotoFrenteRG[0].name}`} alt="" />
      <img src={`/${fotoVersoRG[0].name}`} alt="" />
    </div>
  );
};

export default FaceID;