import React, { useState, useEffect } from "react";

import Field from "./Field";
import Mine from "../icons/Mine";

function GameEngine() {
  const [board, setBoard] = useState(null);
  const [minesArr, setMinesArr] = useState(null);
  const mines = 60;
  let id = 0;

  function checkNeighbours(arr, i, j, func) {
    let rowLimit = arr.length - 1;
    let columnLimit = arr[0].length - 1;

    for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
      for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
        if ((x !== i || y !== j) && arr[x][y].value !== -1) {
          if (func === 1) arr[x][y].value += 1;
          else if (func === 2 && arr[x][y].active === false)
            handleFieldClick(x, y);
        }
      }
    }
  }

  function handleGameOver(arr) {
    minesArr.map(mine => {
      arr[mine.x][mine.y].active = true;
      arr[mine.x][mine.y].content = <Mine />;
    });
  }

  function handleFieldClick(x, y) {
    let newArr = [...board];
    newArr[x][y].active = true;

    if (newArr[x][y].value === 0) checkNeighbours(newArr, x, y, 2);
    else if (newArr[x][y].value === -1) {
      newArr[x][y].content = <Mine />;
      handleGameOver(newArr);
    } else newArr[x][y].content = newArr[x][y].value;

    setBoard(newArr);
  }

  useEffect((x = 16, y = 30) => {
    let i = 0;
    let j = 0;
    let mArr = [];
    let arr = Array(x)
      .fill(0)
      .map(() =>
        Array(y)
          .fill(0)
          .map(() => Object({ active: false, value: 0, content: "" }))
      );

    for (let k = 0; k < mines; k++) {
      do {
        i = 0 + Math.floor(Math.random() * (x - 1));
        j = 0 + Math.floor(Math.random() * (y - 1));
      } while (arr[i][j].value === -1);

      arr[i][j].value = -1;
      checkNeighbours(arr, i, j, 1);
      mArr.push({ x: i, y: j });
    }

    setMinesArr(mArr);
    setBoard(arr);
  }, []);

  if (board) {
    return (
      <div
        className="rm-board"
        style={{
          gridTemplateColumns: "repeat(" + board[0].length + ", 40px)",
          gridTemplateRows: "repeat(" + board.length + ", 40px)"
        }}
      >
        {board.map((row, i) =>
          row.map((field, j) => {
            return (
              <Field
                key={id++}
                x={i}
                y={j}
                data={{
                  active: field.active,
                  content: field.content
                }}
                onClick={handleFieldClick}
              />
            );
          })
        )}
      </div>
    );
  } else {
    return <div className="rm-board" />;
  }
}

export default GameEngine;
