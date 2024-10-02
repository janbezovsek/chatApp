import { useState } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    Input,
    Box,
} from '@chakra-ui/react'
import UserListItem from '../../UserAvatar/UserListItem'
import UserBadgeItem from '../../UserAvatar/UserBadgeItem'
import { Button } from "@chakra-ui/button"
import { ChatState } from "../../../Context/ChatProvider" 
import  { FormControl } from "@chakra-ui/form-control"
import axios from 'axios'



const GroupChatModal = ({ children }) => {


    const { isOpen, onOpen, onClose } = useDisclosure()

    //naming group chats
    const [groupChatName, setGroupChatName] = useState()

    //state for selected users
    const [selectedUsers, setSelectedUsers] = useState([])

    const [search, setSearch] = useState("")

    const [searchResult, setSearchResult] = useState([])

    const [loading, setLoading] = useState(false)

    //to give feedback to users after an action has taken place
    const toast = useToast()

    //context API props
    const { user, chats, setChats } = ChatState()


    const handleSubmit =async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
              title: "Please fill all the feilds",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            return;
          }
      
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
            const { data } = await axios.post(
              `http://localhost:5000/api/chat/group`,
              {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
              },
              config
            )
            setChats([data, ...chats]);
            onClose();
            toast({
              title: "New Group Chat Created!",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            })
          } catch (error) {
            toast({
              title: "Failed to Create the Chat!",
              description: error.response.data,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
    }

    //searching users
    const handleSearch =async (query) => {
        setSearch(query)

        if(!query){
            return
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
              const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
              
              setLoading(false);
              setSearchResult(data);



        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              })
        }
}

    //add users to selected users
    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
              title: "User already added",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            return;
          }
      
          setSelectedUsers([...selectedUsers, userToAdd]);
    }


    //deleting user from group chat
    const handleDelete = (deleteUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deleteUser._id))
    }



  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="35px"
          fontFamily="Work sans"
          display="flex"
          justifyContent="center"
          >Create group chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          >
            <FormControl>
                <Input 
                placeholder="Chat Name" 
                mb={3}
                onChange={(e)=>setGroupChatName(e.target.value)}
                />
            </FormControl>

            <FormControl>
                <Input 
                placeholder="Add users" 
                mb={1}
                onChange={(e)=>handleSearch(e.target.value)}
                />
            </FormControl>
            
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>

            {loading ? (
              
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Create chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal