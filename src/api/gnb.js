import { axiosInstance } from '../utils/axiosInstance';

export function GnbMenuApi(){    
  return axiosInstance.get(
    `/menu/gnb`
  )
}

export function GnbFavorApi(){  
  return axiosInstance.get(
    `/menu/favor`
  )
}

export function GnbFavorDeleteApi(menuId){  
  if (menuId !== undefined && menuId !== null){
    return axiosInstance.delete(
      `/menu/favor`,{
        params: {
          menuId
        }
      }
    )
  }
}

export function profileAPI(){  
  return axiosInstance.get(
    `/modal/profile`
  )
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
