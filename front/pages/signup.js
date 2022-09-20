import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import Link from 'next/link'
import { instance } from "../axios"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Signup() {

  const [email , setEmail ] = useState('')
  const [password , setPassword ] = useState('')
  const [key , setKey ] = useState('')
  const router = useRouter()

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const handleChangeKey = (event) => {
    setKey(event.target.value)
  }

  function notifyerr(a){
    toast.error(`${a}`);
  }
  function notifysucces(a){
    toast.success(`${a}`);
  }

  function signup() {
    instance.post(`/signup` , { username: email, password : password, key: key })
            .then(res => {
              
              router.push("/login")
            })
            .catch(err => {
              notifyerr("impossible de vous inscrire")
            })
  } 

  return (
    <div>
      <Head>
        <title>Cookie Heist - Inscription</title>
        <meta name="description" content="Cookie heist pour récuperer les cookies et password" />
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <Header />
      <div className="container">
        <div className="card_signup">
            <h3 className='h3_login'>Inscription</h3>
            <div className="inputBox">
                <input type="text" required="required" value={email} onChange={handleChangeEmail}/>
                <span>Username</span>
            </div>

            <div className="inputBox">
                <input type="password" required="required" value={password} onChange={handleChangePassword}/>
                <span>Password</span>
            </div>

            <div className="inputBox">
                <input type="password" required="required" value={key} onChange={handleChangeKey}/>
                <span>Key</span>
            </div>

            <button onClick={signup}>Enter</button>

        </div>
    </div>
    <ToastContainer position="bottom-right"/>
    </div>
  )
}
