import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin, faEthereum, faPaypal, } from "@fortawesome/free-brands-svg-icons"
import Mobile from '../components/mobile';
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem("token")){
      router.push("/dashboard")
    }
    

  }, [])

  return (
    <div>
      <Head>
        <title>Cookie Heist</title>
        <meta name="description" content="Cookie heist pour récuperer les cookies et password" />
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <Header />
      <Mobile/>
      <div className='container_accueil'>
        <div className='accueil_1'>
          <div className='cookie_img'></div>
          <div className='container_titre_accueil'>

            <h1 className='titre_accueil'>Cookie Heist Panel</h1>
            <p className='text_accueil'>Récupérez les cookies et mots de passe des navigateurs web (Opéra GX, Google Chrome...)</p>

            <div className='container_btn_accueil'>
              <div className='div_btn_accueil'>
                <Link href="/login">
                  <p className='p_btn_accueil'>Connexion</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='accueil_2'>
          <div className='container_texte_accueil_2'>
            <p>Cookie heist est encore jeune et nous sommes continuellement en train de nous améliorer, si vous avez des idées a nous faire part n'hésitez pas</p>
          </div>
          <div className='container_moyens_paiement'>
            <p>Moyens de paiements :</p>
            <div className='container_icon_prix'>
              <FontAwesomeIcon className='icon_prix' icon={faPaypal}/>
              <FontAwesomeIcon className='icon_prix' icon={faBitcoin}/>
              <FontAwesomeIcon className='icon_prix' icon={faEthereum}/>
            </div>
          </div>
          <div className='container_prix'>
            <div className='prix'>
              <div className='container_titre_prix'>
                <h2 className='titre_prix'>Basic</h2>
              </div>
              <div className='body_prix'>
                <h2>24,99€</h2>
                <p>1 mois</p>
              </div>
              <div className='container_btn_prix'>
                <div className='div_btn_prix'>
                  <p>Acheter</p>
                </div>
              </div>
            </div>
            <div className='prix'>
              <div className='container_titre_prix'>
                <h2 className='titre_prix'>Gold</h2>
              </div>
              <div className='body_prix'>
                <h2>64,99€</h2>
                <p>3 mois</p>
              </div>
              <div className='container_btn_prix'>
                <div className='div_btn_prix'>
                  <p>Acheter</p>
                </div>
              </div>
            </div>
            <div className='prix'>
              <div className='container_titre_prix'>
                <h2 className='titre_prix'>Ultimate</h2>
              </div>
              <div className='body_prix'>
                <h2>250€</h2>
                <p>Life-time</p>

              </div>
              <div className='container_btn_prix'>
                <div className='div_btn_prix'>
                  <p>Acheter</p>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>



    </div>
  )
}
