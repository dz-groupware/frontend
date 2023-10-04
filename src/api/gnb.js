import { axiosInstance } from '../utils/axiosInstance';

function header(pageId){
  return {
    headers: {
      'menuId' : pageId
    }
  };
}


export function basicInfoApi(empId, pageId){
  if(empId !== undefined && empId !== null){
    return axiosInstance.get(`/home`, {
      headers: {
        "Content-Type": "application/json",
        'menuId' : pageId
    }});
  }
}


export function GnbFavorDeleteApi(pageId, menuId){  
  if (menuId !== undefined && menuId !== null){
    return axiosInstance.delete(
      `/menu/favor`,{
        params: {
          menuId
        }
      }, {
      headers: {
      "Content-Type": "application/json",
      'menuId' : pageId
    }});
  };
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

export function GnbFavorApi(pageId){  
  return axiosInstance.get(
    `/menu/favor`, {
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



export function searchMenuListAPI(pageId, menuId, compId) {
  if(menuId !== undefined && menuId !== null && compId !== undefined && compId !== null) {
    return axiosInstance.get(
      `/menu/lnb`,{
        params: {
          menuId,
          compId
        }, 
        headers: {
          "Content-Type": "application/json",
          'menuId' : pageId
    }});
  }
}
