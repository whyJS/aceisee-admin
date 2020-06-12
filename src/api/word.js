import request from "@/utils/request";

export function getList (data) {
  return request({
    url: "/vue-element-admin/user/login",
    method: "post",
    data
  });
}

// 类型查询列表
export function getCategorysearchList (pageSize, pageNum, data) {
  return request({
    url: "/category/search",
    method: "get",
    params: {
      pageSize,
      pageNum,
      ...data
    }
  });
}
//查询分类树
export function getCategoryTree () {
  return request({
    url: "/category/tree",
    method: "get",
    params: {}
  });
}

//查询分类
export function getCategoryList (code) {
  return request({
    url: "/category/list",
    method: "get",
    params: {
      code
    }
  });
}


//添加分类
export function addCat (data) {
  return request({
    url: "/category/add",
    method: "post",
    params: data
  });
}

//删除分类
export function deleCat (data) {
  return request({
    url: "/category/delete",
    method: "post",
    params: data
  });
}




