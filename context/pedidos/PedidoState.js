import React, { useReducer } from 'react'

// PEDIDO CONTEXT
import PedidoContext from './PedidoContex'

// PEDIDO REDUCER
import PedidoReducer from './PedidoReducer'

// TYPES
import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTO,
    ACTUALIZAR_TOTAL
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
    const agregarProducto = (productosSeleccionados)=>{

        // Solucionar problema de reescritura de productos
        let newState;

        if(state.productos.length > 0){
            // Tomar del segundo arreglo una copia para asignarlo al primero
            newState = productosSeleccionados.map(producto => {
                const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id)
                return {...producto, ...nuevoObjeto}
            })

        }else{
            newState = productosSeleccionados
        }

        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: newState
        })
    }

    // Modifica las cantidades de los productos
    const cantidadProductos = nuevoProducto =>{
        dispatch({
            type: CANTIDAD_PRODUCTO,
            payload: nuevoProducto
        })
    }

    // Actualizar total
    const actualizarTotal = ()=>{
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                agregarCliente,
                agregarProducto,
                cantidadProductos,
                actualizarTotal,
            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState