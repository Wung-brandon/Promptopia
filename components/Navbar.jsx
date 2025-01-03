"use client"
import Image from "@node_modules/next/image"
import Link from "@node_modules/next/link"
import logoImg from "@public/assets/images/logo.svg"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "@node_modules/next-auth/react"
const Navbar = () => {
  const { data: session } = useSession()
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [providers, setProviders] = useState(null)
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);
  
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src={logoImg} 
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* {alert(providers)} */}
      {/* Desktop navigations */}
      <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">Create Post</Link>
                <button type="button" className="outline_btn" onClick={signOut}>Sign Out</button>
                <Link href="/profile">
                  <Image 
                    src={logoImg}
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="profile"
                  />
                </Link>
            </div>
          ) : (
            <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
              </button>
            ))}
            </>
          )}
      </div>
    {/* mobile navigation */}
    <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                    My Profile
                  </Link>
                  <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                    Create Prompt
                  </Link>
                  <button type="button" className="mt-5 w-full black_btn" onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                    }}>Sign Out</button>
                </div>
                
              )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign In
              </button>
            ))}
          </>
        )}
    </div>
    </nav>
  )
}

export default Navbar