import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";

const grid = [
  [0,0,0,0,0,0,0,3],
  [1,1,1,1,2,1,1,1],
  [1,0,0,0,0,1,0,0],
  [4,2,1,1,1,1,0,0],
  [0,0,0,0,0,1,1,0],
  [0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1]
]

const Tile = ({ type, id }) => {
  if (type === 0) {
    return <td id={id} className="block">&nbsp;</td>;
  }
  if (type === 1) {
    return <td id={id} className="path">&nbsp;</td>;
  }
  if (type === 2) {
    return <td id={id} className="bonus">&nbsp;</td>;
  }
  if (type === 3) {
    return <td id={id} className="finish">&nbsp;</td>;
  }

  return <td id={id} className="character">
    &nbsp;
  </td>;
};

const App = () => {
  const [appState, setAppState] = useState(grid);
  const [row, setRow] = useState()
  const [col, setCol] = useState()
  const [score, setScore] = useState(1000)
  const [scoreFinal, setScoreFinal] = useState()


  useEffect(()=> {
    for (let i = 0; i< appState.length; i++){
      const isCheckpoint = (element) => element == 4;
      if (appState[i].findIndex(isCheckpoint) != -1){
        setRow(i)
        setCol(appState[i].findIndex(isCheckpoint));
      }
    }
  }, [])


  const handleOnChange = (e) => {
    let tempGrid = appState
    if (e.target.id == "right"){
      if (col != 7) {
        if (appState[row][col + 1] != 0){
          if (appState[row][col + 1] == 1){
              setScore(score - 10)
          }
          else if (appState[row][col + 1] == 2){
            setScore(score+30)
          }
          else if (appState[row][col + 1] == 3){
            setAppState([])
            setScoreFinal(score)
            return
          }
          setCol(col + 1)
          tempGrid[row][col] = 1
          tempGrid[row][col + 1] = 4
          setAppState(tempGrid)
        }
      }

    }
    else if (e.target.id == "left"){
      if (col != 0) {
        if (appState[row][col - 1] != 0){
          if (appState[row][col -1] == 1){
            setScore(score-10)
          }
          else if (appState[row][col - 1] == 2){
            setScore(score+30)
          }
          else if (appState[row][col - 1] == 3){
            setAppState([])
            setScoreFinal(score)
            return
          }
          setCol(col - 1)
          tempGrid[row][col] = 1
          tempGrid[row][col - 1] = 4
          setAppState(tempGrid)
        }
      }
    }
    else if (e.target.id == "down"){
      if (row != 7){
        if (appState[row +1][col] != 0){
          if (appState[row + 1][col] == 1){
            setScore(score - 10)
          }
          else if (appState[row+1][col] == 2){
            setScore(score+30)
          }
          else if (appState[row+1][col] == 3){
            setAppState([])
            setScoreFinal(score)
            return
          }
          setRow(row + 1)
          tempGrid[row][col] = 1
          tempGrid[row + 1][col] = 4
          setAppState(tempGrid)
        }

      }

    }
    else if (e.target.id == "up"){
      if (row != 0){
        if (appState[row -1][col] != 0){
          if(appState[row -1][col] == 1){
            setScore(score - 10)
          }
          else if (appState[row -1][col] == 2){
            setScore(score+30)
          }
          else if (appState[row-1][col] == 3){
            setAppState([])
            setScoreFinal(score)
            return
          }
          setRow(row - 1)
          tempGrid[row][col] = 1
          tempGrid[row -1][col] = 4
          setAppState(tempGrid)
        }

      }
    }
  }
  return (
    <div className="container-fluid">
      <h2 id="score">{scoreFinal}</h2>
      <table>
        <tbody>
          {appState.map((rowVal, row) => <tr key={`r-${row}`}>
            {rowVal.map((colVal, col) => <Tile id={`item-${row}-${col}`} type={colVal} key={`el-${row}${col}`} />)}
          </tr>)}
        </tbody>
      </table>
      <div className="grid">
        <div />
        <button id="up"  onClick={handleOnChange}>Up</button>
        <div />
      </div>
      <div className="grid">
        <button id="left"  onClick={handleOnChange}>Left</button>
        <button id="down"  onClick={handleOnChange}>Down</button>
        <button id="right" onClick={handleOnChange}>Right</button>
      </div>
    </div>
  );
};

export default App;