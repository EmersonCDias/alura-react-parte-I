import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import Axios from 'axios';
import InputCustomizavel from './components/InputCustomizavel';
import BotaoSubmitCustomizado from './components/BotaoSubmitCustomizado';

class App extends Component {

    constructor(){
        super();
        this.state = {
            lista: [],
            nome: '',
            email: '',
            senha: ''
        }
    }

    componentDidMount(){
        Axios.get('https://cdc-react.herokuapp.com/api/autores')
        .then(response => {
            this.setState({ 
                lista: response.data
            })
        })
    }

    enviaForm = evento => {
        evento.preventDefault();
        Axios.post('https://cdc-react.herokuapp.com/api/autores', {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
        })
        .then(response => {
            console.log('dados enviados')
            this.setState({
                lista: response.data
            })
            console.log(response)
        })
        .catch(response => {
            console.log(response)
        })
    }

    setNome = evento => {
        this.setState({nome: evento.target.value});
    }

    setEmail = evento => {
        this.setState({email: evento.target.value});
    }

    setSenha = evento => {
        this.setState({senha: evento.target.value});
    }

    render() {
        return (
            <div id="layout">
                <a href="#menu" id="menuLink" className="menu-link">
                    <span></span>
                </a>
                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="">My Library</a>
                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="" className="pure-menu-link">Autor</a></li>
                            <li className="pure-menu-item"><a href="" className="pure-menu-link">Livros</a></li>
                        </ul>
                    </div>
                </div>
                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                        <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind()} method='post'>
                                <InputCustomizavel id="nome" type="text" nome="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                                <InputCustomizavel id="email" type="text" nome="email" value={this.state.email} onChange={this.setEmail} label="E-mail"/>
                                <InputCustomizavel id="senha" type="password" nome="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>
                                <BotaoSubmitCustomizado label="Gravar"/>
                            </form>             
                        </div>  
                        <div>            
                            <table className="pure-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map((autor) =>  
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>                
                                        <td>{autor.email}</td>
                                    </tr>
                                )}
                            </tbody>
                            </table> 
                        </div>             
                    </div>            
                </div>
            </div>
        );
    }
}

export default App;
