function handle(app, message) {
    switch (message.type) {
    case 'PROFILE':
        return 'PROFILE';
    case 'PLAY':
        return 'PLAY';
    case 'NETWORKPLAY':
        return 'NETWORKPLAY';
    default: return app.manager;
    }
}


exports.handle = handle;
