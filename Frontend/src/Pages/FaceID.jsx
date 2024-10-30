import { useRef, useEffect, useState, useContext } from "react";
import * as faceapi from 'face-api.js';
import { useParams } from 'react-router-dom';
import { ContextFaceID } from '../context/ContextFaceID';

function FaceID() {
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
    selectedFiles, setSelectedFiles,
    fotoFrenteRG, setFotoFrenteRG,
    fotoVersoRG, setFotoVersoRG } = useContext(ContextFaceID);
  console.log('Parametro nome recebido:', nome); // Log para depuração
  const [labeledDescriptors, setLabeledDescriptors] = useState(null);
  const [isRecognized, setIsRecognized] = useState(false); // Novo estado
  const videoRef = useRef();
  const canvasRef = useRef();
  let detectionInterval;

  useEffect(() => {
    startVideo();
    loadModels();
    return () => clearInterval(detectionInterval);
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Erro ao acessar a câmera:', err);
    }
  };

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
      ]);
      console.log('Modelos carregados com sucesso.');
      const descriptors = await loadLabeledImages();
      if (descriptors.length > 0) {
        setLabeledDescriptors(descriptors);
        faceDetection(descriptors);
      } else {
        console.error('Nenhum descritor válido encontrado.');
      }
    } catch (err) {
      console.error('Erro ao carregar modelos:', err);
    }
  };

  async function loadLabeledImages() {
    const labels = [nome]; // Alterado para usar 'nome'
    console.log('Labels:', labels);  // Adicionado para depuração
    return Promise.all(
      labels.map(async label => {
        const descriptions = [];
        if (selectedFiles && selectedFiles[0]) {
          const file = selectedFiles[0];
          const reader = new FileReader();
          return new Promise((resolve) => {
            reader.onload = async () => {
              const img = await faceapi.fetchImage(reader.result);
              console.log('Imagem carregada:', img);
              const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
              if (detections) {
                descriptions.push(detections.descriptor);
              }
              resolve(new faceapi.LabeledFaceDescriptors(String(label), descriptions)); // Certifique-se de que label é uma string
            };
            reader.readAsDataURL(file);
          });
        } else {
          console.error('Nenhum arquivo de imagem fornecido.');
          return new faceapi.LabeledFaceDescriptors(String(label), descriptions); // Certifique-se de que label é uma string
        }
      })
    );
  }

  const faceDetection = (descriptors) => {
    const faceMatcher = new faceapi.FaceMatcher(descriptors, 0.6); // Ajuste o limiar de correspondência conforme necessário
    const displaySize = { width: 640, height: 350 };
    faceapi.matchDimensions(canvasRef.current, displaySize);
  
    detectionInterval = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks().withFaceDescriptors();
  
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const context = canvasRef.current.getContext("2d");
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  
      resizedDetections.forEach(detection => {
        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
        const box = detection.detection.box;
        
        const text = bestMatch.label === 'unknown' ? 'Desconhecido' : bestMatch.label;
        const drawBox = new faceapi.draw.DrawBox(box, { label: text });
        drawBox.draw(canvasRef.current);
  
        if (bestMatch.label !== 'unknown') {
          setIsRecognized(true);
        }
      });
    }, 100);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <video ref={videoRef} autoPlay width="640" height="350"></video>
      <canvas ref={canvasRef} width="640" height="350" className="absolute top-0 left-0"></canvas>
      </div>
      {isRecognized && ( 
        <div className="flex flex-col items-center w-full gap-5 mt-5">

          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">Hotel: </h2>
            <p className="text-lg">{hotel}</p>
          </div>

          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">Número da Reserva: </h2>
            <p className="text-lg">{numeroReserva}</p>
          </div>
          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">Nome: </h2>
            <p className="text-lg">{nome}</p>
          </div>
          
          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">E-mail: </h2>
            <p className="text-lg">{email}</p>
          </div>
          
          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">Telefone: </h2>
            <p className="text-lg">{telefone}</p>
          </div>
          
          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">Estado(UF): </h2>
            <p className="text-lg">{estado}</p>
          </div>
          
          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">Cidade: </h2>
            <p className="text-lg">{cidade}</p>
          </div>
          
          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">Endereço: </h2>
            <p className="text-lg">{endereco}</p>
          </div>
          
          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">CEP: </h2>
            <p className="text-lg">{cep}</p>
          </div>
          
          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">CPF: </h2>
            <p className="text-lg">{cpf}</p>
          </div>
          
          <div className="pl-3 py-5 bg-white border border-green-500 w-6/12">
            <h2 className="font-bold text-xl">RG: </h2>
            <p className="text-lg">{rgNumero}</p>
          </div>

        <div className="flex w-6/12">
          <div className="pl-3 py-5 bg-white border border-green-500 w-2/3 mr-5">
            <h2 className="font-bold text-xl">Frente RG: </h2>
            <img src={`/${fotoFrenteRG[0].name}`} alt="foto" className="w-full h-auto pr-3 mt-3"/>
          </div>

          <div className="pl-3 py-5 bg-white border border-green-500 w-2/3">
            <h2 className="font-bold text-xl">Verso RG: </h2>
            <img src={`/${fotoVersoRG[0].name}`} alt="foto" className="w-full h-auto pr-3 mt-3"/>
          </div>
        </div>


        </div>
      )}
    </div>
  );
}

export default FaceID;
