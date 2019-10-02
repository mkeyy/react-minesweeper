import React, { useState, useEffect } from "react";

import Field from "./Field";
import Mine from "../icons/Mine";
import Flag from "../icons/Flag";
import Modal from "../parts/Modal";

function GameEngine() {
  const [board, setBoard] = useState(null);
  const [minesArr, setMinesArr] = useState(null);
  const [mines, setMines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  let id = 0;

  function checkNeighbours(arr, i, j, func) {
    let rowLimit = arr.length - 1;
    let columnLimit = arr[0].length - 1;

    for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
      for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
        if ((x !== i || y !== j) && arr[x][y].value !== -1) {
          if (func === 1) arr[x][y].value += 1;
          else if (func === 2 && arr[x][y].active === false)
            handleLeftClick(x, y);
        }
      }
    }
  }

  function handleGameStart(x = 16, y = 30, m = 10) {
    let i = 0;
    let j = 0;
    let mArr = [];
    let arr = Array(x)
      .fill(0)
      .map(() =>
        Array(y)
          .fill(0)
          .map(() =>
            Object({ active: false, value: 0, content: "", mine: false })
          )
      );

    setMines(m);

    for (let k = 0; k < m; k++) {
      do {
        i = 0 + Math.floor(Math.random() * (x - 1));
        j = 0 + Math.floor(Math.random() * (y - 1));
      } while (arr[i][j].value === -1);

      arr[i][j].value = -1;
      checkNeighbours(arr, i, j, 1);
      mArr.push({ x: i, y: j });
    }

    setGameOver(false);
    setGameWin(false);
    setMinesArr(mArr);
    setBoard(arr);
  }

  function handleGameOver(arr) {
    minesArr.map(mine => {
      arr[mine.x][mine.y].active = true;
      arr[mine.x][mine.y].content = <Mine />;
    });

    setGameOver(true);
  }

  function handleLeftClick(x, y) {
    let newArr = [...board];
    newArr[x][y].active = true;

    if (newArr[x][y].value === 0) checkNeighbours(newArr, x, y, 2);
    else if (newArr[x][y].value === -1) handleGameOver(newArr);
    else newArr[x][y].content = newArr[x][y].value;

    setBoard(newArr);
  }

  function handleRightClick(x, y, e) {
    e.preventDefault();

    let newArr = [...board];
    if (newArr[x][y].content === "") {
      newArr[x][y].content = <Flag />;
      newArr[x][y].active = true;
      let mId = minesArr.findIndex(o => o.x === x && o.y === y);
      if (mId !== -1) minesArr.splice(mId, 1);

      if (minesArr.length === 0 && mines - 1 === 0) setGameWin(true);
      setMines(mines - 1);
    } else {
      newArr[x][y].content = "";
      newArr[x][y].active = false;
      if (newArr[x][y].value === -1) minesArr.push({ x, y });

      if (minesArr.length === 0 && mines + 1 === 0) setGameWin(true);
      setMines(mines + 1);
    }

    setBoard(newArr);
  }

  useEffect(() => {
    handleGameStart();
  }, []);

  if (board) {
    return (
      <div className="rm-game">
        <div className="rm-board__mines">{mines}</div>
        <div
          className="rm-board"
          style={{
            gridTemplateColumns: "repeat(" + board[0].length + ", 44px)",
            gridTemplateRows: "repeat(" + board.length + ", 44px)"
          }}
        >
          {board.map((row, i) =>
            row.map((field, j) => {
              return (
                <Field
                  key={id++}
                  data={{
                    active: field.active,
                    content: field.content,
                    x: i,
                    y: j
                  }}
                  onLeftClick={handleLeftClick}
                  onRightClick={handleRightClick}
                />
              );
            })
          )}
        </div>
        {gameOver && <Modal title="Game Over!" restart={handleGameStart} />}
        {gameWin && (
          <Modal title="Congratulations!" restart={handleGameStart} />
        )}
      </div>
    );
  } else {
    return <div className="rm-game" />;
  }
}

export default GameEngine;
