import Head from 'next/head'
import Header from '../components/header'
import { instance } from "../axios"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Mobile from '../components/mobile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {

  const [email , setEmail ] = useState('')
  const [password , setPassword ] = useState('')
  const router = useRouter()

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  function notifyerr(a){
    toast.error(`${a}`);
  }
  function notifysucces(a){
    toast.success(`${a}`);
  }

  function login() {
    instance.post(`/login` , { username: email, password : password })
            .then(res => {
                
                if (typeof window !== 'undefined') {
                  
                    window.localStorage.setItem("token", res.data.token);
                    if(res.data.admin == 1){
                      window.localStorage.setItem("admin" , "admin");
                    }
                    router.push("/dashboard")
                }
            })
            .catch(err => {notifyerr("Mot de passe ou identifiant incorect")})
  } 

  return (
    <div>
      <Head>
        <title>Cookie Heist - Login</title>
        <meta name="description" content="Cookie heist pour récuperer les cookies et password" />
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <Header />
      <Mobile/>
      <div className="container">
        <div className="card">
            <h3 className='h3_login'>Login</h3>
            <div className="inputBox">
                <input type="text" required="required" value={email} onChange={handleChangeEmail}/>
                <span>Username</span>
            </div>

            <div className="inputBox">
                <input type="password" required="required" value={password} onChange={handleChangePassword}/>
                <span>Password</span>
            </div>

            <button onClick={login}>Enter</button>

        </div>
    </div>
    <ToastContainer position="bottom-right"/>
    </div>
  )
}
