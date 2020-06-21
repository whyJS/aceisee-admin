import request from "@/utils/request";
//删除对象空属性
function __obj (val) {
  let obj = { ...val };
  let o = {}
  for (var key in obj) {
    if (obj[key]) {
      o[key] = obj[key]
    }
  }
  return o
}

//测试记录
export function getRecordList (pageNum, pageSize, data) {
  let obj = __obj(data)
  return request({
    url: "/list/test/record",
    method: "get",
    params: {
      pageSize,
      pageNum,
      ...obj
    }
  });
}

//测试统计S
export function getStatisticsList (pageNum, pageSize, data) {
  let obj = __obj(data)
  return request({
    url: "/statistics/list",
    method: "get",
    params: {
      pageSize,
      pageNum,
      ...obj
    }
  });
}



//查询list
export function getList (pageNum, pageSize, data) {
  let obj = __obj(data)
  return request({
    url: "/list/search",
    method: "get",
    params: {
      pageSize,
      pageNum,
      ...obj
    }
  });
}

//查询用户已分配和未分配列表
export function getAssignList (name, data) {
  return request({
    url: "/list/assign/list",
    method: "get",
    params: {
      name,
      ...data
    }
  });
}



//列表删除
export function listDele (ids) {
  return request({
    url: "/list/delete",
    method: "post",
    params: {
      ids: [ids]
    }
  });
}

//单词保存
export function listSave (data) {
  return request({
    url: "/list/save",
    method: "post",
    // params: {
    //   ...data
    // }
    data
  });
}

// list详情
export function getListDetail (id) {
  return request({
    url: "/list/detail",
    method: "get",
    params: {
      id
    }
  });
}


//分配list

export function listFen (data) {
  return request({
    url: "/list/assign",
    method: "post",
    data
  });
}

//自动分配单词

export function autoWord (data) {
  return request({
    url: "/list/autoAssign",
    method: "post",
    data
  });
}


