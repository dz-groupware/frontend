import { axiosInstance } from '../utils/axiosInstance';

export function basicInfoApi(empId){
  return axiosInstance.get(`/home`, {
    headers: {
      "Content-Type": "application/json",
      "menuId" : "0",
    }
  });
}

export function searchMenuListAPI(menuId) {
  if (menuId) {
    return axiosInstance.get(`/menu/lnb`, {
      params: {
        menuId,
      }, 
      headers: {
        "Content-Type": "application/json",
        "menuId" : menuId,
      }
    });
  }
}


export function GnbFavorDeleteApi(menuId){  
  if (menuId !== undefined && menuId !== null){
    return axiosInstance.delete(`/menu/favor`, {
      params: {
        menuId
      }, 
      headers: {
        "Content-Type": "application/json",
        "menuId" : "0"
      }
    });
  };
}

export function GnbFavorApi(){  
  return axiosInstance.get(`/menu/favor`, {
    headers: {
      "Content-Type": "application/json",
      'menuId' : "0"
    }
  });
}

// *


export function GnbMenuApi(pageId){    
  return axiosInstance.get(
    `/menu/gnb`, {
      headers: {
      'menuId' : pageId
    }}
  )
}




export function profileAPI(pageId){  
  return axiosInstance.get(
    `/modal/profile`, {
      headers: {
      'menuId' : pageId
    }}
  )
}
