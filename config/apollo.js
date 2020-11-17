import { ApolloClient,  createHttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'node-fetch'
import {setContext} from 'apollo-link-context'

// Tiene la configuracion de hacia donde nos vamos a conectar para obtener los datos
const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
});

// Agegar nuestro token y pasarlo via headers
const authLink = setContext((_, {headers})=>{

    // Leer el storage almacenado
    const token = localStorage.getItem('token')

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client