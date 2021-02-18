import React, { useContext, useState } from 'react';

// CONTEXT DE PEDIDOS
import PedidoContext from '../context/pedidos/PedidoContex'

// APOLLO GQL
import { gql, useMutation } from '@apollo/client'

// RUTAS NEXT
import { useRouter } from 'next/router'

// LAYOUT COMPONENT
import Layout from '../components/Layout'

// ASIGNAR CLIENTE
import AsignarCliente from '../components/pedidos/AsignarCliente'
// ASIGNAR PRODUCTOS
import AsignarProductos from '../components/pedidos/AsignarProductos';
// RESUMEN DEL PEDIDO
import ResumenPedido from '../components/pedidos/ResumenPedido';
// TOTAL DEL PEDIDO
import Total from '../components/pedidos/Total';

// ALERT
import Swal from 'sweetalert2'

const NUEVO_PEDIDO = gql`
    mutation nuevoPedido( $input: PedidoInput ) {
        nuevoPedido( input: $input ) {
            id
        }
    }
`

// CONSULTA PADRE PARA CACHE
const OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor {
        obtenerPedidosVendedor {
            id
            pedido {
                id
                cantidad
                nombre
            }
            cliente {
                id 
                nombre 
                apellido 
                empresa 
                email 
                telefono 
                vendedor 
            }
            vendedor
            total
            estado
        }
    }
`

const NuevoPedido = () => {

    // Estate
    const [mensaje, setMensaje] = useState(null)

    // Utilizat contex y extraer sus valores
    const pedidoContext = useContext(PedidoContext)
    const { cliente, productos, total } = pedidoContext

    // Mutation para crear un nuevo pedido
    const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
        update(cache, { data: { nuevoPedido } }) {
            const { obtenerPedidosVendedor } = cache.readQuery({
                query: OBTENER_PEDIDOS
            })

            // Reescribir en el cache
            cache.writeQuery({
                query: OBTENER_PEDIDOS,
                data: {
                    obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido]
                }
            })
        }
    })

    // Rutas
    const router = useRouter()

    const validarPedido = () => {
        // every: itera en todos los productos segun la condicion
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? ' opacity-50 cursor-not-allowed ' : ''
    }

    // Crear un nuevo pedido
    const crearNuevoPedido = async () => {

        const { id } = cliente

        // Remover lo no deseado de productos
        const pedido = productos.map(({ __typename, existencias, creado, ...producto }) => producto)
        console.log('Pedido', pedido)

        try {
            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: id,
                        total,
                        pedido
                    }
                }
            })

            // Redireccionar 
            router.push('/pedidos')

            // Mostrar alerta
            Swal.fire(
                'Correcto',
                'El pedido se registro correctamente',
                'success'
            )

        } catch (error) {
            setMensaje(error.message.replace('GraphQL error: ', ''))

            // Borrar el mensaje despues de 3 segundos
            setTimeout(() => {
                setMensaje(null)
            }, 300)
        }
    }

    const mostrarMensaje = () => {
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Crear nuevo pedido</h1>

            {mensaje && mostrarMensaje()}

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />
                    <button
                        type='button'
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                        onClick={crearNuevoPedido}
                    >Registrar pedido</button>
                </div>
            </div>
        </Layout>
    );
}

export default NuevoPedido;