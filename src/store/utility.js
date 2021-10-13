export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const header = () => {
  const token = localStorage.getItem("token");
  const token_type = localStorage.getItem("token_type");
  return {
    headers: {
      Authorization: `${token_type === "bearer" ? "Bearer" : "Token"} ${token}`,
    },
  };
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token == null || token == " ") {
    return false;
  }
  return true;
};
