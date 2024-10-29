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
    const displaySize = { width: 940, height: 650 };
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
        const text = bestMatch.label === 'unknown' ? nome : bestMatch.toString(); // Use nome se for desconhecido
        const drawBox = new faceapi.draw.DrawBox(box, { label: text });
        drawBox.draw(canvasRef.current);
        if (bestMatch.label !== 'unknown') {
          setIsRecognized(true); // Atualize o estado quando uma face for reconhecida
        }
      });
    }, 100);
  };

  return (
    <div className="myapp relative">
      <h1>Face Detection</h1>
      <div className="appvide">
        <video ref={videoRef} autoPlay width="940" height="650"></video>
      </div>
      <canvas ref={canvasRef} width="940" height="650" className="appcanvas absolute bottom-0 top-0 right-0 left-0"></canvas>
      <div>
        <p>Nome recebido: {nome}</p>
        {selectedFiles && selectedFiles[0] && (
          <img className="hidden" src={URL.createObjectURL(selectedFiles[0])} alt="Imagem carregada" />
        )}
      </div>
      {isRecognized && ( 
        <>
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
        </>
      )}
    </div>
  );
}

export default FaceID;