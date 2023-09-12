import { axiosInstance } from '../utils/axiosInstance';

export function GnbApi(){
    return axiosInstance.get(
        `/setting/menu/gnb`
    )
}

export function FavorApi(type, empId, menuId){
    if (empId !== undefined && empId !== null){
        if (type === 'load') {
            return axiosInstance.get(
                `/setting/favor`,{
                    params: {
                        empId,
                        menuId
                    }
                }
            )
        }
        if (type === 'off') {
            return axiosInstance.delete(
                `/setting/favor`,{
                    params: {
                        empId,
                        menuId
                    }
                }
            )
        }
        if (type === 'on') {
            return axiosInstance.post(
                `/setting/favor`,{
                        empId,
                        menuId
                }
            )
        }
        return JSON.parse('[{"":""}]');
    }
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



export function saveMenuAPI(formData, data, type, compId) {
  if (type === '1'){
    const menu = formData;
      return axiosInstance.post(
          `/setting/menu?type=${type}`, menu
      )
  }
  if (type === '2'){
      return axiosInstance.post(
          `/setting/menu`,
          {
            id:  data['id'],
            parId: data['parId'],
            compId:  compId,
            name: formData.get('name') === "" ? data['name'] : formData.get('name'),
            enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
            sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder'),
            iconUrl:  formData.get('iconUrl') === "" ? data['iconUrl'] : formData.get('iconUrl')
          },
          {
            params: {
                type:2
            },
          }
      )
  }
  if (type === '3'){
    const menu = formData;
      return axiosInstance.post(
          `/setting/menu?type=${type}`,menu
      )
  }
  if (type === '4') {
    const menu = formData;
      return axiosInstance.post(
          `/setting/menu?type=${type}`, menu
          
      )

  }   
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
export function deleteMenuApi(){
  return axiosInstance.delete(
    `setting/menu`, {
      params: {
        menuId: 48,
      }
    }
  )
}