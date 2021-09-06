module.exports = {
    get:{
        tags: ['Categories'],
        description: "Get categories paginated",
        summary: "Get categories paginated",
        operationId: 'getCategories',
        // security: [{
        //     bearerAuth: []
        // }],
        parameters:[
            {
                name: "limit", // name of param
                in: "query", // location of param
                schema: {
                    type: 'integer',
                    description: 'The number of categories to return'
                }
            },
            {
                name: "from", // name of param
                in: "query", // location of param
                schema: {
                    type: 'integer',
                    description: 'The number of categories to skip before starting to collect the result set'
                }
            }
        ],
        responses:{
            '200':{
                description:"Categories were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Category'
                        }
                    }
                }
            }
        }
    }
}