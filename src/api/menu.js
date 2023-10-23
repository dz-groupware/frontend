import { axiosInstance } from '../utils/axiosInstance';

export function getMenuList(pageId){
  return axiosInstance.get(`menu/route-list`, {
    headers: {
      "Content-Type": "application/json",
      'menuId' : pageId
    }
  });
}

export function GnbApi(pageId){
  return axiosInstance.get(`/menu/gnb-list`, {
  headers: {
  "Content-Type": "application/json",
  'menuId' : pageId
}});
}

export function FavorApi(pageId, type){
  if (type === 'load') {
    return axiosInstance.get(`/common/favor?menuId`, {
      headers: {
        "Content-Type": "application/json",
        'menuId' : pageId
      }
    });
  }
  if (type === true) {
    return axiosInstance.delete(`/common/favor?menuId`, {
      headers: {
        "Content-Type": "application/json",
        'menuId' : pageId
      }
    });
  }
  if (type === false) {
    return axiosInstance.post(`/common/favor`, null, {
      headers: {
        "Content-Type": "application/json",
        'menuId' : pageId
      }
    });
  }
  return JSON.parse('[{"data":"false"}]');
}

export function searchAPI(pageId, formData) {
  return axiosInstance.get(
    `/menu/lnbs`,{
      params: {
        gnbName: `${formData.get("gnbName")}/%`,
        name: `%${formData.get("name")}%`, 
        pageId: `${formData.get("pageOption")}`, 
      },
      headers: {
        "Content-Type": "application/json",
        'menuId' : pageId
      }
    }
  );
}

export function saveMenuAPI(pageId, menu, type) {
  return axiosInstance.post(
    `/menu/menu?type=${type}`, menu, {
      headers: {
        "Content-Type": "application/json",
        'menuId' : pageId
      }}
  );
};

export function deleteMenuApi(pageId, menuId){
  return axiosInstance.delete(
    `/menu/menu`, {
      params: {
        menuId
      }, 
      headers: {
        "Content-Type": "application/json",
        'menuId' : pageId
      }
    }
  );
}

export function deleteMenuLnbApi(pageId, menuId){
  return axiosInstance.delete(
    `/menu/menu-lnb`, {
      params: {
        menuId
      }, 
      headers: {
        "Content-Type": "application/json",
        'menuId' : pageId
      }
    }
  );
}

export function iconListAPI(pageId){
  return axiosInstance.get(`/s3/imgList`, {
    headers: {
      "Content-Type": "application/json",
      'menuId' : pageId
    }
  });
}

export function GnbListApi(pageId){
  return axiosInstance.get(`menu/gnb/admin`, {
    headers: {
      "Content-Type": "application/json",
      'menuId' : pageId
    }
  });
}

export function LnbListApi(pageId, menuId){
  return axiosInstance.get(
    `menu/lnb/admin`, {
      params: {
        menuId,
      },
      headers: {
        "Content-Type": "application/json",
        'menuId' : pageId
      }
    }
  );
}

export function saveIconAPI(pageId, formData){
  return axiosInstance.post(
    `/s3/img`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'menuId': pageId,
       },
    }
  );
}

export function PageListApi(pageId){
  return axiosInstance.get(
    `/menu/page`, {
      headers: { 
        'Content-Type': 'application/json',
        'menuId': pageId,
      },
    }    
  );
}

export function test(){
  return axiosInstance.get(
    `/menu/defaultMenu`, {
      headers: { 
        'Content-Type': 'application/json',
        'menuId': '0',
      },
    }    
  );
}
