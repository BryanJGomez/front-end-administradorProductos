import React from 'react'
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

function detallesPedidos(props){

    const {cliente, pedido, total, _id} = props.pedido;
    //eliminamos un pedido
    const elimnarPedido = id =>{
        Swal.fire({
            title: '¿Estas seguro que quieres eliminarlo?',
            text:'Un pedido borrado no se recupera',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result)=>{
            if(result.isConfirmed){
                Swal.fire(
                    clienteAxios.delete(`/pedidos/${id}`)
                    .then(res=>{
                        if(res.status === 200){
                            Swal.fire(
                                'Eliminado!',
                                res.data.mensaje,
                                'success'
                            );
                        }
                    })
                )
            }
        })
    }
    // const eliminarProducto = id => {        Swal.fire({            title: '¿Estas seguro?',            text: "Luego no hay vuelta atrás",            icon: 'warning',            showCancelButton: true,            confirmButtonColor: '#3085d6',            cancelButtonColor: '#d33',            confirmButtonText: 'Si, elimínalo!'          }).then((result) => {            if (result.value) {                 // llamado a axios                clienteAxios.delete(`/productos/${id}`)                .then(res => {                    Swal.fire(                    'Eliminado!',                    'El cliente se ha eliminado.',                    'success'                    )                })            }  
    
    return (  
        <li className="pedido">
        <div className="info-pedido">
            <p className="id">ID: {cliente._id}</p>
            <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

            <div className="articulos-pedido">
                <p className="productos">Artículos Pedido: </p>
                <ul>
                    {
                        pedido.map(articulos=>(
                            <li key={pedido._id + articulos.producto._id} >
                                <p>{articulos.producto.nombre}</p>
                                <p>Precio: ${articulos.producto.precio}</p>
                                <p>Cantidad: {articulos.cantidad}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <p className="total">Total: ${total} </p>
        </div>
        <div className="acciones">

            <button onClick={()=> elimnarPedido(_id)} type="button" className="btn btn-rojo btn-eliminar">
                <i className="fas fa-times"></i>
                Eliminar Pedido
            </button>
        </div>
    </li>
    );
}
 
export default detallesPedidos;