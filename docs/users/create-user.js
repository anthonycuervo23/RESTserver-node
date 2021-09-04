module.exports = {
    // operation's method
    post: {
      tags: ["Users"], // operation's tag
      description: "Create new user", // short desc
      summary: "Create new user",
      operationId: "createUser", // unique operation id
      // security: [{
      //   bearerAuth: []
      // }],
      parameters: [], // expected params
      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserInput", // todo input data model
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        201: {
          description: "User created successfully", // response desc
        },
        // response code
        500: {
          description: "Server error", // response desc
        },
      },
    },
  };