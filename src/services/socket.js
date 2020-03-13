import io from 'socket.io-client'
import Storage from './localStorage/localStorage'
let token = Storage.get()
export const socket = io('https://thawing-ravine-80499.herokuapp.com/', {
    query: token ? token.token : ""
})