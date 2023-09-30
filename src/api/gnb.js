import { axiosInstance } from '../utils/axiosInstance';

function header(pageId){
  return {
    headers: {
      'menuId' : pageId
    }
  };
}

export function GnbMenuApi(pageId){    
  return axiosInstance.get(
    `/menu/gnb`, header(pageId)
  )
}

export function GnbFavorApi(pageId){  
  return axiosInstance.get(
    `/menu/favor`, header(pageId)
  )
}

export function GnbFavorDeleteApi(pageId, menuId){  
  if (menuId !== undefined && menuId !== null){
    return axiosInstance.delete(
      `/menu/favor`,{
        params: {
          menuId
        }
      }, header(pageId)
    )
  }
}

export function profileAPI(pageId){  
  return axiosInstance.get(
    `/modal/profile`, header(pageId)
  )
}



export function searchMenuListAPI(pageId, menuId, compId) {
  if(menuId !== undefined && menuId !== null && compId !== undefined && compId !== null) {
      return axiosInstance.get(
          `/menu/lnb`,{
              params: {
                  menuId,
                  compId
              }
          }, header(pageId)
      )
  }
}

export function basicInfoApi(empId, pageId){
  if(empId !== undefined && empId !== null){
    return axiosInstance.get(`/home`, header(pageId));
  }
}
