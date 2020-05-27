import React, { useState } from 'react';
import Square from './Square';
import r2h from '../img/r2h.png'
import fellowship from '../img/fellowships.png'
import ResetButton from './ResetButton';
const Board = () => {
    //At the start of the game the Board needs to be empty
    const initialBoard = Array(9).fill(null)
    const[squares, setSquares] = useState(initialBoard)

    //Player X starts the game
    const[playerXIsNext, setPlayerXIsNext] = useState(true)

    const renderSquare = (i) => {
        return <Square 
                    value={squares[i]}
                    onClick = {()=>clickHandle(i)} />
    }

    const clickHandle = i =>{
        const newSquares = [...squares]
        const winnerDeclared = Boolean(calculateWinner(squares))
        const squareAlreadyFilled = Boolean(newSquares[i])
        if (winnerDeclared || squareAlreadyFilled) return
        newSquares[i] = playerXIsNext ? 'X' : 'O'

        setSquares(newSquares)
        setPlayerXIsNext(!playerXIsNext)
    }

    const isBoardFull = (squares) => {
        for(let i = 0; i < squares.length; i++){
            if(squares[i]== null){
                return false
            }
        }
        return true

    }

    const calculateWinner = (squares) => {
        /* Squares indexes as they appear in UI:
        0 1 2
        3 4 5
        6 7 8
        */
       const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]; // shows all of the winning combinations ("lines")
    // Iterate over lines
    for (let line of lines){
        const[a, b, c] = line
        if(squares[a] && squares[a]===squares[b] &&
            squares[a]=== squares[c]) {
                return squares[a]
            }
    }
    return null
    }

    const winner = calculateWinner(squares)

    const getStatus = () => {
        if(winner){
            return "Congrats Player " + winner +". You're smater than the other guy!"
        } else if (isBoardFull(squares)){
            return 'This is a Draw. Nobody wins!!'
        }
        else {
            return "Next player in player " + (playerXIsNext ? 'X' : 'O')
        }
    }

    const resetGame= () => {
        setSquares(initialBoard)
        setPlayerXIsNext(true)

    }

    let containerClassChange = (winner && getStatus() ===
    "Congrats Player " + winner +". You're smater than the other guy!" || 
    !winner && getStatus() === 'This is a Draw. Nobody wins!!') ? 
    (getStatus()==="This is a Draw. Nobody wins!!" ? "draw" 
        : "winner ") : (playerXIsNext ? "X": "O")


    return (
        <>
            <main className={`main--container ${containerClassChange}`}>

                <div className="logo">
                    <img src={r2h} alt="r2h logo" />
                    <img src={fellowship} alt="fellowship" />
                </div>
                <div className="status">
                    {getStatus()}
                </div>
                <div className="board--container">
                    <div className="board">
                        <div className="board--row">
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                        </div>
                        <div className="board--row">
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                        </div>
                        <div className="board--row">
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                        </div>
                    </div>
                    <ResetButton click = {resetGame} />
                </div>
            </main>
        </>
    )
}
export default Board;