module.exports = {
    get:{
        tags: ['Search'],
        description: "Search a User, Product or Category",
        summary: "Search a User, Product or Category by ID, Email or Name",
        operationId: 'search',
        // security: [{
        //     bearerAuth: []
        // }],
        parameters:[
            {
                name: "collection", // name of param
                in: "path", // location of param
                schema: {
                    type: 'string',
                    description: 'The collection to search'
                },
                required: true,
                description: "collection to search"
            },
            {
                name: "query", // name of param
                in: "path", // location of param
                schema: {
                    type: 'string',
                    description: 'The query to search'
                },
                required: true,
                description: "query to search"
            },
        ],
        responses:{
            '200':{
                description:"User/Product/Category was obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Product'
                        }
                    }
                }
            }
        }
    }
}