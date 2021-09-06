module.exports = {
    put:{
        tags: ['Products'],
        description: "Update product by ID",
        summary: "Update product by ID",
        operationId: 'updateProduct',
        security: [{
            bearerAuth: []
        }],
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
        requestBody: {
            // expected request body
            content: {
              // content-type
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProductInput", // todo input data model
                },
              },
            },
          },
        responses:{
            '200':{
                description:"Category was obtained",
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