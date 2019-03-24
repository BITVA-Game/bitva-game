const ioClient = require('socket.io-client');
const http = require('http').Server();
const ioHost = require('socket.io');


let socket;
let httpServer;
let httpServerAddr;
let ioServer;

beforeAll((done) => {
    httpServer = http.listen();
    httpServerAddr = httpServer.address();
    ioServer = ioHost(httpServer);
    done();
});


afterAll((done) => {
    ioServer.close();
    httpServer.close();
    done();
});


beforeEach((done) => {
    // Setup
    // Do not hardcode server port and address, square brackets are used for IPv6
    socket = ioClient.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
        transports: ['websocket'],
    });
    socket.on('connect', () => {
        done();
    });
});


afterEach((done) => {
    // Cleanup
    if (socket.connected) {
        socket.disconnect();
    }
    done();
});
