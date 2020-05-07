const io = require('socket.io-client');

for (let i = 0; i < 10; i++) {
    const name = `S_${i + 1}`;
    const socket = io('http://api.kmn.tw', {
        path: '/socket.io',
        transports: ['websocket'],
        autoConnect: true,
        query: `auth_token=123a456`
    });
    socket.on('Init_Ack', (data) => {
        console.log(data);
        socket.emit('dologin', { name });
    });
    
    socket.on('hello_ack', msg => {
        console.log(msg);
    });

    socket.on('disconnect', (msg) => {
        console.log('disconnect', name);
    })

    socket.on('user joined', data => {
        console.log(name,'user joined', data);
    });

    socket.on('user leave', data => {
        console.log(name,'user leave', data);
    });

    socket.on('login success', data => {
        console.log(name, 'login success',data);
    });

    socket.on('connect_error', (error) => {
        console.error(`Connection error: ${error}`);
    });
}