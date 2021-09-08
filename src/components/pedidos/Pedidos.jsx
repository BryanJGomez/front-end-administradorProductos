import React, {useEffect, useContext, useState, Fragment} from 'react'
import clienteAxios from '../config/axios';
import DetallesPedidos from './DetallesPedidos';
import {CMRContext} from '../../contex/CRMContext';
import Spiner from '../layout/Spiner';

function Pedidos(props){

      //utilizamos los valores del context
      const [auth, guardarAuth]=useContext(CMRContext); 

    const [pedidos, guardarPedidos] = useState([]);

    useEffect( ()=>{
       if(auth.token !== ''){

         //consultamos la api
         const consultarAPI = async ()=>{
            try {
                const resultado = await clienteAxios.get('/pedidos',{
                    headers:{
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                guardarPedidos(resultado.data);
            } catch (error) {
                if(error.response.status === 500){
                    props.history.push('/iniciar-sesion');
                }
            }
        }

        //llamamos la api
        consultarAPI();

       }else{
        props.history.push('/iniciar-sesion');
       }
    },[pedidos]);

    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    //cargar spiner
    if(!pedidos.length) return <Spiner/>

    return ( 
        <Fragment>
             <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                {pedidos.map(pedido =>(
                    <DetallesPedidos 
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))}
            </ul>

        </Fragment>
     );
}
 
export default Pedidos;