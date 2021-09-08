import React, {Fragment, useEffect, useState} from 'react'
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";
import { withRouter } from "react-router";
import Spiner from '../layout/Spiner';

function EditarProducto(props)  {

    //obtenemos id
    const {id} = props.match.params;
    // console.log(id);

    //producto = state y funcion para actualizar
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    })

      //archivo = state, guardarArchivo = state
  const [archivo, guardarArchivo] = useState('');


    //cuando el componente carga
    useEffect(()=>{

        //consultamos api
        const  consultarAPI = async()=>{
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);

            guardarProducto(productoConsulta.data);
        }


        consultarAPI(); 
    }, [id]);


// Edita un Producto en la base de datos
  const editarProducto = async e => {
    e.preventDefault();

    //creamos un formData
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    //lo almacenamos en la base de datos
    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
      });

      //lanzamos una alerta
      if(res.status === 200){
        Swal.fire(
          'Actualizado Correctamente',
          res.data.mensaje,
          'success'
        )
      }
      props.history.push('/productos');
    } catch (error) {
      console.log(error);
    }
  
  }


      //leer los datos del formulario
  const leerInformacionProducto = e => {
    guardarProducto({
      //obtenemo una copia del state y agregarlo al nuevo
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  //agregar la imagen en el state
  const leerArchivo = e => {

    guardarArchivo(e.target.files[0]);
  };

  //extramoe los valores del state
  const {nombre, precio, imagen} = producto;
  if(!nombre) return <Spiner/>

    return ( 
    <Fragment>
      <h2>Editar Producto</h2>
 
      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            onChange={leerInformacionProducto}
            defaultValue={nombre}
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            onChange={leerInformacionProducto}
            defaultValue={precio}
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
          />
        </div>

        <div className="campo">
              <label>Imagen:</label>
             { imagen ? (
                    <img src={`http://localhost:5000/${imagen}`} alt="imagen" width="300" />
                ) : null
              }
            <input 
                type="file"  
                name="imagen"
                onChange={leerArchivo}
            />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar Producto"
          />
        </div>
      </form>
    </Fragment>
     );
}
 
export default withRouter(EditarProducto);