import React, { useContext } from 'react';

// CONTEXT
import PedidoContext from '../../context/pedidos/PedidoContex';

// PRODUCTO RESUMEN
import ProductoResumen from './ProductoResumen';


const ResumenPedido = () => {

    // CONTEXT
    const pedidoContext = useContext(PedidoContext)
    const { productos } = pedidoContext

    return (
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Ajusta las cantidades del producto</p>
            {productos.length > 0 ?
                productos.map((product) =>
                    <ProductoResumen key={product.id} producto={product} />
                )
                : <p className='mt-5 text-sm'>Aun no hay productos</p>}
        </>
    );
}

export default ResumenPedido;