import React from "react";
import PropTypes from "prop-types";

const Card = ({ cardId, message, likes_count, onDeleteCard, onLikeCard }) => {
  const handleOnDelete = () => {
    onDeleteCard(cardId);
  };

  const handleOnLike = () => {
    onLikeCard(cardId);
  };

  return (
    <div>
      <button onClick={handleOnDelete}>x</button>
      <div>{message}</div>
      <div>
        <button onClick={handleOnLike}>❤️</button> {likes_count}
      </div>
    </div>
  );
};

Card.propTypes = {
  cardId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likes_count: PropTypes.number.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  onLikeCard: PropTypes.func.isRequired,
};

export default Card;
