module.exports = {
    // operation's method.
    delete: {
      tags: ["Categories"], // operation's tag
      description: "Removing a category", // short desc
      summary: "Remove category",
      operationId: "removeCategory", // unique operation id
      security: [{
        bearerAuth: []
    }],
      parameters: [
        // expected parameters
        {
          name: "id", // name of param
          in: "path", // location of param
          schema: {
            $ref: "#/components/schemas/id", // id model
          },
          required: true, // mandatory
          description: "the category ID", // param desc
        },
      ],
      // expected responses
      responses: {
        // response code
        200: {
          description: "Category Removed successfully", // response desc
        },
        // response code
        400: {
          description: "Category not found", // response desc
        },
        // response code
        500: {
          description: "Server error", // response desc
        },
      },
    },
  };