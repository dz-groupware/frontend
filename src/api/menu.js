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
                gnbName: `${formData.get("gnbName")}%25`,
                name: `%25${formData.get("name")}%25`, 
            }
        }
    )
}



export function saveMenuAPI(formData, data, type, compId) {
  if (type === '1'){
      return axiosInstance.post(
          `/setting/menu`,{
              params: {
                  type:1
              },
              data:{
                  parId: data['parId'],
                  compId: compId,
                  name: formData.get('name') === "" ? data['name'] : formData.get('name'),
                enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
                sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder'),
                iconUrl:  formData.get('iconUrl') === "" ? data['iconUrl'] : formData.get('iconUrl')
              }
          }
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
      return axiosInstance.post(
          `/setting/menu`,{
              params: {
                  type:3
              },
              data:{
                  parId: 50, // 상위메뉴 만들기 전까지 고정
                  compId:  compId,
                  name: formData.get('name') === "" ? data['name'] : formData.get('name'),
                  enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
                  sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder')
              }
          }
      )
  }
  if (type === '4') {
      return axiosInstance.post(
          `/setting/menu`,{
              params: {
                  type:4
              },
              data:{
                  id:  data['id'],
                  parId: formData.get('parId') === null ? data['parId'] : formData.get('parId'),
                  compId:  compId,
                  name: formData.get('name') === "" ? data['name'] : formData.get('name'),
                  enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
                  sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder')
                }
          }
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