
var io = require('socket.io');
var count = 0;
const selfName = process.env.name;
const connect_redis = process.env.connect_redis;
const redis_port = process.env.redis_port;
const adapter = require('socket.io-redis')({host: connect_redis, port: redis_port});
module.exports = (server, option) => {
    option = option || {};
    const ws = io(server, option);
    ws.adapter(adapter);
    ws.origins('*:*')
    console.log('web socket is running', `Redis ${connect_redis}:${redis_port}`);
    ws.on('connection', (socket) => {
      socket.emit('Init_Ack', { status: 'INIT', from:  selfName});
      socket.emit('login success', {
        id: `${selfName}:${++count}`
      });
      socket.on('dologin', (data) => {
        socket.user_info = data;
        socket.broadcast.emit('user joined', socket.user_info);
      });
      socket.on('disconnect', (socket) => {
        ws.broadcast.emit('user leave', {info: socket.user_info, current: --count});
      });
    });
    return ws;
};