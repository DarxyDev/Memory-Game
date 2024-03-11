import Card from "./Card"
import { useState } from "react"

export default function GameWindow({ cardData }) {
    const [state, setState] = useState({
        selectedCardIDs: [],
        totalGames: 0,
        highScore: 0,
    })
    const randomIndex = Math.floor(Math.random() * cardData.length)
    const wasUsedOnClick = (e, reverseEffect = false) => {
        const cardID = cardData[randomIndex].id;
        const cardUsed = state.selectedCardIDs.includes(cardID);
        let newState;
        switch(true){
            //game over
            case cardUsed && !reverseEffect:
            case !cardUsed && reverseEffect:
                newState = {
                    ...state,
                    totalGames: ++state.totalGames,
                    highScore: state.highScore > state.selectedCardIDs.length ?
                        state.highScore :
                        state.selectedCardIDs.length,
                    selectedCardIDs: []
                }
                break;
            //continue playing
            case cardUsed && reverseEffect:
            case !cardUsed && !reverseEffect:
                newState = {
                    ...state,
                    selectedCardIDs: [...state.selectedCardIDs, cardID]
                }
                break;
            default: newState = { ...state};
        }
        setState(newState);
    }


    return (
        <div className='GameWindow'>
            <div className='GameWindow-header'>
                <h4>Current Score: {state.selectedCardIDs.length}</h4>
                <h4>High Score: {state.highScore}</h4>
            </div>
            {cardFromIndex(randomIndex)}
            <button onClick={(e)=>{wasUsedOnClick(e,true)}}>Seen it</button>
        </div>
    )

    function cardFromIndex(index) {
        const data = { ...cardData[index] };
        if (data.breeds.length <= 0) data.breeds[0] = 'Unknown';
        return <Card
            key={data.id}
            imageUrl={data.url}
            name={data.breeds[0].name}
            onClick={wasUsedOnClick}
        />
    }
}


/*

                    */