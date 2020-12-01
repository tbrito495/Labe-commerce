import React from 'react'
import styled from 'styled-components'
import close from '../Cart/img/close.png'

const Side = styled.div`
    background: rgba(10, 10, 10, 0.9);
    color: #ffffff;
    width:20%;
    font-family: 'Roboto', sans-serif;
    font-size:17px;
    text-align: left;
    padding: 10px;
    border: 2px solid rgba(10, 10, 10);

    @media screen and (max-width: 375px) {
        width: 40%;
    }
`
const Total = styled.p`
    font-weight: 200;
`
const Div1 = styled.div`
    display:flex;
    height:50px;
    align-items:center;
    @media screen and (max-width: 1080px){
        height: 70px;
    }
    @media screen and (max-width: 375px){
        height: 90px;
    }
`
const Sla = styled.b`
    color: red;
`

const ButtonX = styled.img`
    position:relative;
    width:25px;
    margin-left: 7px;

:hover {
    cursor: pointer;
    @media (prefers-reduced-motion: no-preference){
        
        animation: Close-spin 15s linear infinite;
    }
@keyframes Close-spin {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(0);
    }
}
}
`
export default class Cart extends React.Component {
    state = {
        valorItems: '' //nao sei o nome da props do Rafael
    }
    pegarProduto() {
        const produtoPego = this.props.cartSx.map((element) => {
            const produtoD = `${element.quantidade}x ${element.name}`

            return (
                <Div1>
                    {produtoD}
                    <ButtonX src={close} alt="" onClick={this.props.cartX} />
                </Div1>
            )
        })
        return produtoPego
    }

    valT() {
        return this.props.cartSx.reduce((val1, val2) => {
            return val1 + val2.price * val2.quantidade
        }, 0)
    }

    render() {
        const produtoPego = this.pegarProduto()
        const valT = this.valT()
        console.log(valT)

        return (
            <Side sidebarOpen={this.props.sidebarOpen}>
                <h2>Carrinho:</h2>
                <div>{produtoPego}</div>
                <Total>Total: <b>R$: {valT.toFixed(2)}</b></Total>
            </Side>
        )
    }

}
