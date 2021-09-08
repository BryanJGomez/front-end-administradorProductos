import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Producto from "./Producto";
import Spiner from "../layout/Spiner";
import { CMRContext } from "../../contex/CRMContext";

function Productos(props) {
  //productos = state, guardarProductos = funcion para guardar el state
  const [productos, guardarProductos] = useState([]);

  //utilizamos los valores del context
  const [auth, guardarAuth] = useContext(CMRContext);
  console.log(auth.token);

  //use effect para consultar la API
  useEffect(() => {
    if (auth.token !== "") {
      //query a la API
      const consultarAPI = async () => {
        try {
          const productoConsulta = await clienteAxios.get("/productos", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          guardarProductos(productoConsulta.data);
        } catch (error) {
          if (error.response.status === 500) {
            props.history.push("/iniciar-sesion");
          }
        }
      };

      consultarAPI();
    } else {
      props.history.push("/iniciar-sesion");
    }
  }, [productos]);

  if (!auth.auth) {
    props.history.push("/iniciar-sesion");
  }

  //spiner de carga
  if (!productos.length) return <Spiner />;

  return (
    <Fragment>
      <h2>Productos</h2>
      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </ul>
    </Fragment>
  );
}

export default Productos;
