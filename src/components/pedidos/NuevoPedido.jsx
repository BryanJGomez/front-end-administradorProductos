import React,{useEffect, useState, Fragment} from 'react'
import clienteAxios from '../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import Swal from 'sweetalert2';
import FormCantidadProducto from './FormCantidadProducto';
import { withRouter } from 'react-router';

function NuevoPedido(props){
    //extraemos el ID del Cliente
    const {id} = props.match.params

    //state 
    const [cliente, guardarCliente] = useState ({});
    const [busquedad, guardarBusquedad] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);
 

     //obtener el cliente
     

    useEffect(()=>{

            //actualizar el total a pagar
    const actualizarTotal = ()=>{
        // si el arreglo de productos es igual 0: el total es 0
        if(productos.length === 0) {
            guardarTotal(0);
        }
        let nuevoTotal = 0;

        // recorrer todos los productos, sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio)  );
        // const nuevoTotal = productos.length > 0 ?   
        //     productos.reduce((valor_previo, valor_actual)=>{
               
        //         const total_tmp =parseFloat (valor_actual.precio) * parseInt(valor_actual.cantidad)
        //         return parseFloat( valor_previo) + parseFloat(total_tmp);
               
        //     },0)
        
        // : 0
        //         // almacenar el Total
        guardarTotal(nuevoTotal);
    }

    const consultarAPI = async()=>{
        //consultar el cliente actual
        const result = await clienteAxios.get(`/clientes/${id}`);
        guardarCliente(result.data);
    }

         

        //llamos la API
        consultarAPI();

        //actualizamos el total a pagar
        actualizarTotal();

    },[id, productos]);

    const {nombre, apellido, email,  telefono,} = cliente;


    //metodo para buscar el producto
    const buscarProducto = async e =>{
        e.preventDefault();

        //obtener los productos de la busquedad
        const resultadoBusquedad = await clienteAxios.post(`/productos/busquedad/${busquedad}`);

        //si no hay resultado una alerta, contrario agregamos al state
        if(resultadoBusquedad.data[0]){

            let productoResultado = resultadoBusquedad.data[0];
            //agregamos la llave del producto
            productoResultado.producto = resultadoBusquedad.data[0]._id;
            productoResultado.cantidad = 0;

            //lo ponemos en el state
            guardarProductos([...productos, productoResultado]);
    
        }else{
            //no hay resultados
            Swal.fire({
                icon: 'error',
                title: 'No hay resultados',
                text: 'No se encontraron esos resultados'
            })
        }
    }

    //almacenar  una busquedad en el state
    const leerDatosBusquedad = e=>{
        guardarBusquedad(e.target.value);
    }

    //actualizar la cantidad de producto
    const restarProducto = (i) =>{
        //copiar el arreglo origina
        const todosProducto = [...productos];

        //validamos  s esta en 0 no puede ir mas all
        if(todosProducto[i].cantidad === 0) return;

        todosProducto[i].cantidad--;
        todosProducto[i].total= todosProducto[i].precio*todosProducto[i].cantidad;

        //almacenamos en sl state
        guardarProductos(todosProducto);
    }

    const aumentarProducto = (i) =>{
        //hacemos una copia de todo los productos
        const todosProducto = [...productos];

        //hacemos el incremento
        todosProducto[i].cantidad++;
        todosProducto[i].total= todosProducto[i].precio*todosProducto[i].cantidad;


        //almacenamos en el state
        guardarProductos(todosProducto);   
    }
    //elimina el producto del state
    const eliminarProducto = id =>{
        const todosProductos  = productos.filter(producto => producto.producto !== id);
        guardarProductos(todosProductos);
    }   

    //actualizamos el pedido en la bd
    const realizarPedido = async e =>{
        e.preventDefault();

        //extramos el id
        const {id} = props.match.params;

        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        }
        //almacenarlo en la bd
        const res = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);
        
        //leemos el resultado
        if(res.status === 200){
            
            //todo bien
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: res.data.mensaje
            })
            props.history.push('/pedidos'); 
        }else{
            //alerta de error
            Swal.fire({
                icon: 'erorr',
                title: 'hubo un error',
                text: 'vuelva a intentarlo'
            })
        }
        
    }



    return ( 
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {nombre} {apellido}</p>
                <p>Telefono: {telefono}</p>
                <p>E-mail: {email}</p>
            </div>

            <FormBuscarProducto 
                buscarProducto={buscarProducto} 
                leerDatosBusquedad={leerDatosBusquedad}
            />

                <ul className="resumen">
                    {productos.map((producto, index)=>(
                        <FormCantidadProducto
                            key={producto.producto}
                            producto={producto}
                            restarProducto={restarProducto}
                            aumentarProducto={aumentarProducto}
                            index={index}
                            eliminarProducto={eliminarProducto}
                        />
                    ))}
                </ul>
                <p className="total">Total a pagar: <span> $ {total.toFixed(2)}</span> </p>

                { total > 0 ? (
                    <form onSubmit={realizarPedido} >
                        <input type="submit"
                              className="btn btn-verde btn-block"
                              value="Realizar Pedido" />
                    </form>
                ) : null }

                
        </Fragment>
     );
}
 
export default withRouter(NuevoPedido)