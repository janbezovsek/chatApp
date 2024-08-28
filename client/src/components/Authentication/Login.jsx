import { useState } from 'react'
import { Button } from '@chakra-ui/button'
import {VStack} from "@chakra-ui/layout"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"




const Login = () => {

    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [show, setShow] = useState(false)



    const handleClick = () => {
        setShow(!show)
    }

    const submitHandler = () => {

    }



  return (
    <VStack spacing="5px">
        

        <FormControl id="email" isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}></Input>
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
            <Input type={show ? "text" : "password"} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}></Input>
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