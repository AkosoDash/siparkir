const success_response = ({ data, message = "success", statusCode = 200 }) => {
  const response_object = {
    statusCode,
    body: { message, data },
  };
  return response_object;
};

export default success_response;
