module.exports = {
    post:{
        tags: ['Uploads'],
        description: "Upload File",
        summary: "Upload File",
        operationId: 'uploadFile',
        security: [{
            bearerAuth: []
        }],
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
                description:"File was uploaded",
                content:{
                    'application/json':{
                        schema:{
                            type: 'string',
                            description: 'url for the file uploaded'
                        }
                    }
                }
            }
        }
    }
}