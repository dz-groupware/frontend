import { axiosInstance } from '../utils/axiosInstance';

export function GnbMenuApi(empId){    
    if (empId !== undefined){
        return axiosInstance.get(
            `/menu/gnb`,{
                params: {
                    empId
                }
            }
        )
    }
}

export function GnbFavorApi(empId){  
    if (empId !== undefined){
        return axiosInstance.get(
            `/menu/favor`,{
                params: {
                    empId
                }
            }
        )
    }
}

export function GnbFavorDeleteApi(empId, menuId){  
  if (empId !== undefined && menuId !== undefined && empId !== null && menuId !== null){
      return axiosInstance.delete(
          `/menu/favor`,{
              params: {
                  empId,
                  menuId
              }
          }
      )
  }
}

export function profileAPI(empId){  
  if (empId !== undefined && empId !== null){
      return axiosInstance.get(
          `/modal/profile`,{
              params: {
                  empId,
              }
          }
      )
  } else {
      return Promise.reject(new Error("Invalid parameters"));
  }
}



export function searchMenuListAPI(menuId, compId) {
  if(menuId !== undefined && menuId !== null && compId !== undefined && compId !== null) {
      return axiosInstance.get(
          `/menu/lnb`,{
              params: {
                  menuId,
                  compId
              }
          }
      )
  }
}

export function basicInfoApi(empId){
if(empId !== undefined && empId !== null){
  return axiosInstance.get(`/home`);
}
}
