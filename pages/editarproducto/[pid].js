import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const OBTENER_PRODUCTO = gql`
    query obtenerProductoId( $id: ID! ){
        obtenerProductoId( id: $id ){
            nombre
            precio
            existencias
        }
    }
`

const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto( $id: ID!, $input: ProductoInput ){
        actualizarProducto( id: $id, input: $input ){
            id
            nombre
        }
    }
`

const EditarProducto = () => {

    // Router de next
    const router = useRouter()
    // Extraer el id que viene en el pathname (query: id)
    const { query: { id } } = router
    console.log('ID del producto', id)
    

    // Consultar para obtener el producto
    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, { variables: { id } })
    console.log(error)

    // Mutation para modificar el producto
    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)

    // Schema de validacion
    const schemaValidacion = Yup.object({
        nombre: Yup.string().required('El nombre del producto es obligatorio'),
        existencias: Yup.number().required('Agrega la cantidad disponible').positive('No se aceptan numeros negativos').integer('La existencia debe ser numeros enteros'),
        precio: Yup.number().required('El precio es obligatorio').positive('No se aceptan numeros negativos')
    })

    if (loading) return 'Cargando...'

    if (!data) return 'Accion no permitida'

    // Obterner los productos que vienen de la consulta
    const { obtenerProductoId } = data

    // Actualizar info producto
    const actualizarInfoProducto = async (valores) => {
        const { nombre, existencias, precio } = valores
        try {
            await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre,
                        existencias,
                        precio
                    }
                }
            })

            // Redirigir hacia productos
            router.push('/productos')

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se actualizo correctamente',
                'success'
            )

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <h1 className='text-2xl text-gray-800'>Editar producto</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik
                        initialValues={obtenerProductoId}
                        enableReinitialize
                        validationSchema={schemaValidacion}
                        onSubmit={valores => {
                            actualizarInfoProducto(valores)
                        }}
                    >
                        {props => {
                            return (


                                <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                                    onSubmit={props.handleSubmit}
                                >
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>Nombre</label>
                                        <input
                                            id='nombre'
                                            type='text'
                                            placeholder='Nombre producto'
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.nombre}
                                        />
                                    </div>
                                    {props.touched.nombre && props.errors.nombre ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.nombre}</p>
                                        </div>
                                    ) : null}
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existencias'>Cantidad disponible</label>
                                        <input
                                            id='existencias'
                                            type='number'
                                            placeholder='Cantidad disponible'
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.existencias}
                                        />
                                    </div>
                                    {props.touched.existencias && props.errors.existencias ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.existencias}</p>
                                        </div>
                                    ) : null}
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>Precio</label>
                                        <input
                                            id='precio'
                                            type='number'
                                            placeholder='Precio producto'
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.precio}
                                        />
                                    </div>
                                    {props.touched.precio && props.errors.precio ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{props.errors.precio}</p>
                                        </div>
                                    ) : null}
                                    <input type='submit' className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900' value='Guardar cambios' />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
}

export default EditarProducto;