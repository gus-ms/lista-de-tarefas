import React from "react";
import PropTypes from "prop-types";
import {FaPlus} from 'react-icons/fa';
import "./Form.css";




export default function Form({handleChange, handleSubmit, novaTarefa}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={novaTarefa}
        onChange={handleChange}
        />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  novaTarefa: PropTypes.string.isRequired,
}
