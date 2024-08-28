import { useState } from 'react'
import { Button } from '@chakra-ui/button'
import {VStack} from "@chakra-ui/layout"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"

const Register = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [confirmpassword, setConfirmpassword] = useState()
    const [password, setPassword] = useState()
    const [pic, setPic] = useState()
    const [show, setShow] = useState(false)



    const handleClick = () => {
        setShow(!show)
    }

    const postDetails = (pics) => {

    }

    const submitHandler = () => {

    }



  return (
    <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
            <FormLabel>
                Name
            </FormLabel>
            <Input placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}></Input>
        </FormControl>

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

        <FormControl id="password" isRequired>
            <FormLabel>
                Confirm Password
            </FormLabel>
            <InputGroup>
            <Input type={show ? "text" : "password"} placeholder="Enter your password" onChange={(e)=>setConfirmpassword(e.target.value)}></Input>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    { show ? "Hide" : "Show" }
                </Button>
            </InputRightElement>
            </InputGroup>  
        </FormControl>

        <FormControl id="pic">
            <FormLabel>Upload your picture
                <Input type="file" p={1.5} accept="image/*" onChange={(e) => postDetails(e.target.files[0])}/>
            </FormLabel>
        </FormControl>

        <Button
        colorScheme='blue'
        width="100%"
        style={{marginTop: 15}}
        onClick={submitHandler}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default Register