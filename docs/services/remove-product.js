module.exports = {
    // operation's method.
    delete: {
      tags: ["Products"], // operation's tag
      description: "Removing a product", // short desc
      summary: "Remove product",
      operationId: "removeProduct", // unique operation id
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
          description: "the product ID", // param desc
        },
      ],
      // expected responses
      responses: {
        // response code
        200: {
          description: "Product Removed successfully", // response desc
        },
        // response code
        400: {
          description: "Product not found", // response desc
        },
        // response code
        500: {
          description: "Server error", // response desc
        },
      },
    },
  };