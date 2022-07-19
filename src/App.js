import "./App.css";
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import React, { useEffect, useState } from "react";
import axios from"axios";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL

const boardApiToJson = (board) => {
  const { id: boardId, title, owner } = board;
  return { boardId, title, owner };
};

const cardApiToJson = (card) => {
  const { id: cardId, message, likes_count } = card;
  return { cardId, message, likes_count };
};

const getBoards = () => {
  return axios
    .get(`${kBaseUrl}/boards`)
    .then((response) => {
      return response.data.map(boardApiToJson);
    })
    .catch((err) => {
      console.log(err);
      throw new Error(`Error fetching boards: ${err}`);
    });
};

function App() {

  const [boardsData, setBoardsData] = useState([])

  const updateBoardData = () => {
    return getBoards()
      .then((boards) => {
        setBoardsData(boards);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    updateBoardData();
  }, []);

  return (
    <main>
      <BoardList boards={boardsData} onBoardSelect={() => console.log("test")} />
    </main>
};

export default App;
