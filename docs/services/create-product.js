module.exports = {
    // operation's method
    post: {
      tags: ["Products"], // operation's tag
      description: "Create new product", // short desc
      summary: "Create new product",
      operationId: "createProduct", // unique operation id
      security: [{
        bearerAuth: []
      }],
      parameters: [], // expected params
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
      // expected responses
      responses: {
        // response code
        201: {
          description: "Product created successfully", // response desc
        },
        //response code
        401: {
            description: "Not Authorized", // response desc
          },
        // response code
        500: {
          description: "Server error", // response desc
        },
      },
    },
  };