import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin, faEthereum, faDiscord } from "@fortawesome/free-brands-svg-icons"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import YouTube from "react-youtube";
import { useRouter } from 'next/router'
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cookie from '../components/Cookie.js'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard")
    }

    if (window.innerWidth <= 675) setTel(true)

  }, [])
  const [tel, setTel] = useState(false)
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const opts2 = {
    height: "290",
    width: "320",
    playerVars: {
      autoplay: 1,
    },
  };

  function onReady(e) {
    e.target.pauseVideo();
  }


  return (
    <div>
      <Head>
        <title>Cookie Heist</title>
        <meta name="description" content="Cookie heist pour récuperer les cookies et password" />
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <Header />
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
            <p>Cookie heist est encore jeune et nous sommes continuellement en train de nous améliorer, si vous avez des idées a nous faire part n&apos;hésitez pas</p>
          </div>
          <div className='container_moyens_paiement'>
            <p>Moyens de paiements :</p>
            <div className='container_icon_prix'>

              <FontAwesomeIcon className='icon_prix' icon={faBitcoin} />
              <FontAwesomeIcon className='icon_prix' icon={faEthereum} />
              <p>Paysafecard</p>
            </div>
          </div>
          <div className='container_prix'>
            <div className='prix'>
              <div className='container_titre_prix'>
                <h2 className='titre_prix'>Basic</h2>
              </div>
              <div className='body_prix'>
                <h2>18,99€</h2>
                <p>1 mois</p>
              </div>
              <div className='container_btn_prix'>
                <div className='div_btn_prix'>
                  <Link href="https://discord.gg/njXxyHwKFh"><p>Acheter</p></Link>
                </div>
              </div>
            </div>
            <div className='prix'>
              <div className='container_titre_prix'>
                <h2 className='titre_prix'>Gold</h2>
              </div>
              <div className='body_prix'>
                <h2>54,99€</h2>
                <p>3 mois</p>
              </div>
              <div className='container_btn_prix'>
                <div className='div_btn_prix'>
                  <Link href="https://discord.gg/njXxyHwKFh"><p>Acheter</p></Link>
                </div>
              </div>
            </div>
            <div className='prix'>
              <div className='container_titre_prix'>
                <h2 className='titre_prix'>Ultimate</h2>
              </div>
              <div className='body_prix'>
                <h2>139,99€</h2>
                <p>Life-time</p>

              </div>
              <div className='container_btn_prix'>
                <div className='div_btn_prix'>
                  <Link href="https://discord.gg/njXxyHwKFh"><p>Acheter</p></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='accueil_3'>
          <h2>Our Staff :</h2>
          <div className='container_staff'>
            <div className='container_card_staff'>
              <div className='card_staff'>
                <div className='container_img_staff'><Image src="/ralbatard.jpg" alt="photo de profile staff" className="img_who" width={250} height={250} quality={100} /></div>
                <FontAwesomeIcon className='icon_prix' icon={faDiscord} />
                <p>ralbatard#9561</p>
              </div>
              <p>Developper</p>
            </div>

            <div className='container_card_staff'>
              <div className='card_staff'>
                <div className='container_img_staff'><Image src="/rolio.png" alt="photo de profile staff" className="img_who" width={250} height={250} quality={100} /></div>
                <FontAwesomeIcon className='icon_prix' icon={faDiscord} />
                <p>Roliojulio#0001</p>
              </div>
              <p>Co-funder</p>
            </div>

            <div className='container_card_staff'>
              <div className='card_staff'>
                <div className='container_img_staff'><Image src="/paff.png" alt="photo de profile staff" className="img_who" width={250} height={250} quality={100} /></div>
                <FontAwesomeIcon className='icon_prix' icon={faDiscord} />
                <p>paff~S#0347</p>
              </div>
              <p>Discord Administrator</p>
            </div>
          </div>
        </div>
        <div className='accueil_4'>
          <h2>Explication vidéos :</h2>
          {!tel && <YouTube videoId="T0wLKc3W8Nc" opts={opts} onReady={onReady} />}
          {tel && <YouTube videoId="T0wLKc3W8Nc" opts={opts2} onReady={onReady} />}
        </div>
        <div className='accueil_5'>
          <Canvas
            camera={{ position: [2, 0, 12.25], fov: 15 }}>
            <ambientLight intensity={1} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.4} />
            <Suspense fallback={null}>
              <Cookie/>
            </Suspense>
            <OrbitControls enableZoom={false}/>
          </Canvas>
        </div>

      </div>
    </div>
  )
}
