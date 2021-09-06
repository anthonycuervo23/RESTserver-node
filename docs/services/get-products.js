module.exports = {
    get:{
        tags: ['Products'],
        description: "Get products paginated",
        summary: "Get products paginated",
        operationId: 'getProducts',
        // security: [{
        //     bearerAuth: []
        // }],
        parameters:[
            {
                name: "limit", // name of param
                in: "query", // location of param
                schema: {
                    type: 'integer',
                    description: 'The number of products to return'
                }
            },
            {
                name: "from", // name of param
                in: "query", // location of param
                schema: {
                    type: 'integer',
                    description: 'The number of products to skip before starting to collect the result set'
                }
            }
        ],
        responses:{
            '200':{
                description:"Product were obtained",
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