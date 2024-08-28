import {} from 'react'
import axios from 'axios'

const ChatPage = () => {



let data2 = []


  axios.get("http://localhost:5000/api/chat")
    .then((data) => {
      data2 = data.data
      
      console.log(data2)
      
  })
  .catch((error) => {
      console.log(error)
  })

  



  return (
    
    <>
    
    </>
    
  )
}

export default ChatPage