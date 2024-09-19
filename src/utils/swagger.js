const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Book API',
        version: '1.0.0',
        description: 'A simple CRUD API application for books',
      },
      servers: [
        {
          url: 'http://localhost:8000/api/v1',
        },
      ],
      components: {
        schemas: {
          Book: {
            type: 'object',
            required: ['code', 'title', 'author', 'stock'],
            properties: {
              id: {
                type: 'string',
                description: 'The auto-generated id of the book',
              },
              code: {
                type: 'string',
                description: 'The code of the book',
              },
              title: {
                type: 'string',
                description: 'The title of the book',
              },
              author: {
                type: 'string',
                description: 'The author of the book',
              },
              stock: {
                type: 'integer',
                description: 'The stock of the book',
              },
            },
          },
          Member: {
            type: 'object',
            required: ['name', 'email'],
            properties: {
              id: {
                type: 'string',
                description: 'The auto-generated id of the member',
              },
              code: {
                type: 'string',
                description: 'The code of the member',
              },
              name: {
                type: 'string',
                description: 'The name of the member',
              },
            },
          },
          Borrow: {
            type: 'object',
            required: ['code'],
            properties: {
              code: {
                type: 'string',
                description: 'The code book for borrow',
              },
            },
          }
        },
      },
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
  };
  
  const specs = swaggerJsdoc(options);
  
  module.exports = { swaggerUi, specs };