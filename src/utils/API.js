import axios from 'axios';

export function GnbMenuApi(emp_id){    
    if (emp_id !== undefined){
        return axios({
            url: `/Menu/GNB?empId=${emp_id}`,
            method:'get',
            baseURL : 'http://localhost:8080'
        });
    }
}

export function GnbFavorApi(emp_id){  
    if (emp_id !== undefined){
        return axios({
            url: `/Menu/Favor?empId=${emp_id}`,
            method:'get',
            baseURL : 'http://localhost:8080'
        });
    }
}
        
export function GnbFavorDeleteApi(emp_id, menu_id){  
    if (emp_id !== undefined && menu_id !== undefined && emp_id !== null && menu_id !== null){
        return axios({
            url: `/Menu/Favor?empId=${emp_id}&menuId=${menu_id}`,
            method:'delete',
            baseURL : 'http://localhost:8080'
        });
    } 
    return Promise.reject(new Error("Invalid parameters"));
}

export function profileAPI(emp_id){  
    if (emp_id !== undefined && emp_id !== null){
        return axios({
            url: `/Modal/profile?empId=${emp_id}`,
            method:'get',
            baseURL : 'http://localhost:8080'
        });
    } else {
        return Promise.reject(new Error("Invalid parameters"));
    }
}
        
export function orgTreeApi(type = "", comp_id = "", dept_id = "", emp_id = ""){  
    return axios({
        url: `/Modal/org/tree?type=${type}&compId=${comp_id}&deptId=${dept_id}&empId=${emp_id}`,
        method:'get',
        baseURL : 'http://localhost:8080'
    });
}

export function orgEmpListApi(type = "", text = ""){  
    if (type === 'comp'){
        return axios({
            url: `/Modal/org/empList?type=${type}&compId=${text}`,
            method:'get',
            baseURL : 'http://localhost:8080'
        });
    }
    if (type === 'dept'){
        return axios({
            url: `/Modal/org/empList?type=${type}&deptId=${text}`,
            method:'get',
            baseURL : 'http://localhost:8080'
        });
    }
}

export function menuDetailApi(dept_id){  
    return axios({
        url: `/Modal/org/empList?deptId=${dept_id}`,
        method:'get',
        baseURL : 'http://localhost:8080'
    });
    
}

export function searchOrg(type, text){  
    if (type === 'all') {
        return axios({
            url: `/Modal/org/search?type=${type}&text=%25${text}%25`,
            method:'get',
            baseURL : 'http://localhost:8080'
        });
    }
    if (type === 'dept') {
        return axios({
            url: `/Modal/org/search?type=${type}&text=%25${text}%25`,
            method:'get',
            baseURL : 'http://localhost:8080'
        });
    }
    if (type ==='emp') {
        return axios({
            url: `/Modal/org/search?type=${type}&text=%25${text}%25`,
            method:'get',
            baseURL : 'http://localhost:8080'
        });
    }
}

export function GnbApi(){
    return axios({
      url: `/setting/menu/gnb`,
      method:'get',
      baseURL : 'http://localhost:8080',
    })
}

export function FavorApi(type, empId, menuId){
    if (type === 'load') {
        return axios({
        url: `/setting/favor?empId=${empId}&menuId=${menuId}`,
        method:'get',
        baseURL : 'http://localhost:8080',
        })
    }
    if (type === 'off') {
        return axios({
            url: `/setting/favor?empId=${empId}&menuId=${menuId}`,
            method:'delete',
            baseURL : 'http://localhost:8080'
        })
    }
    if (type === 'on') {
        return axios({
            url: `/setting/favor?empId=${empId}&menuId=${menuId}`,
            method:'post',
            baseURL : 'http://localhost:8080',
            data : {
              empId: empId,
              menuId: menuId
            }
          })
    }
}

export function searchAPI(formData) {
    return axios({
        url: `/setting/menu/search?gnbName=${formData.get("gnbName")}%25&name=%25${formData.get("name")}%25`,
        method:'get',
        baseURL : 'http://localhost:8080',
        data: {
          formData
        }
    });
}

export function saveMenuAPI(formData, data, type) {
    if (type === '1'){
        return axios({
            url: `/setting/menu?type=1`,
            method:'post',
            baseURL : 'http://localhost:8080',
            data:{
              parId: data['parId'],
              name: formData.get('name') === "" ? data['name'] : formData.get('name'),
              enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
              sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder'),
              iconUrl:  formData.get('iconUrl') === "" ? data['iconUrl'] : formData.get('iconUrl')
            }
        });
    }
    if (type === '2'){
        return axios({
            url: `/setting/menu?type=2`,
            method:'post',
            baseURL : 'http://localhost:8080',
            data:{
              id:  data['id'],
              parId: data['parId'],
              name: formData.get('name') === "" ? data['name'] : formData.get('name'),
              enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
              sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder'),
              iconUrl:  formData.get('iconUrl') === "" ? data['iconUrl'] : formData.get('iconUrl')
            }
        });
    }
    if (type === '3'){
        return axios({
            url: `/setting/menu?type=${type}`,
            method:'post',
            baseURL : 'http://localhost:8080',
            data:{
              parId: 72, // 상위메뉴 만들기 전까지 고정
              name: formData.get('name') === "" ? data['name'] : formData.get('name'),
              enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
              sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder')
            }
        });
    }
    if (type === '4') {
        return axios({
            url: `/setting/menu?type=4`,
            method:'post',
            baseURL : 'http://localhost:8080',
            data:{
              id:  data['id'],
              parId: formData.get('parId') === null ? data['parId'] : formData.get('parId'),
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
            url: `/setting/menu/img`,
            method:'post',
            baseURL : 'http://localhost:8080',
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
      url: `/setting/menu/iconList`,
      method:'get',
      baseURL : 'http://localhost:8080',
    });
}