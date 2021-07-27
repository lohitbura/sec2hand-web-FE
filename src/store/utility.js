export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const header = () => {
  const token = localStorage.getItem("token");
  return {
    header: {
      Authorization: `Token ${token}`,
    },
  };
};
