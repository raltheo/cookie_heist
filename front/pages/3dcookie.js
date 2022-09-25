import Head from 'next/head'
import Header from '../components/header'
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cookie from '../components/Cookie.js'

export default function dcookie() {
  


  return (
    <div>
      <Head>
        <title>Cookie Heist - 3d cookie</title>
        <meta name="description" content="Cookie heist pour récuperer les cookies et password" />
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <Header />
        <div className='container_3dcookie'>
        <Canvas
         camera={{ position: [2, 0, 12.25], fov: 15 }}
         
      >
         <ambientLight intensity={1.25} />
         <ambientLight intensity={0.1} />
         <directionalLight intensity={0.4} />
         <Suspense fallback={null}>
            <Cookie/>
         </Suspense>
         <OrbitControls />
      </Canvas>
        </div>
    </div>
  )
}
