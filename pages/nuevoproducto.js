import React from 'react';
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const NUEVO_PRODUCTO = gql`
    mutation nuevoProducto( $input: ProductoInput ) {
        nuevoProducto( input: $input ) {
            id
            nombre
            existencias
            precio
        }
    }
`

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

const NuevoProducto = () => {

    // Router
    const router = useRouter()

    // Mutation de apollo
    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
        update(cache, { data: { nuevoProducto } }) {
            // Obtener el objeto de cache
            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS })

            // Reescribir el objeto
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto]
                }
            })
        }
    })

    // Formulario para nuevos productos
    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencias: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre del producto es obligatorio'),
            existencias: Yup.number().required('Agrega la cantidad disponible').positive('No se aceptan numeros negativos').integer('La existencia debe ser numeros enteros'),
            precio: Yup.number().required('El precio es obligatorio').positive('No se aceptan numeros negativos')
        }),
        onSubmit: async (valores) => {
            try {

                const { nombre, existencias, precio } = valores

                const { data } = await nuevoProducto({
                    variables: {
                        input: {
                            nombre,
                            existencias,
                            precio
                        }
                    }
                })

                // Redireccionar hacia productos
                router.push('/productos')

                // Mostrar una alerta
                Swal.fire(
                    'Creado',
                    'El producto se creo correctamente',
                    'success'
                )

            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <Layout>
            <h1 className='text-2xl text-gray-800'>Crear nuevo producto</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                        onSubmit={formik.handleSubmit}
                    >
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>Nombre</label>
                            <input
                                id='nombre'
                                type='text'
                                placeholder='Nombre producto'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                            />
                        </div>
                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null}
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existencias'>Cantidad disponible</label>
                            <input
                                id='existencias'
                                type='number'
                                placeholder='Cantidad disponible'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.existencias}
                            />
                        </div>
                        {formik.touched.existencias && formik.errors.existencias ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.existencias}</p>
                            </div>
                        ) : null}
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>Precio</label>
                            <input
                                id='precio'
                                type='number'
                                placeholder='Precio producto'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.precio}
                            />
                        </div>
                        {formik.touched.precio && formik.errors.precio ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.precio}</p>
                            </div>
                        ) : null}
                        <input type='submit' className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900' value='Agregar nuevo producto' />
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default NuevoProducto;