import { Outlet } from "react-router-dom"
import Header from "./Componentes/Header"
import Forms from "./Componentes/forms"

function App() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
