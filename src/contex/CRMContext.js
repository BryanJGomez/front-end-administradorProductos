import React, { useState } from 'react'

const CMRContext = React.createContext([{}, ()=>{}]);

const CRMProbaider = props => {
   // definir el state inicial
    const [auth, guardarAuth ] = useState({
        token: '',
        auth: false
    });

    return (
        <CMRContext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </CMRContext.Provider> 
    );
}

export { CMRContext, CRMProbaider };
