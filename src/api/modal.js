import { axiosInstance } from '../utils/axiosInstance';
   
export function orgTreeApi(pageId, type = "", compId = "", deptId = ""){  
  return axiosInstance.get(
    `/modal/org/tree`,{
      params: {
        type,
        compId,
        deptId,
      }, 
      headers: { 
        'Content-Type': 'multipart/form-data',
        'menuId': pageId,
      },
    }
  );
};

export function orgEmpListApi(pageId, type = "", compId = "", deptId=""){  
  return axiosInstance.get(
    `/modal/org/empList`,{
      params: {
        type,
        compId,
        deptId
      }, 
      headers: { 
        'Content-Type': 'multipart/form-data',
        'menuId': pageId,
      },
    }
  );
};

export function menuDetailApi(deptId){  
  return axiosInstance.get(
    `/modal/org/empList`,{
      params: {
        deptId
      }
    }
  );
};

export function searchOrg(pageId, type, text){  
  return axiosInstance.get(
    `/modal/org/search`,{
      params: {
        type,
        text: `%${text}%`
      }, 
      headers: { 
        'Content-Type': 'multipart/form-data',
        'menuId': pageId,
      },
    }
  );
};