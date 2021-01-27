import React, {useContext} from 'react';
import Layout from '../components/Layout'

// ASIGNAR CLIENTE
import AsignarCliente from '../components/pedidos/AsignarCliente'
import AsignarProductos from '../components/pedidos/AsignarProductos';

// CONTEXT DE PEDIDOS
import PedidoContext from '../context/pedidos/PedidoContex'

const NuevoPedido = () => {

    // Utilizat contex y extraer sus valores
    const pedidoContext = useContext(PedidoContext)
    

    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Crear nuevo pedido</h1>
            <AsignarCliente/>
            <AsignarProductos/>
        </Layout>
    );
}

export default NuevoPedido;