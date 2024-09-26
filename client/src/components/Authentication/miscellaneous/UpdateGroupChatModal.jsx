import {useState} from 'react'
import axios from 'axios'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    FormControl,
    Input,
    Spinner,
} from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { IconButton, Button } from '@chakra-ui/button'
import { ViewIcon } from '@chakra-ui/icons'
import { ChatState } from "../../../Context/ChatProvider"
import UserBadgeItem from '../../UserAvatar/UserBadgeItem'
import UserListItem from '../../UserAvatar/UserListItem'



const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {

const { isOpen, onOpen, onClose } = useDisclosure()

const { selectedChat, setSelectedChat, user } = ChatState()

const [groupChatName, setGroupChatName] = useState()

const [search, setSearch] = useState("")

const [searchResult, setSearchResult] = useState([])

const [loading, setLoading] = useState(false)

const [renameloading, setRenameLoading] = useState(false)

const toast = useToast()



const handleRemove = async (user1) => {
  if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
    toast({
      title: "Only admins can remove someone!",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    })
    return
  }

  try {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/chat/groupremove`,
      {
        chatId: selectedChat._id,
        userId: user1._id,
      },
      config
    );

    user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
    setFetchAgain(!fetchAgain)
    setLoading(false)
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
  }
  setGroupChatName("");

}


const handleRename = async () => {
  if (!groupChatName) return

    try {
      setRenameLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      
      
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false)
    }
    setGroupChatName("")
}


const handleSearch = async (query) => {
  setSearch(query)
    if (!query) {
      return
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
      
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
}
}


const handleAddUser = async (user1) => {
  if (selectedChat.users.find((u) => u._id === user1._id)) {
    toast({
      title: "User Already in group!",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }

  if (selectedChat.groupAdmin._id !== user._id) {
    toast({
      title: "Only admins can add someone!",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }

  try {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/chat/groupadd`,
      {
        chatId: selectedChat._id,
        userId: user1._id,
      },
      config
    );

    setSelectedChat(data)
    setFetchAgain(!fetchAgain)
    setLoading(false)
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false)
  }
  setGroupChatName("")

}

  return (
    <>
      <IconButton onClick={onOpen} display={{base:"flex"}} icon={<ViewIcon />}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="35px"
          fontFamily="Work sans"
          display="flex"
          justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
            w="100%" display="flex" flexWrap="wrap" pb={3}
            >
            {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>

            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>

            <FormControl>
                <Input 
                placeholder='Add user to the group'
                mb={1}
                onChange={(e)=> handleSearch(e.target.value)}
                />
            </FormControl>
 
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue'onClick={()=> handleRemove(user)}>
              Leave group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal