import socket from './socket-ioConn';

export const socketConnChat = () => {
    socket.emit('chat', {
        message: true
    });
}

export const socketConnID = (_id, update) => {
    socket.emit('idUpdate', {
        id: _id,
        message: true,
        updateOrNew: update
    });
}

export const socketConnRullakko = () => {
    socket.emit('rullakotUpdt', {
        message: true
    });
}