import React from 'react';
import $ from 'jquery';
import InputCustomizavel from './InputCustomizavel';

class FormularioAutor extends React.Component {

    constructor(){
        super()
        this.state = {
            nome: '',
            email: '',
            senha: ''
        }
    }

    enviaForm = evento => {
        evento.preventDefault()
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha
            }),
            beforeSend: () => {
                console.log('enviando dados')
            },
            success: resposta => {
                this.props.callbackAtualizaListagem(resposta)
                console.log('dados enviados')
            },
            error: resposta => {
                console.log("erro")
            }
        })
    }

    setNome = evento => {
        this.setState({
            nome: evento.target.value
        })
    }

    setEmail = evento => {
        this.setState({
            email: evento.target.value
        })
    }

    setSenha = evento => {
        this.setState({
            senha: evento.target.value
        })
    }

    render(){
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizavel id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                    <InputCustomizavel id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>
                    <InputCustomizavel id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>
                    <div className="pure-control-group">                                  
                        <label></label> 
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                    </div>
                </form>             
            </div>  
        )
    }
}

class TabelaAutores extends React.Component {

    render(){
        return(
            <div className="content" id="content">
                <div>            
                    <table className="pure-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.props.lista.map(function(autor){
                                return (
                                <tr key={autor.id}>
                                    <td>{autor.nome}</td>
                                    <td>{autor.email}</td>
                                </tr>
                                )
                            })
                            }
                        </tbody>
                    </table> 
                </div>             
            </div>
        )
    }
}

export default class AutorBox extends React.Component {

    constructor() {
        super()
        this.state = {
            lista: []
        }
    }

    componentDidMount() {
        $.ajax({
            url: "https://cdc-react.herokuapp.com/api/autores",
            dataType: 'json',
            beforeSend: () => {
                console.log('carregando dados')
            },
            success: resposta => {
                this.setState({
                    lista: resposta
                })
                console.log('dados carregados')
            }
        })
    }

    atualizaListagem = novaLista => {
        this.setState({
            lista: novaLista
        })
    }

    render(){
        return(
            <div>
                <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/>
                <TabelaAutores lista={this.state.lista}/>
            </div>
        )
    }
}