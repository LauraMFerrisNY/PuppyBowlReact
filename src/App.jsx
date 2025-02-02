import AllPlayers from './components/AllPlayers';
import SinglePlayer from './components/SinglePlayer';
import { Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <>
      <div className='pageContent'>
        <div className='topNavBar'>
          <h1>Laura's Puppy Bowl</h1>
          <div className='site_links'>
            <Link to='/'>Home</Link>
          </div>
        </div>
        <div className='main-section'>
          <Routes>
            <Route path='/' element={<AllPlayers/>} />
            <Route path='/players/:id' element={<SinglePlayer />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
