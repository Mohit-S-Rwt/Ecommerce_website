import React from 'react'
import Header from "./Header"; 
// functional components hai header and footer
import Footer from  "./Footer"

const Layout = ({children}) => {
  return (
    <div>
     <Header/>
      <main style={{minHeight :"80vh"}}>
      {children}
      </main>
        
      <Footer/>
     
    </div>
  )
}

export default Layout;