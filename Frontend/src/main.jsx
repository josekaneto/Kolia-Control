import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FaceID from './Pages/FaceID.jsx'
import Forms from './Componentes/Forms.jsx'
import { FaceIdProvider } from './context/ContextFaceID.jsx'

const router = createBrowserRouter([
  {
    path: '/', element:<App/>,
   children: [
    {index:true, element:<Forms/>},
    {path: "/FaceID/:_id?", element:<FaceID/>}
   ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FaceIdProvider>
      <RouterProvider router={router} />
    </FaceIdProvider>
  </StrictMode>,
)

