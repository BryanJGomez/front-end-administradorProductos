import React,{useContext} from 'react';
import { withRouter } from 'react-router';

import {CMRContext} from '../../contex/CRMContext'

const Headers = (props)=>{

    const [auth, guardarAuth] = useContext(CMRContext);

    const cerrarSesion=()=>{
        //auth.auth = false remover roken
        guardarAuth({
            token: '',
            auth: false
        });
        localStorage.setItem('token', '');

        props.history.push('/iniciar-sesion');

    }

    return(
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Administrador de Clientes</h1>
                    {auth.auth ? (
                        <button 
                           type="button"
                           className="btn btn-rojo"
                           onClick={cerrarSesion}
                       >
                           <i className="far far-time-circle"></i>
                           Cerrar Sesion
                       </button>
                    ): null}
                 
                </div>
            </div>
        </header>
    )
}

export default withRouter (Headers);