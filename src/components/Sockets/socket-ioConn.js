import socketIOClient from "socket.io-client";

let SOCKET_URL = "http://localhost:3002/"

let params = {};

export const userDataGrabber = (result) => {
    console.log(result)
    params = {
        query: 'token=' + result.token,
        forceNew: true,
        secure: true
    }
    window.location.reload();
};

if (sessionStorage.getItem('token') !== null) {
    params = {
        query: 'token=' + sessionStorage.getItem('token'),
        forceNew: true,
        secure: true
    }
}

const endpoint = SOCKET_URL;
const socket = socketIOClient(endpoint, params);

export default socket;
