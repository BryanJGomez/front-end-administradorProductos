import React, {useEffect, useContext, useState, Fragment} from 'react';
import {Link} from 'react-router-dom'
/**importamos axios */
import clineteAxios from '../config/axios';
import Spiner from '../layout/Spiner';
import Cliente from '../client/Cliente'
import { withRouter } from 'react-router';
/**importamos los contexto */
import {CMRContext} from '../../contex/CRMContext';

const Clientes = (props) => {

    //trabajar con el state
    //clientes = state, guardarClientes = funcion para guardar el state
    const [clientes, guardarClientes] = useState([]); //= es por que esperamos un arreglo de clientes

    //utilizamos los valores del context
        // utilizar valores del context
        const [auth, guardarAuth ] = useContext( CMRContext );

        // use effect es similar a componentdidmount y willmount
        useEffect( () => {
    
            if(auth.token !== '') {
                // Query a la API
                const consultarAPI = async () => {
                    try {
                        const clientesConsulta = await clineteAxios.get('/clientes', {
                            headers: {
                                Authorization : `Bearer ${auth.token}`
                            }
                        });
        
                        // colocar el resultado en el state
                        guardarClientes(clientesConsulta.data);
    
                    } catch (error) {
                        // Error con authorizacion
                        if(error.response.status = 500) {
                            props.history.push('/iniciar-sesion');
                        }
                    }
                }
                consultarAPI();
            } else {
                props.history.push('/iniciar-sesion');
            }
        }, [clientes] );
    
    
        // Si el state esta como false
        if(!auth.auth) {
            props.history.push('/iniciar-sesion');
        }

    //cargar spiner
    if(!clientes.length) return <Spiner/>
    
    return ( 
        <Fragment>
          <h2>Clientes</h2>

             <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

          <ul className="listado-clientes">
                 {clientes.map(cliente=>(
                     <Cliente 
                        key={cliente._id}
                        cliente={cliente}
                     />
                 ))}
          </ul>
        </Fragment>
     );
}
  
export default withRouter (Clientes);