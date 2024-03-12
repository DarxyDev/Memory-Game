import { useEffect, useState } from 'react'
import './styles/reset.css'
import './styles/App.css'
import API_KEY from './private'
import Card from './components/Card'
import GameWindow from './components/GameWindow';

function App() {
  const [state, setState] = useState({
    cardData: [],
    cards: [],
    loaded: false,
  });
  async function asyncGetData(numItems = 20) {
    return await fetch('https://api.thecatapi.com/v1/images/search?limit=' + numItems + '&has_breeds=1&api_key=' + API_KEY)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
  async function asyncCreateCards(dataArray) {
    const cardPromises = dataArray.map((data) =>
      new Promise((resolve) => {
        if (!data.breeds || !data.breeds[0]) { //could add fake names or replace data with new call
          data.breeds = ['Unknown']
          console.log('missing breed')
        }
        const image = new Image();
        image.src = data.url;
        image.onload = () => {
          resolve(
            <Card
              key={data.id}
              name={data.breeds[0].name}
              image={image}
            />
          )
        };
      }))
    return await Promise.all(cardPromises)
  }
  useEffect(() => {
    (async () => {
      const cardData = await asyncGetData();
      const cards = await asyncCreateCards(cardData);
      setState({ ...state, cardData, cards, loaded: true });
    })()
  }, [])
  return (
    <>
      {state.loaded ?
        <GameWindow cardData={state.cardData} cards={state.cards} />
        :
        <>Loading...</>
      }
    </>
  )
}

export default App


