import React, { Component } from "react";
import Tarefas from "./Tarefas";
import Form from './Form';

import './Main.css';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
    alerta:'',
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if(!tarefas) return;

    this.setState({tarefas});
  }

  componentDidUpdate(prevState) {
    const {tarefas} = this.state;
    if(tarefas === prevState.tarefas) return;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleSubmit =  (e) => {
    e.preventDefault();
    const {tarefas, index} = this.state;
    let {novaTarefa} =  this.state;
    novaTarefa = novaTarefa.trim().toUpperCase();


    if(novaTarefa === '' ) {
      this.setState({alerta:"Digite uma  tarefa!"});
      return;
    }

    if(tarefas.find(tarefa => tarefa === novaTarefa)) {
      this.setState({alerta:"Está tarefa já existe!"});
      return;
    }

    if  (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        alerta: '',
        novaTarefa: '',
      })
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
        alerta: '',
        novaTarefa: '',
      })
    }
  }

  handleChange  = (e) => {
    this.setState({
      novaTarefa: e.target.value,
      alerta: '',
    })
  };

  handleEdit = (e, index) => {
    const {tarefas} = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
      alerta: '',
    })
  }

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas],
      alerta: '',
    });
  }



  render() {
    const  { novaTarefa, tarefas, alerta } = this.state;

    return (
      <div className="main bg-white flex p-30px m-50px m-auto ">
        <h1>Lista de tarefas</h1>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          novaTarefa={novaTarefa}
        />

        {alerta && <p className="alerta">{alerta}</p>}

        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />

      </div>
    );
  };
}

