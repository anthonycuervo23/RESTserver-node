module.exports = {
    // operation's method.
    delete: {
      tags: ["Users"], // operation's tag
      description: "Deleting a user from DB", // short desc
      summary: "Delete user permanently from DB",
      operationId: "deleteUserDB", // unique operation id
      parameters: [
        // expected parameters
        {
          name: "id", // name of param
          in: "path", // location of param
          schema: {
            $ref: "#/components/schemas/id", // id model
          },
          required: true, // mandatory
          description: "Deleting a user permanently from DB", // param desc
        },
      ],
      // expected responses
      responses: {
        // response code
        200: {
          description: "User deleted successfully", // response desc
        },
        // response code
        400: {
          description: "User not found", // response desc
        },
        // response code
        500: {
          description: "Server error", // response desc
        },
      },
    },
  };