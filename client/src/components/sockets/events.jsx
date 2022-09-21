import { socket } from './index'

export const socketEvents = ({ setValue }) => {

    // we are using setValue to update the state which belongs to the context provider
    socket.on('queueLength', ({ queueLength }) => {
        setValue(state => { return {...state, queueLength}})
    })

    socket.on('positionInLine', ({ positionInLine }) => {
        setValue(state => { return {...state, positionInLine}})
    })
}