function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.profile;
    default: return app.profile;
    }
}


exports.handle = handle;
