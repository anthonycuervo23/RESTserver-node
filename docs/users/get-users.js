
module.exports = {
    get:{
        tags: ['Users'],
        description: "Get users paginated",
        summary: "Get users paginated",
        operationId: 'getUsers',
        parameters:[
            {
                name: "limit", // name of param
                in: "query", // location of param
                schema: {
                    type: 'integer',
                    description: 'The number of users to return'
                }
            },
            {
                name: "from", // name of param
                in: "query", // location of param
                schema: {
                    type: 'integer',
                    description: 'The number of users to skip before starting to collect the result set'
                }
            }
        ],
        responses:{
            '200':{
                description:"Users were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/User'
                        }
                    }
                }
            }
        }
    }
}