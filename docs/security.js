module.exports = {
    security: [{
        bearerAuth: [
            {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'x-auth-token',
                    scheme: 'bearer',
                    in: 'header',
                },
            },
        ]
    }
    ],
}