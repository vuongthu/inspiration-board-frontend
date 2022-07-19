import "./App.css";
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import React, { useEffect, useState } from "react";
import axios from "axios";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL;

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

const postBoard = (newBoard) => {
  return axios
    .post(`${kBaseUrl}/boards`, newBoard)
    .then((response) => {
      return boardApiToJson(response.data.board);
    })
    .catch((err) => {
      console.log(err);
      throw new Error(`Error posting board ${newBoard}: ${err}`);
    });
};

const getCards = (boardId) => {
  return axios
    .get(`${kBaseUrl}/boards/${boardId}/cards`)
    .then((response) => {
      return response.data.map(cardApiToJson);
    })
    .catch((err) => {
      console.log(err);
      throw new Error(`Error fetching cards: ${err}`);
    });
};

const postCard = (boardId, newCard) => {
  return axios
    .post(`${kBaseUrl}/boards/${boardId}/cards`, newCard)
    .then((response) => {
      return cardApiToJson(response.data.card);
    })
    .catch((err) => {
      console.log(err);
      throw new Error(`Error posting card ${newCard}: ${err}`);
    });
};

const patchLikeCard = (cardId) => {
  return axios
    .patch(`${kBaseUrl}/cards/${cardId}/like`)
    .then((response) => {
      return cardApiToJson(response.data.card);
    })
    .catch((err) => {
      console.log(err);
      throw new Error(`Error liking card ${cardId}: ${err}`);
    });
};

const deleteCard = (cardId) => {
  return axios
    .delete(${kBaseUrl}/cards/${cardId})
    .catch((err) => {
      console.log(err);
      throw new Error(`Error removing card ${cardId}: ${err}`);
    });
};


function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [selectedBoard, updateSelectedBoard] = useState(null);

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

  useEffect(() => {
    if (selectedBoard) {
      getCards(selectedBoard)
        .then((cards) => {
          setCardsData(cards);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setCardsData([]);
    }
  }, [selectedBoard])

  const onBoardSelect = (boardId) => {
    updateSelectedBoard(boardId);
  };

  return (
    <main>
      <BoardList boards={boardsData} onBoardSelect={onBoardSelect} />
    </main>
  );
}

export default App;
