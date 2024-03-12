import { useState } from "react"

export default function GameWindow({ cardData, cards }) {
    const [state, setState] = useState({
        usedCardIDs: [],
        totalGames: 0,
        highScore: 0,
        cardIndex: 0,
        displayInfo: false,
    })
    const currentID = cardData[state.cardIndex].id;
    function gameOver() {
        setState({
            ...state,
            totalGames: ++state.totalGames,
            highScore: state.highScore > state.usedCardIDs.length ?
                state.highScore :
                state.usedCardIDs.length,
            usedCardIDs: [],
            cardIndex: Math.floor(Math.random() * cards.length),
        })
    }
    function nextTurn() {
        setState({
            ...state,
            usedCardIDs: [...state.usedCardIDs, currentID],
            cardIndex: Math.floor(Math.random() * cards.length),
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
                    <div onClick={gameOver}>{cards[state.cardIndex]}</div>
                    <button onClick={nextTurn}>Seen it</button>
                </> :
                <>
                    <div onClick={nextTurn}>{cards[state.cardIndex]}</div>
                    {state.usedCardIDs.length <= 0 ? null : <button onClick={gameOver}>Seen it</button>}
                </>
            }
            <button onClick={() => { setState({ ...state, displayInfo: !state.displayInfo }) }}>
                {state.displayInfo ? 'Hide info' : 'Info dump'}
            </button>
            {state.displayInfo ?
                <div>
                    {cardData[state.cardIndex]
                        .breeds.map((breed) => {
                            return <div key={'info' + breed.id}>
                                {Object.entries(breed).map(([k,v])=>{
                                return <div key={'key' + k}>{k + ' ' + v.toString()}</div>
                            })}
                            </div>
                        })}
                </div> :
                null}
        </div>
    )

}