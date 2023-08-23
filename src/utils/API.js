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
        