exports.handler = function(event, context, callback) {
    console.log(JSON.stringify(event),JSON.stringify(context) )
    const name = event.queryStringParameters.name || "World";
    callback(null, {
      statusCode: 2000,
      body: "Hello, World"
    });
    return {
        statusCode: 200,
        body: `Hello, ${name}`
      };
  };