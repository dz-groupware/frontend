import { axiosInstance } from '../utils/axiosInstance';

export function GnbApi(){
    return axiosInstance.get(
        `/setting/menu/gnb`
    )
}
export function FavorApi(type, menuId){
  if (type === 'load') {
      return axiosInstance.get(
          `/setting/favor`,{
              params: {
                  menuId
              }
          }
      )
  }
  if (type === false) {
      return axiosInstance.delete(
          `/setting/favor`,{
              params: {
                  menuId
              }
          }
      )
  }
  if (type === true) {
    return axiosInstance.post(
      `/setting/favor`,{
        menuId
      }
    )
  }
  return JSON.parse('[{"":""}]');
}

export function searchAPI(formData) {
    return axiosInstance.get(
        `/setting/menu/search`,{
            params: {
                gnbName: `${formData.get("gnbName")}%`,
                name: `%${formData.get("name")}%`, 
            }
        }
    )
}

export function saveMenuAPI(menu, type) {
  return axiosInstance.post(
    `/setting/menu?type=${type}`, menu
  )
}

export function iconListAPI(){
  return axiosInstance.get(
      `/s3/imgList`
  )
}

export function saveIconAPI(iconFile){
  return axiosInstance.post(
      `/setting/menu/img`,{
          headers:  { 'Content-Type': 'multipart/form-data' },
          data : iconFile
      }
  )
}

export function GnbListApi(){
  return axiosInstance.get(
    `menu/gnb/admin`
  )
}

export function LnbListApi(menuId){
  return axiosInstance.get(
    `menu/lnb/admin`, {
      params: {
        menuId,
      }
    }
  )
}

// 임시로 만든 delete 요청 현재 menu delete 기능 없음.
export function deleteMenuApi(menuId){
  return axiosInstance.delete(
    `setting/menu`, {
      params: {
        menuId
      }
    }
  )
}