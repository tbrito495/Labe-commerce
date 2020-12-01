import React from 'react';
import ReactDOM from 'react-dom';
import '../../index.css';
import App from '../../App';
import loading from './img/cart.gif'
import styled from 'styled-components'

const Div1 = styled.div`
width:100%;
`

class Load extends React.Component {
    state = {
        done: undefined
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ done: true })
        }, 2000);
    }
    render() {
        return (
            <Div1>{!this.state.done ? (
                <header className="App-header">
                    <img src={loading} className="App-logo" alt="logo" />
                    <p>Sejam Bem-Vindos a nossa loja!!!</p>
                </header>
            ) : (
                    <App />
                )}</Div1>
        )
    }
}

export default Load