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
export function FavorApi(menuId, type){
  if (type === 'load') {
    return axiosInstance.get(`/setting/favor`,header(menuId));
  }
  if (type === false) {
    console.log('request off')
    return axiosInstance.delete(`/setting/favor`,header(menuId));
  }
  if (type === true) {
    console.log('request on')
    return axiosInstance.post(`/setting/favor`, null, {
      header: {
        'menuId' : menuId,
      },
    });
  }
  return JSON.parse('[{"data":"false"}]');
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
  axiosInstance.defaults.headers['menuId'] = pageId;
  return axiosInstance.get(
    `menu/menuList`
  )
}

