'use client';
import React, { useState } from "react";
import PropTypes from "prop-types";
import {FaEdit, FaWindowClose} from 'react-icons/fa';
import "./Tarefas.css"


export default function Tarefas({tarefas , handleEdit, handleDelete}) {
  const [checkedItems, setCheckedItems] = useState(Array(tarefas.length).fill(false));

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  return(
    <ul className="tarefas" >
      {tarefas.map((tarefa, index) => (
        <li key={tarefa} className={checkedItems[index] ? 'checked' : ''}>
          <input type="checkbox"
          checked={checkedItems[index]}
          onChange={() => handleCheckboxChange(index)}
          />
          {tarefa}
          <span>
            <FaEdit
              onClick={(e) => handleEdit(e, index)}
              className="edit"
            />
            <FaWindowClose
              onClick={(e) => handleDelete(e, index)}
              className="delete"
            />
          </span>
        </li>
      ))}
    </ul>
  )
}

Tarefas.propTypes = {
  tarefas: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}
