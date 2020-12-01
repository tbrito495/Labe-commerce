import React from 'react';
import styled from "styled-components";
const FiltroEntreLinhas = styled.div`
margin: 10px 0;
display: grid;
`
const FiltroGeral = styled.div`
  width: 20%;
  padding:10px;
  text-align: left;
  background-color:rgba(10, 10, 10, 0.9);
  color:white;
  border:2px solid rgba(10, 10, 10);
`

class Filtro extends React.Component {
    state = {
        Filtros: [
            {
                valorMinimo: "",
                valorMaximo: "",
                produto: ""
            }

        ],
        inputMinimo: "",
        inputMaximo: "",
        inputProduto: ""
    };

    adicionaValor = () => {
        const novoValor = {
            valorMinimo: this.state.inputMinimo,
            valorMaximo: this.state.inputMaximo,
            produto: this.state.inputProduto
        };
        const novosFiltros = [...this.state.Filtros, novoValor];
        this.setState({ filtros: novosFiltros });
    }


    render() {

        return (
            <FiltroGeral>
                <h1>Filtros</h1>
                <FiltroEntreLinhas>
                    <label>Valor Mínimo</label>
                    <input type="number" onChange={this.props.onChangeValorMin} value={this.props.valorMin} min={0}></input>
                </FiltroEntreLinhas>
                <FiltroEntreLinhas>
                    <label>Valor Máximo</label>
                    <input type="number" onChange={this.props.onChangeValorMax} value={this.props.valorMax}></input>
                </FiltroEntreLinhas>
                <FiltroEntreLinhas>
                    <label>Buscar Produto</label>
                    <input type="text" onChange={this.props.onChangeBuscarProduto} value={this.props.valorBusca}></input>
                </FiltroEntreLinhas>
            </FiltroGeral>
        )
    }

}
export default Filtro;





