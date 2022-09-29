import React, { useState, useEffect } from "react";
import { Client, over } from "stompjs";
import SockJS from "sockjs-client";
import { RootState } from "../Store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../Store";
import {
  boardReset,
  createBoard,
  joinGame,
  playTurn,
  playMulti,
  playTrunInfo,
} from "../Slices/BoardSlice";
import { Circle } from "../Components/Board/Circle";
import { Line } from "../Components/Board/Line";
import { Game } from "../Components/Game/Game";
import "../Components/Board/Board.css";
import { join } from "path";
import { IBoard } from "../Interfaces/IBoard";
import { stringify } from "querystring";
import { waitFor } from "@testing-library/react";
import { Navbar } from "../Components/Navbar/Navbar";
import { Board } from "../Components/Board/Board";
import "./client.css";
var stompClient: Client | null = null;
export const Messenger: React.FC = () => {
  const [gameOver1, setgameOver1] = useState<any>(false);
  const [gameOver2, setgameOver2] = useState<any>(false);
  const [idSet, setIdSet] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(true);
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
  // const [refresh, setRefresh] = useState<any>(false);
  const [playerMove, setPlayerMove] = useState<boolean>(false);
  const [waitForMove, setWaitForMove] = useState<boolean>(true);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [showInput, setShowInput] = useState(false);
  const [showSupport, setShowSupport] = useState(true);
  var userName = { name: "Player", role: 1 };
  const boardInfo = useSelector((state: RootState) => state.board);
  // const gameList = useSelector((state: RootState) => state.board.game);
  const [idSent, setIdSent] = useState<boolean>(false);

  //var count = true;
  var actionValue = "";
  var boardId: any;
  const [userData, setUserData] = useState<any>({
    username: "",
    receivername: "",
    connected: false,
    message: {
      id: "",
      x: "",
      move: "",
    },
    admin: false,
  });
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!userData.connected) {
      showConnect();
    }

    boardId = boardInfo.board?.id;
    // if (refresh) {
    //   setRefresh(false);
    //   dispatch(allGames());
    // }
    if (boardInfo.board?.id !== undefined && !idSet) {
      boardId = boardInfo.board?.id;
      setIdSet(true);
      sendGameId();
      console.log("Checking smth 3 " + boardInfo.board?.id);
      console.log("Checking smth 4 " + boardId);
    }

    console.log("PLS WORK JHEEZ" + boardId);
    console.log("PLS PLS PLS" + boardInfo.board?.id);
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
  }, [boardInfo.board, userData.connected, playerMove]);

  type playInfo = {
    id?: number;
    x?: number;
    move?: number;
  };

  const handlePlay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    actionValue = (event.currentTarget as HTMLButtonElement).value;
    if (waitForMove) {
      if (gameOver1 === false && gameOver2 === false) {
        sendPrivateValue();
        setWaitForMove(false);
      }
    }
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(boardReset(boardInfo.board?.id));
    setWaitForMove(true);
    resetGame();
  };

  const handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(createBoard());
    // setRefresh(true);
  };

  const handleClickPlayer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!idSent) {
      setPlayerMove(true);
      dispatch(createBoard());
      setIdSent(true);
    }
    let nameVal = (event.currentTarget as HTMLButtonElement).value;
    setTab(nameVal);
    setShowBtn(false);
    console.log("Checking smth" + nameVal);
    console.log("Checking smth 2" + [...privateChats.keys()].slice(1));

    //setRefresh(true);
  };

  // Connection to the server
  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    console.log("1");
  };

  const showConnect = () => {
    //api call
    // userData.username = userName.name + Date.now();
    userData.username = userInfo.user?.username;
    connect();

    setShowSupport(false);
    setShowInput(true);
    console.log("2");
  };

  // When the connection is established, subscribe to the chat room
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    if (stompClient) {
      stompClient.subscribe("/chatroom/public", onMessageReceived);
      stompClient.subscribe(
        "/user/" + userData.username + "/private",
        onPrivateMessage
      );
      userJoin();
    }
    console.log("3");
  };

  // New User joins the chat room
  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };

    if (stompClient) {
      console.log("joined chat");
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    console.log("4");
  };

  // New message received from the server
  const onMessageReceived = (payload: { body: string }) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
          userJoin();
        }
        break;
      case "MESSAGE":
        setPublicChats([...publicChats]);
        break;
      case "ID":
        setPublicChats([...publicChats]);
        break;
    }
    console.log(userInfo.user?.username);
    console.log(userData.username);
    console.log("5");
  };

  // New private message received from the server
  const onPrivateMessage = (payload: { body: string }) => {
    console.log("PAYLOAD" + payload);
    var payloadData = JSON.parse(payload.body);

    if (payloadData.status == "ID") {
      setIdSent(true);
      console.log(idSent);
      let id = payloadData.message.id;
      dispatch(joinGame(id));
    }

    if (payloadData.status == "RESET") {
      let id = payloadData.message.id;
      dispatch(boardReset(id));
      setWaitForMove(true);
    }

    if (payloadData.status == "MESSAGE") {
      let info: playTrunInfo = {
        id: payloadData.message.id,
        x: payloadData.message.x,
        move: payloadData.message.move,
      };
      console.log("checking info: " + info);
      dispatch(playMulti(info));
      setWaitForMove(true);
    }
    // if (privateChats.get(payloadData.senderName)) {
    //   privateChats.get(payloadData.senderName).push(payloadData);
    //   setPrivateChats(new Map(privateChats));
    // } else {
    //   let list = [];
    //   list.push(payloadData);
    //   privateChats.set(payloadData.senderName, list);
    //   setPrivateChats(new Map(privateChats));
    // }
    console.log("PAYLOAD DATA" + payloadData);
    console.log("6");
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const closeChatBox = () => {
    setShowInput(false);
    setShowSupport(true);
    setUserData({ ...userData, connected: false });
    console.log("7");
  };
  const sendPrivateValue = () => {
    let playerLetter;
    if (!playerMove) {
      playerLetter = 2;
    } else {
      playerLetter = 1;
    }

    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: {
          id: boardInfo.board?.id,
          x: actionValue,
          move: playerLetter,
        },
        status: "MESSAGE",
      };
      let info: playTrunInfo = {
        id: boardInfo.board?.id,
        x: parseInt(actionValue),
        move: playerLetter,
      };
      dispatch(playMulti(info));
      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    }

    console.log("8" + boardId + boardInfo.board?.id);
  };

  const sendGameId = () => {
    if (stompClient) {
      let chatMessage: any = {
        senderName: userData.username,
        receiverName: [...privateChats.keys()].slice(1).toString(),
        message: {
          id: boardId,
          x: 0,
          move: 0,
        },
        status: "ID",
      };

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    }

    console.log("9");
  };

  const resetGame = () => {
    if (stompClient) {
      let chatMessage: any = {
        senderName: userData.username,
        receiverName: [...privateChats.keys()].slice(1).toString(),
        message: {
          id: boardInfo.board?.id,
          x: 0,
          move: 0,
        },
        status: "RESET",
      };

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    }

    console.log("9");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {/* {gameList?.map((game: IBoard) => {
        return <Game {...game} key={game.id} />;
      })} */}

        {/* <button onClick={handleCreate}>Create Game</button> */}

        {userData.connected ? (
          <div className="chat-box">
            {!showBtn ? (
              <></>
            ) : (
              <div className="member-list">
                <ul>
                  {[...privateChats.keys()].slice(1).map((name, index) => (
                    <button
                      onClick={handleClickPlayer}
                      className={`member ${tab === name && "active"}`}
                      key={index}
                      value={name}
                      id="player-btn"
                    >
                      Play With : {name}
                    </button>
                  ))}
                </ul>
              </div>
            )}

            {tab !== "CHATROOM" && (
              <div className="chat-content">
                {/* <button
                type="button"
                className="chat-close"
                onClick={closeChatBox}
              >
                X
              </button> */}
                {/* <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}

                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul> */}
                <>
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
                      <button
                        className="box"
                        title="btn0"
                        onClick={handlePlay}
                        id="0"
                        value={0}
                      >
                        {sBox1 === 0 || sBox1 == undefined ? (
                          ""
                        ) : sBox1 === 1 ? (
                          <div id="0">
                            {" "}
                            <Circle name={"0"} />{" "}
                          </div>
                        ) : (
                          <Line name={"0"} />
                        )}
                      </button>
                      <button
                        className="box"
                        title="btn1"
                        onClick={handlePlay}
                        id="1"
                        value={1}
                      >
                        {sBox2 === 0 ? (
                          ""
                        ) : sBox2 === 1 ? (
                          <Circle name={"1"} />
                        ) : (
                          <Line name={"1"} />
                        )}
                      </button>
                      <button
                        className="box"
                        title="btn2"
                        onClick={handlePlay}
                        id="2"
                        value={2}
                      >
                        {sBox3 === 0 ? (
                          ""
                        ) : sBox3 === 1 ? (
                          <Circle name={"2"} />
                        ) : (
                          <Line name={"2"} />
                        )}
                      </button>
                      <button
                        className="box"
                        title="btn3"
                        onClick={handlePlay}
                        id="3"
                        value={3}
                      >
                        {sBox4 === 0 ? (
                          ""
                        ) : sBox4 === 1 ? (
                          <Circle name={"3"} />
                        ) : (
                          <Line name={"3"} />
                        )}
                      </button>
                      <button
                        className="box"
                        title="btn4"
                        onClick={handlePlay}
                        id="4"
                        value={4}
                      >
                        {sBox5 === 0 ? (
                          ""
                        ) : sBox5 === 1 ? (
                          <Circle name={"4"} />
                        ) : (
                          <Line name={"4"} />
                        )}
                      </button>
                      <button
                        className="box"
                        title="btn5"
                        onClick={handlePlay}
                        id="5"
                        value={5}
                      >
                        {sBox6 === 0 ? (
                          ""
                        ) : sBox6 === 1 ? (
                          <Circle name={"5"} />
                        ) : (
                          <Line name={"5"} />
                        )}
                      </button>
                      <button
                        className="box"
                        title="btn6"
                        onClick={handlePlay}
                        id="6"
                        value={6}
                      >
                        {sBox7 === 0 ? (
                          ""
                        ) : sBox7 === 1 ? (
                          <Circle name={"6"} />
                        ) : (
                          <Line name={"6"} />
                        )}
                      </button>
                      <button
                        className="box"
                        title="btn7"
                        onClick={handlePlay}
                        id="7"
                        value={7}
                      >
                        {sBox8 === 0 ? (
                          ""
                        ) : sBox8 === 1 ? (
                          <Circle name={"7"} />
                        ) : (
                          <Line name={"7"} />
                        )}
                      </button>
                      <button
                        className="box"
                        title="btn8"
                        onClick={handlePlay}
                        id="8"
                        value={8}
                      >
                        {sBox9 === 0 ? (
                          ""
                        ) : sBox9 === 1 ? (
                          <Circle name={"8"} />
                        ) : (
                          <Line name={"8"} />
                        )}
                      </button>
                    </div>
                    <div className="btn-container">
                      <button
                        className="reset-btn"
                        title="reset"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </>
              </div>
            )}
          </div>
        ) : (
          <button
            id="joining"
            className={
              !showInput && showSupport ? "showConnect" : "hideConnect"
            }
            onClick={showConnect}
          >
            Multi-Player
          </button>
        )}
      </div>
    </>
  );
};
