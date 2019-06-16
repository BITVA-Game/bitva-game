function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.profiles;
    default: return app.profiles;
    }
}


exports.handle = handle;
