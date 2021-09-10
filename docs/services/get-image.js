module.exports = {
    get:{
        tags: ['Uploads'],
        description: "Get User/Product Image",
        summary: "Get User/Product Image",
        operationId: 'getImage',
        security: [{
            bearerAuth: []
        }],
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
                name: "id", // name of param
                in: "path", // location of param
                schema: {
                    $ref: "#/components/schemas/id",
                },
                required: true,
                description: "query to search"
            },
        ],
        responses:{
            '200':{
                description:"An image file",
                content:{
                    "multipart/form-data": {
                        schema: {
                          type: "object", // todo input data model
                          properties: {
                              file: {
                                  type: "string",
                                  format: "binary",
                                  example: 'https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg'
                              }
                          }
                        },
                      },
                }
            }
        }
    }
}