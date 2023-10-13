const success_response = ({ data, message = "success", statusCode = 200 }) => {
  const responseObject = {
    statusCode,
    body: { message, data },
  };
  return responseObject;
};

export default success_response;
