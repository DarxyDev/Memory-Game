import { useState } from "react"

export default function GameWindow({ cardData, cards }) {
    const [state, setState] = useState({
        usedCardIDs: [],
        totalGames: 0,
        highScore: 0,
    })
    console.log('rendering')
    const randomIndex = Math.floor(Math.random() * cards.length)
    const currentID = cardData[randomIndex].id;
    
    function gameOver() {
        setState({
            ...state,
            totalGames: ++state.totalGames,
            highScore: state.highScore > state.usedCardIDs.length ?
                state.highScore :
                state.usedCardIDs.length,
            usedCardIDs: []
        })
    }
    function nextTurn() {
        setState({
            ...state,
            usedCardIDs: [...state.usedCardIDs, currentID]
        })
    }
    return (
        <div className='GameWindow'>
            <div className='GameWindow-header'>
                <h4>Current Score: {state.usedCardIDs.length}</h4>
                <h4>High Score: {state.highScore}</h4>
            </div>
            {state.usedCardIDs.includes(currentID) ?
                <>
                    <div onClick={gameOver}>{cards[randomIndex]}</div>
                    <button onClick={nextTurn}>Seen it</button>
                </> :
                <>
                    <div onClick={nextTurn}>{cards[randomIndex]}</div>
                    {state.usedCardIDs.length <= 0 ? null :<button onClick={gameOver}>Seen it</button>}
                </>
            }
        </div>
    )

}