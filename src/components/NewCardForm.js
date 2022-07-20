import React, { useState } from "react";
import PropTypes from "prop-types";

const kDefaultFormState = {
  message: "",
};

const NewCardForm = ({ onCardFormSubmit }) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...formData, [fieldName]: fieldValue };

    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCardFormSubmit(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>message:</label>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <input type="submit" value="add card"></input>
        </div>
      </form>
    </div>
  );
};

NewCardForm.propTypes = {
  onCardFormSubmit: PropTypes.func.isRequired,
};

export default NewCardForm;
