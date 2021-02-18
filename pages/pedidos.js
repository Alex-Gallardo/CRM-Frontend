import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'

import { gql, useQuery } from '@apollo/client'
import Pedido from '../components/Pedido'

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

const Pedidos = () => {

    const { loading, data, error } = useQuery(OBTENER_PEDIDOS)
    console.log('data PEdidos',data, loading, error)

    if (loading) return 'Cargando...'

    const { obtenerPedidosVendedor } = data

    return (
        <div>
            <Layout>
                <h1 className='text-2xl text-gray-800 font-light'>Pedidos</h1>
                <Link href='/nuevopedido'>
                    <a className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'>Nuevo pedido</a>
                </Link>
                {
                    obtenerPedidosVendedor.length === 0 ? (
                        <p className='mt-5 text-center text-2xl'>No hay pedidos aun</p>
                    ) : (
                            obtenerPedidosVendedor.map((pedido) => {
                                return <Pedido key={pedido.id} pedido={pedido} />
                            })
                        )
                }
            </Layout>
        </div>
    )
}

export default Pedidos