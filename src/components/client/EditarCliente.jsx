import React, {useEffect, useState, Fragment, useContext} from 'react';
import Swal from 'sweetalert2';
import {withRouter} from'react-router-dom'
import clienteAxios from '../config/axios';
import {CMRContext} from '../../contex/CRMContext';


const EditarCliente = (props) => {
    //obtener el id
    const {id} = props.match.params;
    const [auth, guardarAuth]=useContext(CMRContext); 



    // cliente = state, datosClientes = funcion para guardar el state
    const[cliente, datosClientes] = useState({
        nombre : '',
        apellido :'',
        empresa : '',
        email : '',
        telefono : ''
    });
   
    //UseEfect cuando tenga el componente cargadyo
    useEffect(()=>{
        async function consultarAPIS(){
            const  clientesConsulta = await  clienteAxios.get(`/clientes/${id}`);
            //colocar el resultado del state
            datosClientes(clientesConsulta.data)
        }

        consultarAPIS();
    }, [id]);
     

     //** creamos una funcion que pueda leer los datos del formulario */
     const actualizarState = e =>{
         //almacer lo que el usuario escribe en el state
         datosClientes({
             //obtener una copia del state actual
             ...cliente, 
             [e.target.name] :  e.target.value
         });
     }

     //enviar una peticion por axios para hacer un update a cliente
     const actualizarCliente = e =>{
         e.preventDefault();

         //enviar peticion por axios
         clienteAxios.put(`/clientes/${cliente._id}`, cliente)
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
                        'Correcto',
                        'Se Actualizo Correctamente!',
                        'success'
                      );
                      //redireccionamos
                      props.history.push('/');
                }
            })
     }
      
     /**validamos el formulario */
     const validarCliente = () =>{

         //Destructurin
        const  {nombre, apellido, email, empresa, telefono} = cliente;
        //revisamos que las propiedades del objeto tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;   
        return valido;
     }

      //verifica si el usuario esta autenticado o no
      if(!auth.auth){
       props.history.push('/iniciar-sesion');
    }


    return ( 
        <Fragment>
         <h2>Editar Cliente</h2>
            <form onSubmit={actualizarCliente} >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input onChange={actualizarState} value={cliente.nombre} type="text" placeholder="Nombre Cliente" name="nombre"/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input onChange={actualizarState} value={cliente.apellido} type="text" placeholder="Apellido Cliente" name="apellido"/>
                </div>
                
                <div className="campo">
                    <label>Empresa:</label>
                    <input onChange={actualizarState} value={cliente.empresa} type="text" placeholder="Empresa Cliente" name="empresa"/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input onChange={actualizarState} value={cliente.email} type="email" placeholder="Email Cliente" name="email"/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input onChange={actualizarState} value={cliente.telefono} type="telefono" placeholder="Teléfono Cliente" name="telefono"/>
                </div>

                <div className="enviar">
                    <input disabled={validarCliente()} type="submit" className="btn btn-azul" value="Editar Cliente"/>
                </div>

                </form>
        </Fragment>
     );
}
 
//** es una funcion que toma un componentes y retorna un componente */
export default withRouter(EditarCliente);