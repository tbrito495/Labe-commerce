import React, { Component } from 'react';
import './App.css';
import Cart from './Components/Cart/Cart';
import cart from './Components/Cart/img/cart.png'
import styled from 'styled-components'
// import { CardProduto } from './CardProduto/CardProduto'
import { Home } from './Components/Home/Home';
import Filtro from "./Components/Filtro/Filtro";


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
  background-color: rgba(36, 44, 46, 0.9) ;
  box-shadow: -3px 3px 3px rgba(160, 160, 160);
  cursor: pointer;
  
img {
  width: 95px;
  transition: all 0.5s;
  margin: -6px -5px -6px -6px;
  /* z-index: 111; */
  :hover{
  transform: scale(0.9);
  transition: all 0.5s;
  margin: 2px;
  }
}
`
const Somar = styled.span`
  background-color:rgba(20,20,20, 0.8);
  border: 3px solid gainsboro;
  border-radius: 50%;
  padding: 3px 11px;
  width:10px;
  font-size:20px;
  z-index:1111;
  position: absolute;
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
  bottom:0;
  left:0;
`

// Fim Botão

export default class App extends Component {
  state = {
    sidebarOpen: false,
    produtosHome: [],
    produtosCart: [],

    valorMinimo: -Infinity,
    valorMaximo: Infinity,
    buscarProduto: '',

    prodID: 0,
    selectValue: 'relevancia',
    done: undefined,
  }

  componentDidMount() {
    //Caso ainda não tenhamos nenhum produto na página, 12 produtos ficticios serão adicionados
    if (this.state.produtosHome.length <= 0) {
      let produtosHomeNovo = [
        { id: 1, name: `Uma Coisa`, imgUrl: `https://picsum.photos/200/150?a=1`, price: Math.random()*1000},
        { id: 2, name: `Esse é diferente`, imgUrl: `https://picsum.photos/200/150?a=2`, price: Math.random()*1000 },
        { id: 3, name: `Lorem Ipsum`, imgUrl: `https://picsum.photos/200/150?a=3`, price: Math.random()*1000},
        { id: 4, name: `Mistica Escolha`, imgUrl: `https://picsum.photos/200/150?a=4`, price: Math.random()*1000},
        { id: 5, name: `Super Surpresa`, imgUrl: `https://picsum.photos/200/150?a=5`, price: Math.random()*1000},
        { id: 6, name: `Labenu Cargo Simples`, imgUrl: `https://picsum.photos/200/150?a=6`, price: Math.random()*1000},
        { id: 7, name: `Tantra Feelings`, imgUrl: `https://picsum.photos/200/150?a=7`, price: Math.random()*1000},
        { id: 8, name: `Veste Bem`, imgUrl: `https://picsum.photos/200/150?a=8`, price: Math.random()*1000},
        { id: 9, name: `Super Nova`, imgUrl: `https://picsum.photos/200/150?a=9`, price: Math.random()*1000},
        { id: 10, name: `Massachusets Core`, imgUrl: `https://picsum.photos/200/150?a=10`, price: Math.random()*1000},
        { id: 11, name: `Beach Style Yoga`, imgUrl: `https://picsum.photos/200/150?a=11`, price: Math.random()*1000},
        { id: 12, name: `Birthday Choice`, imgUrl: `https://picsum.photos/200/150?a=12`, price: Math.random()*1000},
      ]
      this.setState({produtosHome: produtosHomeNovo})
    }

  }

  onChangeValorMin = (event) => {
    event.target.value === '' ?
      this.setState({ valorMinimo: -Infinity }) :
      this.setState({ valorMinimo: event.target.value })
  }

  onChangeValorMax = (event) => {
    event.target.value === '' ?
      this.setState({ valorMaximo: Infinity }) :
      this.setState({ valorMaximo: event.target.value })
  }

  onChangeBuscarProduto = (event) => {
    this.setState({ buscarProduto: event.target.value })
  }



  cartAdicionar = (id) => {
    const novoCart = [...this.state.produtosCart]
    const produtoIndexCart = this.state.produtosCart.findIndex((produto) => produto.id === id)

    if (produtoIndexCart > -1) {
      novoCart[produtoIndexCart].quantidade += 1
    } else {
      let homeIndex = this.state.produtosHome.findIndex((produto) => produto.id === id)
      let novoProduto = this.state.produtosHome[homeIndex]
      novoCart.push({ ...novoProduto, quantidade: 1 })
    }

    this.setState({ produtosCart: novoCart })
    console.log(novoCart)
  }


  ordenarProdutos = (event) => {
    this.setState({selectValue: event.target.value})
  }


  cartExcluir = (id) => {
    const produtosCartNovo = [...this.state.produtosCart]

    const produtoExcluido = produtosCartNovo.findIndex((produto) => produto.id === id)
    console.log(produtoExcluido)
    produtosCartNovo.splice(produtoExcluido, 1)

    this.setState({ produtosCart: produtosCartNovo })
  }


  //click botão
  onSidebarOpen = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
  }

  soma() {
    return this.state.produtosCart.reduce((e1, e2) => {
      return e1 + e2.quantidade
    }, 0)
  }

  render() {
    let produtosHomeNovo = this.state.produtosHome.filter((produto) => {
      // console.log(`produtosHomeNovo ${ produto.name}`)
      if((produto.price >= Number(this.state.valorMinimo) && produto.price <= Number(this.state.valorMaximo))
          &&
          (this.state.buscarProduto === '' || produto.name.toUpperCase().indexOf(this.state.buscarProduto.toUpperCase()) >= 0)) {
        return true
      } else {
        return false
      }
    })

    //funções para ordenar os produtos na "Home" conforme a selação do botão "select"
    this.state.selectValue === 'relevancia' && produtosHomeNovo.sort((a, b)=>{return a.id - b.id})
    this.state.selectValue === 'cresc' && produtosHomeNovo.sort((a, b)=>{return a.price - b.price})
    this.state.selectValue === 'decresc' && produtosHomeNovo.sort((a, b)=>{return b.price - a.price})

    const somas = this.soma()

    return (
      <div className="App">
        <Filtro
          onChangeValorMin={this.onChangeValorMin}
          onChangeValorMax={this.onChangeValorMax}
          onChangeBuscarProduto={this.onChangeBuscarProduto}
          valorMin={this.state.valorMinimo}
          valorMax={this.state.valorMaximo}
          valorBusca={this.state.valorBusca}
        />

        <Home
          produtosHome={produtosHomeNovo}
          cartAdicionar={this.cartAdicionar}
          ordenarProdutos={this.ordenarProdutos}
        ></Home>

        {/* lógica de click */}
        {this.state.sidebarOpen ?
          <Cart
            cartSx={this.state.produtosCart}
            cartX={this.cartExcluir}
          /> : null
        }



        <CartIcon onClick={this.onSidebarOpen} >
          {somas > 0 && <Somar>{somas}</Somar>}

          <img src={cart} alt="" />
        </CartIcon>

        {this.cartAdicionar ? <div>{this.produtosCartNovo}</div> : null}

      </div>
    );
  }

}
