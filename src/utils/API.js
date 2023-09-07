import axios from 'axios';
import { axiosInstance } from './axiosInstance';

export function GnbMenuApi(empId){    
    if (empId !== undefined){
        return axiosInstance.get(
            `/menu/gnb`,{
                params: {
                    empId
                }
            }
        ).then(response => {
            return response.data;
        })
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
        ).then(response => {
            return response.data;
        })
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
        ).then(response => {
            return response.data;
        })
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
        ).then(response => {
            return response.data;
        })
    } else {
        return Promise.reject(new Error("Invalid parameters"));
    }
}
        
export function orgTreeApi(type = "", compId = "", deptId = "", empId = ""){  
    return axiosInstance.get(
        `/modal/org/tree`,{
            params: {
                type,
                compId,
                deptId,
                empId,
            }
        }
    ).then(response => {
            return response.data;
        })
}

export function orgEmpListApi(type = "", text = ""){  
    if (type === 'comp'){
        return axiosInstance.get(
            `/modal/org/empList`,{
                params: {
                    type,
                    compId: text
                }
            }
        ).then(response => {
            return response.data;
        })
    }
    if (type === 'dept'){
        return axiosInstance.get(
            `/modal/org/empList`,{
                params: {
                    type,
                    deptId: text
                }
            }
        ).then(response => {
            return response.data;
        })
    }
}

export function menuDetailApi(deptId){  
    return axiosInstance.get(
        `/modal/org/empList`,{
            params: {
                deptId
            }
        }
    ).then(response => {
            return response.data;
        })
    
}

export function searchOrg(type, text){  
    if (type === 'all') {
        return axiosInstance.get(
            `/modal/org/search`,{
                params: {
                    type,
                    text: `%25${text}%25`,
                }
            }
        ).then(response => {
            return response.data;
        })
    }
}

export function GnbApi(){
    return axiosInstance.get(
        `/setting/menu/gnb`
    ).then(response => {
            return response.data;
        })
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
            ).then(response => {
            return response.data;
        })
        }
        if (type === 'off') {
            return axiosInstance.delete(
                `/setting/favor`,{
                    params: {
                        empId,
                        menuId
                    }
                }
            ).then(response => {
            return response.data;
        })
        }
        if (type === 'on') {
            return axiosInstance.post(
                `/setting/favor`,{
                        empId,
                        menuId
                }
            ).then(response => {
            return response.data;
        })
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
    ).then(response => {
            return response.data;
        })
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
        ).then(response => {
            return response.data;
        })
    }
    if (type === '2'){
        return axiosInstance.post(
            `/setting/menu`,{
                params: {
                    type:2
                },
                data:{
                    id:  data['id'],
                    parId: data['parId'],
                    compId:  compId,
                    name: formData.get('name') === "" ? data['name'] : formData.get('name'),
                    enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
                    sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder'),
                    iconUrl:  formData.get('iconUrl') === "" ? data['iconUrl'] : formData.get('iconUrl')
                  }
            }
        ).then(response => {
            return response.data;
        })
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
        ).then(response => {
            return response.data;
        })
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
        ).then(response => {
            return response.data;
        })

    }   
}
      /*
      // 이미지 데이터 보내기
      if (iconFile !== null && iconFile !== undefined){
        try {
          await axios({
            url: `/setting/menu/img`,
            method:'post',
            baseURL : baseUrl,
            headers: { 'Content-Type': 'multipart/form-data' },
            data:{
              iconFile:  iconFile
            }
          });
          console.log(iconFile);
          console.log('successed sending img...');
        } catch (error) {
          console.log('failed sending img...');
        }
      } else {
        console.log('image is null');
      }
      
      */

export function iconListAPI(){
    return axiosInstance.get(
        `/setting/menu/iconList`
    ).then(response => {
            return response.data;
        })
}

export function saveIconAPI(iconFile){
    return axiosInstance.post(
        `/setting/menu/img`,{
            headers:  { 'Content-Type': 'multipart/form-data' },
            data : iconFile
        }
    ).then(response => {
            return response.data;
        })
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
        ).then(response => {
            return response.data;
        })
    }
}