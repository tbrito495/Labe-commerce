import React from 'react'
import styled from 'styled-components'
import { CardProduto } from '../CardProduto/CardProduto'


const HomeBox = styled.main`
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-rows: 50px auto;
    gap: 15px;
    padding: 0 0 0 10px;
`

const HomeHeader = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
`

const HomeSelect = styled.select`
    margin: 0;
    padding: 0;
    outline-style:none;
    outline: none;
`

const HomeQtd = styled.p`
    margin: 0;
    padding: 0;
    font-size: calc(12px + 0.5vw);

`

const ProdBox = styled.div`
    box-sizing: border-box;
    padding: 0 10px 10px 10px;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start; */

    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    @media screen and (min-width:605px){grid-template-columns: repeat(2,1fr);}
    @media screen and (min-width:880px){grid-template-columns: repeat(3,1fr);}
    @media screen and (min-width:1145px){grid-template-columns: repeat(4,1fr);}
    @media screen and (min-width:1500px){grid-template-columns: repeat(5,1fr);}
`




export class Home extends React.Component {
    state = {
        produtosHome: [],
        produtosCarrinho: [],
        prodID: 0,
    }


    adicionarCarrinho = (id) => {
        alert(`Adicionar Carrinho (id: ${id})`)
    }

    render() {
        let produtosNova
        if(this.props.produtosHome.length > 0){
            produtosNova = this.props.produtosHome.map((produto)=>{
                return(
                    <CardProduto
                        key={produto.id}
                        prodId={produto.id}
                        prodImg={produto.imgUrl}
                        prodNome={produto.name}
                        prodPreco={produto.price}
                        cartAdicionar={()=>this.props.cartAdicionar(produto.id)}
                    ></CardProduto>
                )
            })
        }

        return(
            <HomeBox>
                <HomeHeader>
                    <HomeQtd>Produtos: {this.props.produtosHome.length}</HomeQtd>
                    <HomeSelect onChange={this.props.ordenarProdutos} name={'ordenarProdutos'}>
                        <option value={'relevancia'}>Relevância</option>
                        <option value={'cresc'}>Preço: Crescente</option>
                        <option value={'decresc'}>Preço: Decrescente</option>
                    </HomeSelect>
                </HomeHeader>
                <ProdBox>
                    {produtosNova}
                </ProdBox>
            </HomeBox>
        )
    }
}

export default Home