import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Box, Text } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { Tooltip, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useToast} from "@chakra-ui/react"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { Avatar } from "@chakra-ui/avatar"
import { ChatState } from "../../../Context/ChatProvider"
import ProfileModal from './ProfileModal'



const SideDrawer = () => {


  const [ search, setSearch ] = useState("")
  const [ searchResult, setSearchResult ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ loadingChat, setLoadingChat ] = useState()

  
  //drawer component hook
  const { isOpen, onOpen, onClose } = useDisclosure()

   //useNavigate hook
   const navigate = useNavigate();


  //getting info from user object
const { user } = ChatState()

//loging out to login page
const logoutHandler = () => {
  localStorage.removeItem("userInfo")
  navigate("/")
}

const toast = useToast()

//searching users
const handleSearch = async () => {
    if(!search) {
      toast({
        title: "Please enter something in the search",
        status: "warning",
        duration: 5000,
        isClosable : true,
        position: "top-left",
      })
      return
    }
    
    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`,
        config
      )

      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title: "Error occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable : true,
        position: "bottom-left",
      })
    }

}







  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip
        label="Search users to chat with"
        hasArrow
        placement="bottom-end"
        >
        <Button variant="ghost" onClick={onOpen}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <Text display={{base:"none", md:"flex"}} px="4">
          Search user
        </Text>
        </Button>
        </Tooltip>


        <Text fontSize="2xl" fontFamily="Work sans">
          Chat app
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1}/>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size="sm" cursor="pointer" name={user.name}>
              </Avatar>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search users</DrawerHeader>
          <DrawerBody>
          <Box display="flex" paddingBottom={2}>
            <Input 
              placeHolder="Search by name or email"
              mr={2}
              value={search}
              onChange={(e)=> setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}
            >
              Go
            </Button>
          </Box>
          
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer