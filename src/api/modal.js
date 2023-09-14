import { axiosInstance } from '../utils/axiosInstance';
   
export function orgTreeApi(type = "", compId = "", deptId = ""){  
  console.log(type," : ",compId," : ",deptId);
    return axiosInstance.get(
        `/modal/org/tree`,{
            params: {
                type,
                compId,
                deptId,
            }
        }
    )
}

export function orgEmpListApi(type = "", compId = "", deptId=""){  
  return axiosInstance.get(
    `/modal/org/empList`,{
      params: {
        type,
        compId,
        deptId
      }
    }
  )
    
}

export function menuDetailApi(deptId){  
  return axiosInstance.get(
      `/modal/org/empList`,{
          params: {
              deptId
          }
      }
  )
  
}

export function searchOrg(type, text){  
return axiosInstance.get(
  `/modal/org/search`,{
    params: {
      type,
      text: `%${text}%`
    }
  }
)
}