export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const header = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Token ${token}`,
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
