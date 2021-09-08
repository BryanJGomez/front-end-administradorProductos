import React, {Fragment, useContext} from 'react';
/** Routing */
import{BrowserRouter as Router, Route, Switch} from'react-router-dom'

/** layout */
import Header from './components/layout/Headers';
import Navegacion from './components/layout/Navegacion';

/**Componentes */
import Clientes from './components/client/Clientes';
import NuevoCliente from './components/client/NuevoCliente';
import EditarCliente from './components/client/EditarCliente';

/**Productos */
import Productos from './components/productos/Productos';
import NuevoProducto from './components/productos/NuevoProducto.jsx';
import EditarProducto from './components/productos/EditarProducto.jsx';

/**Pedidos */
import pedidos from './components/pedidos/Pedidos';
import NuevoPedido from './components/pedidos/NuevoPedido';

/** LOGIM */
import Login from './components/auth/Login.jsx';

import {CRMProbaider, CMRContext} from './contex/CRMContext';

function App(){

  //utilizamos los context en los componentes
  const [auth, guardarAuth]=useContext(CMRContext);
  
    return(
      <Router>
        <Fragment> 
          <CRMProbaider value={[auth, guardarAuth]}>
              <Header />
              <div className="grid contenedor contenido-principal">
                <Navegacion/>
                <main className="caja-contenido col-9">
                  {/*TODO: routinf a los diferentes componentes */}
                  <Switch>
                    <Route exact path="/" component={Clientes}/>
                    <Route exact path="/clientes/nuevo" component={NuevoCliente}/>
                    <Route exact path="/clientes/editar/:id" component={EditarCliente}/>

                    <Route exact path="/productos" component={Productos}/>
                    <Route exact path="/productos/nuevo" component={NuevoProducto}/>
                    <Route exact path="/productos/editar/:id" component={EditarProducto}/>

                    <Route exact path="/pedidos" component={pedidos}/>
                    <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido}/>

                    <Route exact path="/iniciar-sesion" component={Login}/>
                    
                  </Switch>
                </main>
              </div>
            </CRMProbaider>
        </Fragment> 
      </Router>
    )
}


export default App;
