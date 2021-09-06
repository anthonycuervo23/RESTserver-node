module.exports = {
    // operation's method
    put: {
      tags: ["Users"], // operation's tag
      description: "Update user  info", // short desc
      summary: "Update user info",
      operationId: "updateUser", // unique operation id
      // security: [{
      //   bearerAuth: []
      // }],
      parameters: [
        // expected params
        {
          name: "id", // name of param
          in: "path", // location of param
          schema: {
            $ref: "#/components/schemas/id", // id model
          },
          required: true, // mandatory
          description: "ID of user to be updated", // short desc.
        },
      ],
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
        200: {
          description: "User updated successfully", // response desc.
        },
        // response code
        400: {
          description: "User not found", // response desc.
        },
        // response code
        500: {
          description: "Server error", // response desc.
        },
      },
    },
  };