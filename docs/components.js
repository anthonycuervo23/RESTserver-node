module.exports = {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          scheme: "bearer",
          in: "header",
          name: 'x-token',
          bearerFormat: "JWT"
        }
      },
      schemas: {
        // id model
        id: {
          type: "string", // data type
          description: "ID generated by MongoDB", // desc
          example: "612f99a3cd4f49e7bbaf256e", // example of an id
        },
        // todo model
        User: {
          type: "object", // data type
          properties: {
            id: {
              type: "string", // data-type
              description: "ID generated by MongoDB", // desc
              example: "612f99a3cd4f49e7bbaf256e", // example of an id
            },
            name: {
              type: "string", // data-type
              description: "The user name", // desc
              example: "John Doe", // example of a title
            },
            email: {
              type: "string", // data-type
              description: "The user email", // desc
              example: "johndoe@email.com", // example of a title
            },
            password: {
              type: "string", // data-type
              description: "The user password", // desc
              example: "123456", // example of a title
            },
            img: {
              type: "string", // data-type
              description: "The user profile img", // desc
              example: "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg", // example of a title
            },
            role: {
              type: "string", // data-type
              description: "The user role", // desc
              example: "USER_ROLE", // example of a title
            },
            status: {
              type: "boolean", // data type
              description: "The status of the user", // desc
              example: true, // example of a completed value
            },
            google: {
              type: "boolean", // data type
              description: "When user sign up with google", // desc
              example: true, // example of a completed value
            },
          },
        },
        // create new user model
        UserInput: {
          type: "object", // data type
          properties: {
            name: {
              type: "string", // data-type
              description: "The user name", // desc
              example: "John Doe", // example of a title
            },
            email: {
              type: "string", // data-type
              description: "The user email", // desc
              example: "johndoe@email.com", // example of a title
            },
            password: {
              type: "string", // data-type
              description: "The user password", // desc
              example: "123456", // example of a title
            },
          },
        },
        Category: {
          type: "object", // data type
          properties: {
            name: {
              type: "string", // data-type
              description: "The category name", // desc
              example: "Cookies", // example of a title
            },
            status: {
              type: "boolean", // data-type
              description: "The status of the category", // desc
              example: true, // example of a title
            },
            createdBy: {
              type: "object", // data-type
              properties: {
                name: {
                  type: "string",
                  description: "User who created the category",
                  example: "John Doe"
                },
                _id: {
                  type: "string",
                  description: "ID generated by MongoDB", // desc
                  example: "612f99a3cd4f49e7bbaf256e", // example of an id
                },
              },
            },
          },
        },
        // error model
        Error: {
          type: "object", //data type
          properties: {
            message: {
              type: "string", // data type
              description: "Error message", // desc
              example: "Not found", // example of an error message
            },
            internal_code: {
              type: "string", // data type
              description: "Error internal code", // desc
              example: "Invalid parameters", // example of an error internal code
            },
          },
        },
      },
    },
  };