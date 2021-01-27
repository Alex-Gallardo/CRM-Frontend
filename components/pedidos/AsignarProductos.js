import React, { useState, useEffect, useContext } from 'react'

// REACT SELECT
import Select from 'react-select'

// APOLLO Y GRAPHQL
import { gql, useQuery } from '@apollo/client'

// CONTEXT
import PedidoContext from '../../context/pedidos/PedidoContex'

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            existencias
            precio
            creado   
        }
    }
`

const AsignarProductos = () => {

    // Stado de productos
    const [productos, setProductos] = useState([])

    // Context de pedidos
    const pedidoContext = useContext(PedidoContext)
    const { agregarProducto } = pedidoContext

    // Consulta a la base de datos
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)

    useEffect(() => {
        agregarProducto(productos)
    }, [productos])

    // Funcion que ejecuta el ueEffect
    const seleccionarProducto = inputProductos =>{
        console.log('Productos seteados', inputProductos)
        setProductos(inputProductos)}

    if (loading) return null

    const { obtenerProductos } = data


    return (<>
        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Selecciona los porductos</p>
        <Select
            className='mt-3'
            options={obtenerProductos}
            onChange={seleccionarProducto}
            getOptionValue={producto => producto.id}
            getOptionLabel={producto => `${producto.nombre} - ${producto.existencias} unidades`}
            placeholder='Selecciona uno o varios productos'
            isMulti={true}
            noOptionsMessage={() => 'No hay resultados'}
        />
    </>);
}

export default AsignarProductos;