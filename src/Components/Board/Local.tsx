import React, { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import "./Board.css";
import { boardReset, playMulti, playTurn } from "../../Slices/BoardSlice";
import { Circle } from "./Circle";
import { Line } from "./Line";
import { Navbar } from "../Navbar/Navbar";

export const Local: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const boardInfo = useSelector((state: RootState) => state.board);
  const [gameOver1, setgameOver1] = useState<any>(false);
  const [gameOver2, setgameOver2] = useState<any>(false);
  const [sBox1, setsBox1] = useState<any>(0);
  const [sBox2, setsBox2] = useState<any>(0);
  const [sBox3, setsBox3] = useState<any>(0);
  const [sBox4, setsBox4] = useState<any>(0);
  const [sBox5, setsBox5] = useState<any>(0);
  const [sBox6, setsBox6] = useState<any>(0);
  const [sBox7, setsBox7] = useState<any>(0);
  const [sBox8, setsBox8] = useState<any>(0);
  const [sBox9, setsBox9] = useState<any>(0);
  const [full, setFull] = useState<boolean>(false);
  const [player, setPlayer] = useState<any>(true);

  type playInfo = {
    id?: number;
    x?: number;
    move?: number;
  };

  useEffect(() => {
    setgameOver1(boardInfo.board?.gameOver1);
    setgameOver2(boardInfo.board?.gameOver2);
    setsBox1(boardInfo.board?.one);
    setsBox2(boardInfo.board?.two);
    setsBox3(boardInfo.board?.three);
    setsBox4(boardInfo.board?.four);
    setsBox5(boardInfo.board?.five);
    setsBox6(boardInfo.board?.six);
    setsBox7(boardInfo.board?.seven);
    setsBox8(boardInfo.board?.eight);
    setsBox9(boardInfo.board?.nine);
    if (
      boardInfo.board?.one == 0 ||
      boardInfo.board?.two == 0 ||
      boardInfo.board?.three == 0 ||
      boardInfo.board?.four == 0 ||
      boardInfo.board?.five == 0 ||
      boardInfo.board?.six == 0 ||
      boardInfo.board?.seven == 0 ||
      boardInfo.board?.eight == 0 ||
      boardInfo.board?.nine == 0
    ) {
      setFull(false);
    }
    if (
      boardInfo.board?.one != 0 &&
      boardInfo.board?.two != 0 &&
      boardInfo.board?.three != 0 &&
      boardInfo.board?.four != 0 &&
      boardInfo.board?.five != 0 &&
      boardInfo.board?.six != 0 &&
      boardInfo.board?.seven != 0 &&
      boardInfo.board?.eight != 0 &&
      boardInfo.board?.nine != 0
    ) {
      setFull(true);
    }
  }, [boardInfo.board]);

  const handlePlay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let actionValue = (event.target as HTMLButtonElement).id;
    let boardId: any = boardInfo.board?.id;

    let info: playInfo = {
      id: boardId,
      x: parseInt(actionValue),
      move: 1,
    };
    if (player) {
      info.move = 1;
    } else {
      info.move = 2;
    }
    setPlayer(!player);
    if (gameOver1 === false && gameOver2 === false) {
      dispatch(playMulti(info));
    }
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(boardReset(boardInfo.board?.id));
  };
  return (
    <>
      <Navbar />
      <div className="container">
        {" "}
        <div className="winner">
          {" "}
          {!boardInfo.board?.gameOver1 &&
          !boardInfo.board?.gameOver2 &&
          boardInfo.board?.gameOver1 != undefined &&
          boardInfo.board.gameOver2 != undefined ? (
            full && full != undefined ? (
              <h2> Draw! </h2>
            ) : (
              ""
            )
          ) : boardInfo.board?.gameOver1 == true ? (
            <h2>Winner: Player 1!</h2>
          ) : boardInfo.board?.gameOver1 != undefined &&
            boardInfo.board?.gameOver2 != undefined ? (
            <h2>Winner: Player 2!</h2>
          ) : (
            <></>
          )}
        </div>
        <div className="game-board" title="box">
          <button className="box" title="btn0" onClick={handlePlay} id="0">
            {sBox1 === 0 ? (
              ""
            ) : sBox1 === 1 ? (
              <div id="0">
                {" "}
                <Circle name={"0"} />{" "}
              </div>
            ) : sBox1 === 2 ? (
              <Line name={"0"} />
            ) : (
              ""
            )}
          </button>
          <button className="box" title="btn1" onClick={handlePlay} id="1">
            {sBox2 === 0 ? (
              ""
            ) : sBox2 === 1 ? (
              <Circle name={"1"} />
            ) : sBox2 === 2 ? (
              <Line name={"1"} />
            ) : (
              ""
            )}
          </button>
          <button className="box" title="btn2" onClick={handlePlay} id="2">
            {sBox3 === 0 ? (
              ""
            ) : sBox3 === 1 ? (
              <Circle name={"2"} />
            ) : sBox3 === 2 ? (
              <Line name={"2"} />
            ) : (
              ""
            )}
          </button>
          <button className="box" title="btn3" onClick={handlePlay} id="3">
            {sBox4 === 0 ? (
              ""
            ) : sBox4 === 1 ? (
              <Circle name={"3"} />
            ) : sBox4 === 2 ? (
              <Line name={"3"} />
            ) : (
              ""
            )}
          </button>
          <button className="box" title="btn4" onClick={handlePlay} id="4">
            {sBox5 === 0 ? (
              ""
            ) : sBox5 === 1 ? (
              <Circle name={"4"} />
            ) : sBox5 === 2 ? (
              <Line name={"4"} />
            ) : (
              ""
            )}
          </button>
          <button className="box" title="btn5" onClick={handlePlay} id="5">
            {sBox6 === 0 ? (
              ""
            ) : sBox6 === 1 ? (
              <Circle name={"5"} />
            ) : sBox6 === 2 ? (
              <Line name={"5"} />
            ) : (
              ""
            )}
          </button>
          <button className="box" title="btn6" onClick={handlePlay} id="6">
            {sBox7 === 0 ? (
              ""
            ) : sBox7 === 1 ? (
              <Circle name={"6"} />
            ) : sBox7 === 2 ? (
              <Line name={"6"} />
            ) : (
              ""
            )}
          </button>
          <button className="box" title="btn7" onClick={handlePlay} id="7">
            {sBox8 === 0 ? (
              ""
            ) : sBox8 === 1 ? (
              <Circle name={"7"} />
            ) : sBox8 === 2 ? (
              <Line name={"7"} />
            ) : (
              ""
            )}
          </button>
          <button className="box" title="btn8" onClick={handlePlay} id="8">
            {sBox9 === 0 ? (
              ""
            ) : sBox9 === 1 ? (
              <Circle name={"8"} />
            ) : sBox9 === 2 ? (
              <Line name={"8"} />
            ) : (
              ""
            )}
          </button>
        </div>
        <div className="btn-container">
          <button className="reset-btn" title="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};
