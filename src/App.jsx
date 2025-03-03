import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {
  
  const[searchTerm, setSearchTerm] = useState('')

  return (
    <main>
      <div className="pattern" />
      <div className='wrapper'>
        <header >
          <img src="../public/hero-img.png" alt="hero img" />
          <h1>Find The <span className='text-gradient'>Movies</span> That You'll Enjoy Without Hassle</h1>
        </header>

        <Search search = {searchTerm} setSearchTerm = {setSearchTerm} />
        <h1 className='text-white'>{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App