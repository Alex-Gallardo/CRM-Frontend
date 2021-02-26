import React, { useEffect } from 'react';
// LAYOUT
import Layout from '../components/Layout'
// BARCHART
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// GRAPHQL
import { gql, useQuery } from '@apollo/client'

// MEJORES VENDEDORES
const MEJORES_VENDEDORES = gql`
    query mejoresVendedores {
        mejoresVendedores {
            vendedor {
                nombre
                email
            }
            total
        }
    }
`

const MejoresVendedores = () => {

    // QUERY
    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES)

    // FUNCIONALIDAD EN TIEMPO REAL
    useEffect(() => {

        // INICIAR: Cuando halla un cambio en la base de datos despues de 1s hace una consulta
        startPolling(1000)

        // TERMINAR
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if (loading) return 'Cargando...'

    const { mejoresVendedores } = data

    const vendedorGrafica = []

    mejoresVendedores.map((vendedor, index) => {
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    })

    return (
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Mejores Vendedores</h1>

            <ResponsiveContainer
                width={'99%'}
                height={550}
            >
                <BarChart
                    className='mt-10'
                    width={700}
                    height={500}
                    data={vendedorGrafica}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182ce" />
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    );
}

export default MejoresVendedores;