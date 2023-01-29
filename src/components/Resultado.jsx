import React from "react";
import styled from "@emotion/styled";

const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`;

const ResultadoDiv = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;

const Precio = styled.p`
    font-size: 23px;
    span{
        font-weight: 700;
    }
`
const Imagen = styled.img`
    display: block;
    width: 120px;
`


export const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    resultado;
  return (
    <ResultadoDiv>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen cripto" />
        <div>
            <Precio>
                El precio es de: <span> {PRICE} </span>
            </Precio>
            <Texto>
                El Texto mas alto del dia es de: <span> {HIGHDAY}</span>
            </Texto>
            <Texto>
                El Texto mas bajo del dia es de: <span> {LOWDAY} </span>
            </Texto>
            <Texto>
                Variacion en las ultimas 24 horas: <span>{CHANGEPCT24HOUR} </span>
            </Texto>
            <Texto>
                Ultima actualizacion: <span>{LASTUPDATE} </span>
            </Texto>
        </div>
    </ResultadoDiv>
  );
};
