import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';
import { useState } from 'react';
import { Error } from './Error';


const Input = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DF3;
        cursor: pointer;
    }
`


//Se recibe como parametro la funcion que viene desde App.jsx
export const Formulario = ({ setMonedas }) => {

    const [criptos, setCriptos]=useState([]);
    const [error, setError]=useState(false);

    //Hook personalizado, recibe como parametro el label y las opciones que va a mostrar.
    // Se desestructura el state ( renombrado moneda ) y el selectMonedas
    const [ moneda , SelectMonedas ] = useSelectMonedas( 'Elije tu moneda', monedas );

    //Se reutiliza el componente
    const [ criptoMoneda , SelectCriptoMonedas ] = useSelectMonedas( 'Elije tu criptomoneda', criptos );
    
    useEffect(() => {
      const consultarAPI = async ()=>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const respuesta = await fetch( url )
            const resultado = await respuesta.json()
            
            //Crear nuevo arreglo con la informacion que queremos ( id y nombre de moneda )
            const arrayCripto = resultado.Data.map( cripto => {

                //Se crea obj con la informacion deseada
                const obj={
                    id: cripto.CoinInfo.Name,
                    name: cripto.CoinInfo.FullName,
                }
                //Llenar arrayCripto con los obj creados.
                return obj;
            });

            //Llenar el state de criptos
            setCriptos(arrayCripto)

      }

      consultarAPI();
    

    }, []);


    const handleSubmit = (e)=>{
        e.preventDefault();
        //Si alguno de los dos es '' se setea el error en true y se dispara la validacion
        if([moneda,criptoMoneda].includes('')){
            setError(true);

            return;
        }
        setError(false);
        //setMonedas viene de App.jsx y llena el hook 
        setMonedas({
            moneda,
            criptoMoneda
        })
    }
    

  return (
    <>
    
        {error && <Error> Todos los campos son obligatorios </Error>}
        <form onSubmit={handleSubmit}>

            <SelectMonedas/>
            <SelectCriptoMonedas/>

            <Input 
                type="submit" 
                value='Cotizar'
                />
        </form>
    
    </>
  )
}
