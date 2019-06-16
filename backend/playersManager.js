function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.players;
    default: return app.players;
    }
}


exports.handle = handle;
