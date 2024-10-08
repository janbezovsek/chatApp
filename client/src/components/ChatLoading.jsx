import {} from 'react'
import { Skeleton } from "@chakra-ui/skeleton"
import { Stack } from "@chakra-ui/layout"

const ChatLoading = () => {
  return (
    <Stack>
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
    </Stack>
  )
}

export default ChatLoading