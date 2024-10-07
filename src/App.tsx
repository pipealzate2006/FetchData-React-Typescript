import { useState } from 'react'
import "./index.css"
import ApiCards from './components/ApiCards'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ApiCards />
    </>
  )
}

export default App
