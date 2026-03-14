import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {

  const chat = useChat()

  const user = useSelector(state => state.auth.user)

  console.log("User in Dashboard:", user)

  useEffect(()=>{
    chat.initializedSocketConnection()
  },[])

  return (
    <div>
      
    </div>
  )
}

export default Dashboard
