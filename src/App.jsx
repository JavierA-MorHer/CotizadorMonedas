import './App.css';
import styled from '@emotion/styled';
import imgCripto from './assets/img/imagen-criptos.png';
import { Formulario } from './components/Formulario';
import { useEffect, useState } from 'react';
import { Resultado } from './components/Resultado';
import { Spinner } from './components/Spinner';


//Hecho con Styled Components
const Contenedor = styled.div `
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size:34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`


function App() {

  //Se cre hook para recibir la moneda y la criptomoneda en el App
  const [monedas, setMonedas] = useState({})

  //Hook donde se va a guardar el resultado de la consulta
  const [resultado, setResultado] = useState({})

  //Hook que ayudara a mostrar spinner
  const [cargando, setCargando] = useState(false);

  useEffect(() => {

    //Si el length del objeto es mayor a 0, se va a ejecutar el useEffect
    //ya que la primera vez que renderiza la aplicacion se dispara 
    if(Object.keys(monedas).length > 0){
      
      //Se usa Object Destructuring para obtener los valores individuales.
      const {moneda, criptoMoneda }= monedas;

      const cotizarCripto = async ()=>{
        //Mientras resuelve la llamada  a la API muestra el spinner
        setCargando(true);
        //Setea el resultado en blanco para siempre dejar un registro en pantalla
        setResultado({});

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

        const respuesta = await fetch( url );
        const resultado = await respuesta.json();

        //Sintaxis para poner dinamicamente campos de un objeto
        setResultado( resultado.DISPLAY[criptoMoneda][moneda] );
        setCargando(false);
      }

      cotizarCripto();
    }
  //Si monedas cambia, se dispara la peticion nuevamente
  }, [monedas])
  


  return (
    <Contenedor>
      <Imagen 
        src={imgCripto}
        alt='Imagen cripto'
      />

      <div>
        <Heading> Cotiza criptomonedas al instante </Heading>
        
        {/* Se manda el setMoneda para en el formulario llenar con las opciones elegidas */}
        <Formulario 
          setMonedas={setMonedas}
        />

        {/* Si existe la propiedad de PRICE significa que ya hay un resultado y muestra el componente */}
        {/* Se pasan como props el resultado para que se pueda manipular en ese componente */}
        { cargando && <Spinner/>}
        { resultado.PRICE && <Resultado resultado={resultado}/> } 
      </div>


    </Contenedor>
   
  )
}

export default App
