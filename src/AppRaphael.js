import React, { Component } from 'react';
import './AppRaphael.css';
import Cart from './Cart/Cart';
import cart from './Cart/img/cart.png'
import styled from 'styled-components'

import { Home } from './Home/Home';
import Filtro from "./Filtro";

// Estilização do botão
const CartIcon = styled.div`
  display:flex;
  justify-items:center;
  align-items:center;

  position:fixed;
  bottom: 40px;
  right: 40px;
  border: 3px solid gainsboro;
  border-radius: 50%;
  background-color: rgba(36,44,46, 0.9) ;

img {
  width: 80px;
  transition: all 0.5s;
  margin: -6px -5px -6px -6px;
  :hover{
  transform: scale(0.9);
  transition: all 0.5s;
  margin: 2px;
  }
}
`// Fim Botão

export default class AppRaphael extends Component {
  state = {
    sidebarOpen: false,
    produtosHome: [],
    produtosCart: [],

    valorMinimo:-Infinity,
    valorMaximo: Infinity,
    buscarProduto: '',
  }

  onChangeValorMin = (event) => {
    this.setState({valorMinimo: event.target.value})
  }

  onChangeValorMax = (event) => {
    this.setState({valorMaximo: event.target.value})
  }

  onChangeBuscarProduto = (event) => {
    this.setState({buscarProduto: event.target.value})
  }

  cartAdicionar = (id) => {
    console.log(`cartAdicionar (id: ${id})`)
    const produtoAdicionado = this.state.produtosHome.filter((produto) => {
      if (produto.id === id){return true} else {return false}
    })
    const produtosCartNovo = [...this.state.produtosCart, ...produtoAdicionado]
  }

  cartExcluir = (id) => {
    const produtoExcluido = this.state.produtosCart.filter((produto) => {
      if (produto.id === id){return false} else {return true}
    })
    const produtosCartNovo = [...produtoExcluido]
  }

//click botão
  onSidebarOpen = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
  }

  render() {
    // {id: state.prodID + 1, name: 'Nome do Produto', imgUrl:'https://picsum.photos/200/150', price: 219.9}
    const produtosHomeNovo = this.state.produtosHome.filter((produto) => {
      if(produto.price >= this.state.valorMinimo && produto.price <= this.state.valorMaximo){
        return true
      } else {
        return false
      }
    })

    return (
      <div className="App">
        <Filtro />

        <Home
          produtosHome={produtosHomeNovo}
          cartAdicionar={this.cartAdicionar}
        ></Home>

        {/* lógica de click */}
        {this.state.sidebarOpen && (
          <Cart />
        )}
        
        <CartIcon onClick={this.onSidebarOpen}>
          <img src={cart} alt="" />
        </CartIcon>
        
      </div>
    );
  }

}