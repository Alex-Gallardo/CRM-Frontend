import React, { useReducer } from 'react'

// PEDIDO CONTEXT
import PedidoContext from './PedidoContex'

// PEDIDO REDUCER
import PedidoReducer from './PedidoReducer'

// TYPES
import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTO
} from '../../types'

const PedidoState = ({ children }) => {

    // State de pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    // Modifica el cliente
    const agregarCliente = (cliente) => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    // Agregar los producto
    const agregarProducto = (producto)=>{
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: producto
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                agregarCliente,
                agregarProducto
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState