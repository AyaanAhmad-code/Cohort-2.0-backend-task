import React from 'react'
import { Link, useNavigate } from 'react-router'
import FormGroup from '../components/FormGroup'
import { useState } from 'react'
import "../style/login.scss"
import {useAuth} from "../hooks/useAuth"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {loading,handleLogin} = useAuth()

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        await handleLogin({email,password})

        navigate("/")
    }

  return (
    <main className="login-page">
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <FormGroup value={email} onChange={(e)=>{setEmail(e.target.value)}} label="email" placeholder="Enter you email"/>
                <FormGroup value={password} onChange={(e)=>{setPassword(e.target.value)}} label="password" placeholder="Enter you password" />
                <button className='button' type='submit'>Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    </main>
  )
}

export default Login
