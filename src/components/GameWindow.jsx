import Card from "./Card"
import { useState } from "react"

export default function GameWindow({ cardData }) {
    const [state, setState] = useState({
        selectedCardIDs: [],
        totalGames: 0,
        highScore: 0,
    })
    const shuffledCardData = (()=>{
        const oldArray = [...cardData];
        const newArray = Array(cardData.length);
        for(let i = 0; i < cardData.length; i++){
            const index = Math.floor(Math.random() * oldArray.length);
            newArray.push(oldArray[index]);
            oldArray.splice(index, 1); 
        }
        return newArray;
    })()
    return (
        <div className='GameWindow'>
            <div className='GameWindow-header'>
                <h4>Current Score: {state.selectedCardIDs.length}</h4>
                <h4>High Score: {state.highScore}</h4>
            </div>
            <div className="cardContainer">
                {shuffledCardData.map((data) => {
                    return <Card
                        key={data.id}
                        imageUrl={data.url}
                        name={data.breeds[0].name}
                        onClick={(e) => {
                            let newState = { ...state };
                            //if lost
                            if (state.selectedCardIDs.includes(data.id)) {
                                newState = {
                                    ...state,
                                    totalGames: ++state.totalGames,
                                    highScore: state.highScore > state.selectedCardIDs.length ?
                                        state.highScore :
                                        state.selectedCardIDs.length,
                                    selectedCardIDs: []
                                };
                                alert('You lose. Your score was ' + state.selectedCardIDs.length)
                            } //if won
                            else {
                                newState = {
                                    ...state,
                                    selectedCardIDs: [...state.selectedCardIDs, data.id]
                                };
                            }
                            setState(newState);
                        }}
                    />
                })}
            </div>
        </div>
    )
}