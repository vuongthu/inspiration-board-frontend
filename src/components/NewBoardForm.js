import { React, useState } from "react";
import PropTypes from "prop-types";
import "./Forms.css";

const kDefaultFormState = {
  title: "",
  owner: "",
};

const NewBoardForm = ({ onBoardFormSubmit, onToggleVisible }) => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const [isFormValid, setFormValid] = useState({ title: false, owner: false });

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...formData, [fieldName]: fieldValue };

    setFormData(newFormData);

    let validForm;
    if (fieldName === "title") {
      validForm = {
        ...isFormValid,
        title: fieldValue ? fieldValue.length <= 40 : false,
      };
    } else if (fieldName === "owner") {
      validForm = {
        ...isFormValid,
        owner: fieldValue ? fieldValue.length <= 40 : false,
      };
    }

    setFormValid(validForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onBoardFormSubmit(formData);
    setFormData(kDefaultFormState);
    setFormValid({ title: false, owner: false });
    onToggleVisible();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={isFormValid.title ? "" : "input--state-danger"}
          ></input>
        </div>
        <div>
          <label>owner:</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className={isFormValid.owner ? "" : "input--state-danger"}
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
  onToggleVisible: PropTypes.func.isRequired,
};

export default NewBoardForm;
