import { React, useState } from "react";
import PropTypes from "prop-types";

const kDefaultFormState = {
  title: "",
  owner: "",
};

const NewBoardForm = ({ onBoardFormSubmit }) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...formData, [fieldName]: fieldValue };

    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onBoardFormSubmit(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <div>
      <button className="btn">add a new board</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>owner</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <input type="submit" value="add board"></input>
        </div>
      </form>
    </div>
  );
};

NewBoardForm.propTypes = {
  onBoardFormSubmit: PropTypes.func.isRequired,
};

export default NewBoardForm;
