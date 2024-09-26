import {} from 'react'
import { Box } from "@chakra-ui/react"
import { ChatState } from "../../../Context/ChatProvider"
import SingleChat from '../../../components/SingleChat'




const ChatBox = ({ fetchAgain, setFetchAgain }) => {


const { selectedChat } = ChatState()





  return (
    <Box
    display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    alignItems="center"
    flexDirection="column"
    p={3}
    bg="white"
    w={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="10px"
    >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox