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

    console.log('some param is null ..')
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
        console.log('some param is null ..')
        return Promise.reject(new Error("Invalid parameters"));
    }
}
        
export function orgTreeApi(type = "", comp_id = "", dept_id = "", emp_id = ""){  
    console.log("type : ", type," comp_id : ",  comp_id," dept_id : ",  dept_id," emp_id : ",  emp_id)
    return axios({
        url: `/Modal/org/tree?type=${type}&compId=${comp_id}&deptId=${dept_id}&empId=${emp_id}`,
        method:'get',
        baseURL : 'http://localhost:8080'
    });
}

export function orgEmpListApi(type = "", text = ""){  
    console.log("type : ", type," text : ",  text)
    if (type === 'comp'){
        console.log('type is comp')
        return axios({
            url: `/Modal/org/empList?type=${type}&compId=${text}`,
            method:'get',
            baseURL : 'http://localhost:8080'
        });
    }
    if (type === 'dept'){
        console.log('type is dept')
        return axios({
            url: `/Modal/org/empList?type=${type}&deptId=${text}`,
            method:'get',
            baseURL : 'http://localhost:8080'
        });
    }
}