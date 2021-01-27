import React, { useState, useEffect, useContext } from 'react'

// REACT SELECT
import Select from 'react-select'

// APOLLO Y GRAPHQL
import { gql, useQuery } from '@apollo/client'

// CONTEXT
import PedidoContext from '../../context/pedidos/PedidoContex'

const OBTENER_CLIENTES_USUARIOS = gql`
    query obtenerClientesVendedor {
        obtenerClientesVendedor {
            id
            nombre
            apellido
            empresa
            email
        }
    }
`

const AsignarCliente = () => {

    const [cliente, setCliente] = useState([])

    // Consultar la base de datos
    const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIOS)

    // Context de pedidos
    const pedidoContext = useContext(PedidoContext)
    const { agregarCliente } = pedidoContext

    useEffect(() => {
        // Cuando cambia el valor de cliente, lo pasamos atravez del context
        agregarCliente(cliente)
    }, [cliente])

    const seleccionarCliente = inputCliente => setCliente(inputCliente)

    // Resultados de la consulta
    if (loading) return null

    const { obtenerClientesVendedor } = data


    return (
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>1.- Asigna un cliente al pedido</p>
            <Select
                className='mt-3'
                options={obtenerClientesVendedor}
                onChange={seleccionarCliente}
                getOptionValue={clientes => clientes.id}
                getOptionLabel={clientes => clientes.nombre}
                placeholder='Selecciona un cliente'
                noOptionsMessage={() => 'No hay resultados'}
            />
        </>
    );
}

export default AsignarCliente;