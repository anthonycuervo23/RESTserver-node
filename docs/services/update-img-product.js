module.exports = {
    put:{
        tags: ['Uploads'],
        description: "Update image product",
        summary: "Update image product",
        operationId: 'updateImgProduct',
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
              "multipart/form-data": {
                schema: {
                  type: "object", // todo input data model
                  properties: {
                      file: {
                          type: "string",
                          format: "binary"
                      }
                  }
                },
              },
            },
          },
          responses:{
            '200':{
                description:"Imagen was updated successfully",
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