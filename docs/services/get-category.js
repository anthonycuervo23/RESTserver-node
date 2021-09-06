module.exports = {
    get:{
        tags: ['Categories'],
        description: "Get category by ID",
        summary: "Get category by ID",
        operationId: 'getCategory',
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
                description: "ID of category to update"
            },
        ],
        responses:{
            '200':{
                description:"Category was obtained",
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