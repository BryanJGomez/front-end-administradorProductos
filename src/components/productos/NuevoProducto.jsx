import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
import { withRouter } from "react-router";



function NuevoProducto (props){

  //producto = state, guardaProducto = setState
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
  });
  //archivo = state, guardarArchivo = state
  const [archivo, guardarArchivo] = useState('');

  //almacena un nuevo producto en la db y almacena la img
  const agregarProducto = async e =>{
        e.preventDefault();

        //creamos un formDate
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        try {
            const res = await clienteAxios.post('/productos', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            //lanzamos una alerta
            console.log(res);
            if(res.status === 200){
                Swal.fire(
                    
                    'Agregado correctamente',
                    res.data.mensaje,
                    'success'
                )
            }
            //redireccionamos
            props.history.push('/productos');

        } catch (error) {
            console.log(error);
            //lanzar alerta
            Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text:'Vuelvalo a intentarlo'
            })
        }
  }

  //leer los datos del formulario
  const leerInformacionProducto = e => {
    guardarProducto({
      //obtenemo una copia del state y agregarlo al nuevo
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  //agregar la imagen en el state
  const leerArchivo = e => {

    guardarArchivo(e.target.files[0]);
  };

  return (
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form onSubmit={agregarProducto} >
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            onChange={leerInformacionProducto}
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            onChange={leerInformacionProducto}
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input onChange={leerArchivo} type="file" name="imagen" />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
          />
        </div>
      </form>
    </Fragment>
  );
}

export default withRouter(NuevoProducto);
 