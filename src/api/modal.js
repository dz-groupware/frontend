import { axiosInstance } from '../utils/axiosInstance';
   
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
    )
}

export function orgEmpListApi(type = "", compId = "", deptId=""){  
  return axiosInstance.get(
    `/modal/org/empList`,{
      params: {
        type,
        compId: compId,
        deptId: deptId
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