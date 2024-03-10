import { useEffect, useState } from 'react'
import './styles/reset.css'
import './styles/App.css'
import API_KEY from './private'
import GameWindow from './components/GameWindow';

function App() {
  const [state, setState] = useState({ cardData: [] });
  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=20&has_breeds=1&api_key=' + API_KEY);
      const cardData = await response.json()
      setState({ cardData: cardData });
    })()
  }, [])

  return (
    <>
      {state.cardData.length === 0 ? 
      <>Loading...</>
      :
      <GameWindow cardData={state.cardData}/>
  }
    </>
  )
}

export default App
