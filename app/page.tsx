// import Image from 'next/image'
import Header  from "./components/header"
import Pointers from "./components/pointmarker"
import Userdata from "./components/usermanagement"
import Drawingshapes from "./components/drawingshapes"
export default function Home() {
  return (
    
    <main>
       <Header></Header>
       <Userdata></Userdata>
       <Drawingshapes></Drawingshapes>
       <Pointers></Pointers>
    </main>
  )
}
