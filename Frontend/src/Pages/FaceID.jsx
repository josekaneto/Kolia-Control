import { useRef, useEffect, useState } from "react";
import * as faceapi from 'face-api.js';
import { useParams } from 'react-router-dom';
import './App.css';

function FaceID() {
    const { nome } = useParams(); // Obtendo o nome da URL
    const [labeledDescriptors, setLabeledDescriptors] = useState(null);
    const videoRef = useRef();
    const canvasRef = useRef();
    const [fotoRosto, setFotoRosto] = useState(null); // Para armazenar a imagem do rosto

    useEffect(() => {
        startVideo();
        loadModels();
    }, []);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error('Erro ao acessar a câmera:', err);
        }
    };

    const loadModels = () => {
        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'), 
            faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
            faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
            faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
            faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights'),
        ]).then(() => {
            loadLabeledImages().then(descriptors => {
                setLabeledDescriptors(descriptors);
                faceDetection(descriptors);
            });
        }).catch(err => console.error('Erro ao carregar modelos:', err));
    };

    async function loadLabeledImages() {
        const labels = [nome]; // Usando o nome da URL

        return Promise.all(
            labels.map(async label => {
                const descriptions = [];
                // Carregar a imagem enviada pelo usuário
                const img = await faceapi.fetchImage(`url-to-your-image/${label}.jpg`); // Use o caminho correto para a imagem do rosto
                const detections = await faceapi.detectSingleFace(img).withFaceDescriptor();

                if (detections) {
                    descriptions.push(detections.descriptor);
                } else {
                    console.error(`Nenhum rosto detectado na imagem: ${label}.jpg`);
                }
                return new faceapi.LabeledFaceDescriptors(label, descriptions);
            })
        );
    }

    const faceDetection = (descriptors) => {
        const faceMatcher = new faceapi.FaceMatcher(descriptors, 0.6);
        const displaySize = { width: 940, height: 650 };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
            ).withFaceDescriptors();

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            const context = canvasRef.current.getContext("2d");
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            resizedDetections.forEach(detection => {
                const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
                const box = detection.detection.box;
                const text = bestMatch.toString();

                const drawBox = new faceapi.draw.DrawBox(box, { label: text });
                drawBox.draw(canvasRef.current);
            });
        }, 100);
    };

    return (
        <div className="myapp">
            <h1>Face Detection</h1>
            <div className="appvide">
                <video ref={videoRef} autoPlay width="940" height="650"></video>
            </div>
            <canvas ref={canvasRef} width="940" height="650" className="appcanvas"></canvas>
        </div>
    );
}

export default FaceID;
