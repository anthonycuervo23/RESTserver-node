module.exports = {
    // operation's method
    post: {
      tags: ["Categories"], // operation's tag
      description: "Create new category", // short desc
      summary: "Create new category",
      operationId: "createCategory", // unique operation id
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
              $ref: "#/components/schemas/CategoryInput", // todo input data model
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        201: {
          description: "Category created successfully", // response desc
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