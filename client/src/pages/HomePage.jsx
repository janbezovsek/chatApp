import {useEffect} from 'react'
import { Container, Text ,Box,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
import { useNavigate } from 'react-router-dom';



const HomePage = () => {

  const navigate = useNavigate();



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"))
    

    if(user) {
        navigate("/ChatPage")
    }
},[navigate])




  return (
    
      <Container maxW="xl" centerContent> 
          <Box
          display="flex"
          justifyContent="center"
          p={5}
          m="50px 0 20px 0"
          w="80%"
          backgroundColor={"rgba(0, 0, 255, 0.3)"}
          
          borderRadius="lg"
          borderWidth="1px"
          >
            <Text fontSize="4xl" fontFamily="Work sans"  color="black"> Chat app </Text>
          </Box>
          <Box backgroundColor={"rgba(0, 0, 255, 0.3)"} w="80%" p={5} borderRadius="lg" borderWidth="1px">
          <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login/>
              </TabPanel>
              <TabPanel>
                <Register/>
              </TabPanel>
            </TabPanels>
          </Tabs>
          </Box>
      </Container>
      
    
  )
}

export default HomePage