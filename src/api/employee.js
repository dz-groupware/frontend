import { axiosInstance } from "../utils/axiosInstance";

export const changeMasterYn = async ({ data, headers }) => {
  axiosInstance.defaults.headers['menuId'] = headers.pageId;
  return axiosInstance.patch(`/employees/master`, data)
  .then(response => response)
  .catch(error => { throw error; });
}