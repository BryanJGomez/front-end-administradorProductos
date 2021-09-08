import React, {Fragment, useState, useContext} from 'react';
import Swal from 'sweetalert2';
import {withRouter} from'react-router-dom'
import clienteAxios from '../config/axios';
import {CMRContext} from '../../contex/CRMContext';


const NuevoCliente = ({history}) => {

        //utilizamos los valores del context
        const [auth, guardarAuth]=useContext(CMRContext); 

    // cliente = state, guardarCliente = funcion para guardar el state
    const[cliente, guardarCliente] = useState({
        nombre : '',
        apellido :'',
        empresa : '',
        email : '',
        telefono : ''
    });

     //** creamos una funcion que pueda leer los datos del formulario */
     const actualizarState = e =>{
         //almacer lo que el usuario escribe en el state
         guardarCliente({
             //obtener una copia del state actual
             ...cliente, 
             [e.target.name] :  e.target.value
         });
     }

     /** agregar en la REST-API un cliente nuevo */
     const agregarCliente = e=>{
         e.preventDefault();
         
         //enviar la peticion 
         clienteAxios.post('/clientes', cliente)
            .then(res=>{
                //validamos si hay error de mongo
                if(res.data.code === 11000){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Este correo ya esta registrado'
                      });
                }else{
                    Swal.fire(
                        'Cliente agregado!',
                        res.data.mensaje,
                        'success'
                      );
                      //redireccionamos
                history.push('/');
                }
                
            });
     }
      
     /**validamos el formulario */
     const validarCliente = () =>{
         
        const  {nombre, apellido, email, empresa, telefono} = cliente;
        //revisamos que las propiedades del objeto tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;   
        return valido;
     }
     //verifica si el usuario esta autenticado o no
     if(!auth.auth){
         history.push('/iniciar-sesion');
     }

    return ( 
        <Fragment>
         <h2>Nuevo Cliente</h2>
            <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input onChange={actualizarState} type="text" placeholder="Nombre Cliente" name="nombre"/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input onChange={actualizarState} type="text" placeholder="Apellido Cliente" name="apellido"/>
                </div>
                
                <div className="campo">
                    <label>Empresa:</label>
                    <input onChange={actualizarState}  type="text" placeholder="Empresa Cliente" name="empresa"/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input onChange={actualizarState}type="email" placeholder="Email Cliente" name="email"/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input onChange={actualizarState}  type="telefono" placeholder="Teléfono Cliente" name="telefono"/>
                </div>

                <div className="enviar">
                    <input disabled={validarCliente()} type="submit" className="btn btn-azul" value="Agregar Cliente"/>
                </div>

                </form>
        </Fragment>
     );
}
 
//** es una funcion que toma un componentes y retorna un componente */
export default withRouter(NuevoCliente);