function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.game;
    default: return app.game;
    }
}

exports.handle = handle;
