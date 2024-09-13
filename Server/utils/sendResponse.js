const sendResponse = (res, message, data, redirectURL, key) => {
  res.status(200).json({
    success: true,
    message: message,
    data: data,
    redirectURL: redirectURL,
    key: key,
  });
};

export default sendResponse;
