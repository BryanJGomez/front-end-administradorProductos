import React from 'react'

const FormCantidadProducto = (props) => {
    const {nombre, _id,  precio, cantidad} = props.producto
    const { index, aumentarProducto, restarProducto, eliminarProducto} = props;
    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">${precio}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i onClick={()=> restarProducto(index)} className="fas fa-minus">
                        
                    </i>

                    <p>{cantidad}</p>

                    <i onClick={()=> aumentarProducto(index)} className="fas fa-plus">

                    </i>
                </div>
                <button onClick={()=> eliminarProducto(_id)}
                 type="button"
                  className="btn btn-rojo"
                  >
                    <i className="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
            </div>
       </li>
    );
}
 
export default FormCantidadProducto;