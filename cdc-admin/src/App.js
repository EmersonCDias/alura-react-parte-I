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
            name: '',
            email: '',
            password: ''
        }
    }

    componentWillMount(){
        Axios.get('https://api.myjson.com/bins/13b4g2')
        .then((response) => {
            this.setState({ 
                lista: response.data
            })
        })
    }

    enviaForm = (evento) => {
        evento.preventDefault();
        Axios.post('https://api.myjson.com/bins', {
            'name': this.state.name,
            'email': this.state.email,
            'password': this.state.password
        })
        .then((response) => {
            console.log(response.data.uri)
            this.setState({
                lista: response.config.data.split(",")
            })
        })
        .catch((response)=> {
            console.log(response)
        })
    }

    setName = (evento) => {
        this.setState({name: evento.target.value});
    }

    setEmail = (evento) => {
        this.setState({email: evento.target.value});
    }

    setPassword = (evento) => {
        this.setState({password: evento.target.value});
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
                                <InputCustomizavel id="name" type="text" name="name" value={this.state.name} onChange={this.setName} label="Nome"/>
                                <InputCustomizavel id="email" type="text" name="email" value={this.state.email} onChange={this.setEmail} label="E-mail"/>
                                <InputCustomizavel id="password" type="password" name="password" value={this.state.password} onChange={this.setPassword} label="Senha"/>
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
                                {this.state.lista.map((autor, index) =>  
                                    <tr key={index}>
                                        <td>{autor.name}</td>                
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
