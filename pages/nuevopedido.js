import React, { useContext } from 'react';
import Layout from '../components/Layout'

// ASIGNAR CLIENTE
import AsignarCliente from '../components/pedidos/AsignarCliente'
// ASIGNAR PRODUCTOS
import AsignarProductos from '../components/pedidos/AsignarProductos';
// RESUMEN DEL PEDIDO
import ResumenPedido from '../components/pedidos/ResumenPedido';
// TOTAL DEL PEDIDO
import Total from '../components/pedidos/Total';

// CONTEXT DE PEDIDOS
import PedidoContext from '../context/pedidos/PedidoContex'

const NuevoPedido = () => {

    // Utilizat contex y extraer sus valores
    const pedidoContext = useContext(PedidoContext)
    const { cliente, productos, total } = pedidoContext

    const validarPedido = () => {
        // every: itera en todos los productos segun la condicion
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0? ' opacity-50 cursor-not-allowed ' : ''
    }

    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Crear nuevo pedido</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />
                    <button
                        type='button'
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                    >Registrar pedido</button>
                </div>
            </div>
        </Layout>
    );
}

export default NuevoPedido;