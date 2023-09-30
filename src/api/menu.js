import { axiosInstance } from '../utils/axiosInstance';

function header(pageId){
  return {
    headers: {
      'menuId' : pageId
    }
  };
}

export function GnbApi(pageId){
    return axiosInstance.get(
        `/setting/menu/gnb`, header(pageId)
    )
}
export function FavorApi(pageId, type, menuId){
  if (type === 'load') {
    console.log(typeof menuId);
      return axiosInstance.get(
          `/setting/favor`,{
              params: {
                  menuId
              }
          }, header(pageId)
      )
  }
  if (type === false) {
      return axiosInstance.delete(
          `/setting/favor`,{
              params: {
                  menuId
              }
          }, header(pageId)
      )
  }
  if (type === true) {
    return axiosInstance.post(
      `/setting/favor`,{
        menuId
      }, header(pageId)
    )
  }
  return JSON.parse('[{"":""}]');
}

export function searchAPI(pageId, formData) {
    return axiosInstance.get(
        `/setting/menu/search`,{
            params: {
                gnbName: `${formData.get("gnbName")}%`,
                name: `%${formData.get("name")}%`, 
            }
        }, header(pageId)
    )
}

export function saveMenuAPI(pageId, menu, type) {
  return axiosInstance.post(
    `/setting/menu?type=${type}`, menu, header(pageId)
  )
}

export function iconListAPI(pageId){
  return axiosInstance.get(
      `/s3/imgList`, header(pageId)
  )
}

export function saveIconAPI(pageId, iconFile){
  return axiosInstance.post(
      `/setting/menu/img`,{
          headers:  { 'Content-Type': 'multipart/form-data' },
          data : iconFile
      }, header(pageId)
  )
}

export function GnbListApi(pageId){
  return axiosInstance.get(
    `menu/gnb/admin`, header(pageId)
  )
}

export function LnbListApi(pageId, menuId){
  return axiosInstance.get(
    `menu/lnb/admin`, {
      params: {
        menuId,
      }
    }, header(pageId)
  )
}

// 임시로 만든 delete 요청 현재 menu delete 기능 없음.
export function deleteMenuApi(pageId, menuId){
  return axiosInstance.delete(
    `setting/menu`, {
      params: {
        menuId
      }
    }, header(pageId)
  )
}

export function getMenuList(pageId){
  return axiosInstance.get(
    `menu/menuList`, header(pageId)
  )
}

