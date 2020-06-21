import request from "@/utils/request";


export function add (data) {
  return request({
    url: "/list/user/add",
    method: "post",
    params: {
      ...data
    }
  });
}

//查询学生

export function getUserList (pageNum, pageSize, name) {
  return request({
    url: "/list/user/search",
    method: "get",
    params: {
      pageSize,
      pageNum,
      name
    }
  });
}






