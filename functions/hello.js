exports.handler = function(event, context) {
    console.log(JSON.stringify(event),JSON.stringify(context) )
    const name = event.queryStringParameters.name || "World";
    return {
        statusCode: 200,
        body: `Hello, ${name}`
      };
  };