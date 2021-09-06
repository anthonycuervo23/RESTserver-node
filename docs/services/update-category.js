module.exports = {
    put:{
        tags: ['Categories'],
        description: "Update category by ID",
        summary: "Update category by ID",
        operationId: 'updateCategory',
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
                description: "ID of category to update"
            },
        ],
        requestBody: {
            // expected request body
            content: {
              // content-type
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CategoryInput", // todo input data model
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
                            $ref:'#/components/schemas/Category'
                        }
                    }
                }
            }
        }
    }
}