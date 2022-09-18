
import Link from "next/link";
import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Header() {
    const [admin, setAdmin] = React.useState(false)
    const [connecter, setConnecter ] = React.useState(false)
    const router = useRouter();
    useEffect(() => {
      if (localStorage.getItem("token")) {
          setConnecter(true)
      }
      if (localStorage.getItem("admin")) {
        setAdmin(true)
      }
    }, [])

    function logout(){
      if (typeof window !== 'undefined') {
        window.localStorage.clear()
        setConnecter(false)
        setAdmin(false)
        router.push('/')
      }
    }

  return (
    <div>
     

      <div className='container_header'>
        <div className='header'>
            <div className='titre_header'>
                <h2 className='h2_header'>Cookie Heist</h2>
            </div>
            <div className='nav_header'>
                {!connecter &&<Link href='/'>
                    <p className={router.pathname == "/" ? "active_header" : "inactive_header"}>Accueil</p>
                </Link>}
                {!connecter && <Link href='/login'>
                    <p className={router.pathname == "/login" ? "active_header" : "inactive_header"}>Login</p>
                </Link>}
                {!connecter &&<Link href='/signup'>
                    <p className={router.pathname == "/signup" ? "active_header" : "inactive_header"}>Sign-Up</p>
                </Link>}
                {connecter &&<Link href='/dashboard'>
                    <p className={router.pathname == "/dashboard" ? "active_header" : "inactive_header"}>Dashboard</p>
                </Link>}
                {admin && 
                  <Link href='/admin'>
                    <p className={router.pathname == "/admin" ? "active_header" : "inactive_header"}>Admin Panel</p>
                  </Link>
                }
                {connecter &&<Link href='/profile'>
                    <p className={router.pathname == "/profile" ? "active_header" : "inactive_header"}>Profile</p>
                </Link>}
                {connecter && 
                  <p className="inactive_header" onClick={logout}>log-out</p>
                }
            </div>
        </div>
      </div>

    </div>
  )
}