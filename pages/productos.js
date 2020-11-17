import Head from 'next/head'
import Layout from '../components/Layout'

// TIENE QUE TENER PARENTESIS SI NO, NO RENDERIZA
const Productos = () => (
    <div>
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Productos</h1>
        </Layout>
    </div>
)

export default Productos