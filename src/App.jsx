import Input from './components/Input'
import { Box } from '@chakra-ui/react'
import './App.css'
import List from './components/List'
function App() {
  

  return (
    <div style={{margin:"auto" ,marginTop:"50px"}}>
    <Input/>
    <Box width={{lg:"lg"}} m={"auto"}>
    <List/>
    </Box>
   </div> 
  )
}

export default App
