import React from 'react';
import { useQuery, gql} from '@apollo/client'
import { useRouter } from 'next/router'

const OBTENER_USUARIO = gql`
    query obtenerUsuario {
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;

const Header = () => {

    // Queru apollo
    const {data, loading, error} = useQuery(OBTENER_USUARIO);

    // Proteger de que no accedamos a data antes de no tener resultados
    if(loading) return 'Cargando...'

    // Si no hay informacion
    if(!data){
        return router.push('/login')
    }
    const {nombre, apellido } = data.obtenerUsuario

    // Routing de next 
    const router = useRouter();

    // Cerrar sesion
    const cerrarSesion = ()=>{
        localStorage.removeItem('token');
        router.push('/login')
    }

    return (
        <div className='flex justify-between mb-4'>
            <p className='mr-2'>Hola {nombre} {apellido}</p>
            <button 
                onClick={()=> cerrarSesion()}
                type='button' 
                className='bg-blue-800 w-full sm:w-auto uppercase text-xs rounded py-1 px-2 text-white shadow-md'>
                Cerrar sesion
            </button>
        </div> 
     );
}
 
export default Header;