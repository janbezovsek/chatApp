import {} from 'react'
import { useDisclosure } from "@chakra-ui/hooks"
import { IconButton, Button } from "@chakra-ui/button"
import { ViewIcon } from "@chakra-ui/icons"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text
  } from '@chakra-ui/react'



const ProfileModal = ({ user, children }) => {


const { isOpen, onOpen, onClose } = useDisclosure()



return (
    <>
        {children ? ( <span onClick={onOpen}>{children}</span> )
        : ( <IconButton 
            display={{ base: "flex" }}
            icon={<ViewIcon />}
            onClick={onOpen}
            /> )
        }

<Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="400px">
          <ModalHeader
          fontSize="40px"
          fontFamily="Work sans"
          display = "flex"
          justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody 
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          >
            <Text
            fontSize={{ base: "28px", md: "30px" }}
            fontFamily="Work sans"
            >
                Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
)
}

export default ProfileModal