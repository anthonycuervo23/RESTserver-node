module.exports = {
    get:{
        tags: ['Products'],
        description: "Get product by ID",
        summary: "Get product by ID",
        operationId: 'getProduct',
        // security: [{
        //     bearerAuth: []
        // }],
        parameters:[
            {
                name: "id", // name of param
                in: "path", // location of param
                schema: {
                    $ref: "#/components/schemas/id",
                },
                required: true,
                description: "ID of product to update"
            },
        ],
        responses:{
            '200':{
                description:"Product was obtained",
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