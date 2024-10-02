import { useState } from 'react'
import axios from 'axios'
import { Button } from '@chakra-ui/button'
import {VStack} from "@chakra-ui/layout"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'




const Login = () => {

    //state for email
    const [email, setEmail] = useState("")

    //state for password
    const [password, setPassword] = useState("")


    const [show, setShow] = useState(false)

    const [loading, setLoading] = useState(false)

    //for form functionality when typed in data is correct or false
    const toast = useToast()

    const history = useNavigate()



    const handleClick = () => {
        setShow(!show)
    }

    const submitHandler = async () => {

        
        setLoading(true)

        if( !email || !password ) {
            toast({
                title: 'Please fill all of the fields.',
                description: "Warning",
                status: 'warning',
                duration: 6000,
                isClosable: true,
                position: 'bottom',
            })
            setLoading(false)
            return
        }


        
        //sending our data to designated API
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }


            const { data } = await axios.post(
                "http://localhost:5000/api/user/login", 
                { email, password },
                config
            )

            toast({
                title: 'Login successful.',
                description: "You are now loged in",
                status: 'success',
                duration: 6000,
                isClosable: true,
                position: 'bottom',
            })
            
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false)
            history('/ChatPage')

        } catch (error) {
            
            toast({
                title: 'Error occured.',
                description: error.response.data.message,
                status: 'error',
                duration: 6000,
                isClosable: true,
                position: 'bottom',
            })
            setLoading(false)
        }


    }



  return (
    <VStack spacing="5px">
        

        <FormControl id="email" isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
            <Input type={show ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}></Input>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    { show ? "Hide" : "Show" }
                </Button>
            </InputRightElement>
            </InputGroup>  
        </FormControl>

        <Button
        colorScheme='blue'
        width="100%"
        style={{marginTop: 15}}
        onClick={submitHandler}
        isLoading={loading}
        >
            Login
        </Button>

        <Button
        variant="solid"
        width="100%"
        colorScheme='green'
        onClick={()=> {
            setEmail("guest@example.com");
            setPassword("password")
        }}
        >
            Get Guest user credentials
        </Button>
    </VStack>
  )
}

export default Login