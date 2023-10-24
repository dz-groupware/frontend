import { axiosInstance } from '../utils/axiosInstance';

export function getDepartemnt(pageId){  
  return axiosInstance.get(`/department`, {
    headers: {
      "Content-Type": "application/json",
      'menuId' : pageId
    }  
  });
}

export function getOptionCompList(pageId){   
  return axiosInstance.get(
    `/department/option-comp`, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}}
  )
}

export function getBasicDetailById(id, pageId){    
  return axiosInstance.get(
    `/department/detail-basic?id=${id}`, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}}
  )
}

export function getEmpListByDeptId(id, pageId){   
  return axiosInstance.get(
    `/department/detail-emp?id=${id}`, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}}
  )
}

export function modifyDepartment(dept, pageId){    
  return axiosInstance.post(
    `/department/dept-modify`, dept, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}}
  )
}

export function getDepartmentById(compId, parId, pageId){
  return axiosInstance.get(
    `/department/dept-list?compId=${compId}&parId=${parId}`, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}}
  )
}

export function addDepartment(dept, pageId){    
  return axiosInstance.post(
    `/department/dept`, dept, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}})
}

export function deleteDepartment(id, pageId){    
  return axiosInstance.delete(
    `/department/dept?id=${id}`, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}})
}

export function saveAll(dept, pageId){    
  return axiosInstance.post(
    `/department/dept-all`, dept, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}})
}


export function findDeptNameAndCode(compId, text, pageId){
  return axiosInstance.get(
    `/department/dept?compId=${compId}&text=%25${text}%25`, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}})
}

export function getCountSearchDept(compId, text, pageId){
  return axiosInstance.get(
    `/department/dept/count?compId=${compId}&text=%25${text}%25`, {
      headers: {
      "Content-Type": "application/json",
      'menuId' : pageId
    }
  });
}

export function checkDeptCode(id, text, pageId){
  return axiosInstance.get(
    `/department/duplicate-test?id=${id}&text=${text}`, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}})
}