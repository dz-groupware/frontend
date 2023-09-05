import axios from 'axios';

const baseUrl = 'http://localhost:8010';

export function GnbMenuApi(emp_id){    
    if (emp_id !== undefined){
        return axios({
            url: `/api/v1/menu/gnb?empId=${emp_id}`,
            method:'get',
            baseURL : baseUrl,
        });
    }
}

export function GnbFavorApi(emp_id){  
    if (emp_id !== undefined){
        return axios({
            url: `/api/v1/menu/favor?empId=${emp_id}`,
            method:'get',
            baseURL : baseUrl,
        });
    }
}
        
export function GnbFavorDeleteApi(emp_id, menu_id){  
    if (emp_id !== undefined && menu_id !== undefined && emp_id !== null && menu_id !== null){
        return axios({
            url: `/api/v1/menu/favor?empId=${emp_id}&menuId=${menu_id}`,
            method:'delete',
            baseURL : baseUrl,
        });
    } 
    return Promise.reject(new Error("Invalid parameters"));
}

export function profileAPI(emp_id){  
    if (emp_id !== undefined && emp_id !== null){
        return axios({
            url: `/api/v1/modal/profile?empId=${emp_id}`,
            method:'get',
            baseURL : baseUrl,
        });
    } else {
        return Promise.reject(new Error("Invalid parameters"));
    }
}
        
export function orgTreeApi(type = "", comp_id = "", dept_id = "", emp_id = ""){  
    return axios({
        url: `/api/v1/modal/org/tree?type=${type}&compId=${comp_id}&deptId=${dept_id}&empId=${emp_id}`,
        method:'get',
        baseURL : baseUrl,
    });
}

export function orgEmpListApi(type = "", text = ""){  
    if (type === 'comp'){
        return axios({
            url: `/api/v1/modal/org/empList?type=${type}&compId=${text}`,
            method:'get',
            baseURL : baseUrl,
        });
    }
    if (type === 'dept'){
        return axios({
            url: `/api/v1/modal/org/empList?type=${type}&deptId=${text}`,
            method:'get',
            baseURL : baseUrl,
        });
    }
}

export function menuDetailApi(dept_id){  
    return axios({
        url: `/api/v1/modal/org/empList?deptId=${dept_id}`,
        method:'get',
        baseURL : baseUrl,
    });
    
}

export function searchOrg(type, text){  
    if (type === 'all') {
        return axios({
            url: `/api/v1/modal/org/search?type=${type}&text=%25${text}%25`,
            method:'get',
            baseURL : baseUrl,
        });
    }
    if (type === 'dept') {
        return axios({
            url: `/api/v1/modal/org/search?type=${type}&text=%25${text}%25`,
            method:'get',
            baseURL : baseUrl,
        });
    }
    if (type ==='emp') {
        return axios({
            url: `/api/v1/modal/org/search?type=${type}&text=%25${text}%25`,
            method:'get',
            baseURL : baseUrl,
        });
    }
}

export function GnbApi(){
    return axios({
      url: `/api/v1/setting/menu/gnb`,
      method:'get',
      baseURL : baseUrl,
    })
}

export function FavorApi(type, empId, menuId){
    if (empId !== undefined && empId !== null){
        if (type === 'load') {
            return axios({
            url: `/api/v1/setting/favor?empId=${empId}&menuId=${menuId}`,
            method:'get',
            baseURL : baseUrl,
            });
        }
        if (type === 'off') {
            return axios({
                url: `/api/v1/setting/favor?empId=${empId}&menuId=${menuId}`,
                method:'delete',
                baseURL : baseUrl,
            });
        }
        if (type === 'on') {
            return axios({
                url: `/api/v1/setting/favor?empId=${empId}&menuId=${menuId}`,
                method:'post',
                baseURL : baseUrl,
                data : {
                empId: empId,
                menuId: menuId
                }
            });
        }
        return JSON.parse('[{"":""}]');
    }
}

export function searchAPI(formData) {
    return axios({
        url: `/api/v1/setting/menu/search?gnbName=${formData.get("gnbName")}%25&name=%25${formData.get("name")}%25`,
        method:'get',
        baseURL : baseUrl,
    });
}

export function saveMenuAPI(formData, data, type, compId) {
    if (type === '1'){
        return axios({
            url: `/api/v1/setting/menu?type=1`,
            method:'post',
            baseURL : baseUrl,
            data:{
                parId: data['parId'],
                compId: compId,
                name: formData.get('name') === "" ? data['name'] : formData.get('name'),
              enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
              sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder'),
              iconUrl:  formData.get('iconUrl') === "" ? data['iconUrl'] : formData.get('iconUrl')
            }
        });
    }
    if (type === '2'){
        
        return axios({
            url: `/api/v1/setting/menu?type=2`,
            method:'post',
            baseURL : baseUrl,
            data:{
              id:  data['id'],
              parId: data['parId'],
              compId:  compId,
              name: formData.get('name') === "" ? data['name'] : formData.get('name'),
              enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
              sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder'),
              iconUrl:  formData.get('iconUrl') === "" ? data['iconUrl'] : formData.get('iconUrl')
            }
        });
    }
    if (type === '3'){
        return axios({
            url: `/api/v1/setting/menu?type=${type}`,
            method:'post',
            baseURL : baseUrl,
            data:{
              parId: 50, // 상위메뉴 만들기 전까지 고정
              compId:  compId,
              name: formData.get('name') === "" ? data['name'] : formData.get('name'),
              enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
              sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder')
            }
        });
    }
    if (type === '4') {
        return axios({
            url: `/api/v1/setting/menu?type=4`,
            method:'post',
            baseURL : baseUrl,
            data:{
              id:  data['id'],
              parId: formData.get('parId') === null ? data['parId'] : formData.get('parId'),
              compId:  compId,
              name: formData.get('name') === "" ? data['name'] : formData.get('name'),
              enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
              sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder')
            }
        });

    }   
}
      /*
      // 이미지 데이터 보내기
      if (iconFile !== null && iconFile !== undefined){
        try {
          await axios({
            url: `/api/v1/setting/menu/img`,
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
    return axios({
      url: `/api/v1/setting/menu/iconList`,
      method:'get',
      baseURL : baseUrl,
    });
}

export function saveIconAPI(iconFile){
    return axios({
        url: `/api/v1/setting/menu/img`,
        method:'post',
        baseURL : baseUrl,
        headers: { 'Content-Type': 'multipart/form-data' },
        data : iconFile
    });
}

export function searchMenuListAPI(menuId, compId) {
    if(menuId !== undefined && menuId !== null && compId !== undefined && compId !== null) {
        return axios({
            url: `/api/v1/menu/lnb?menuId=${menuId}&compId=${compId}`,
            method:'get',
            baseURL : baseUrl,
        });    
    }
}