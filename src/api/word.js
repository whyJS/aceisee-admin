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

export function getList (data) {
  return request({
    url: "/vue-element-admin/user/login",
    method: "post",
    data
  });
}

// 类型查询列表
export function getCategorysearchList (pageNum, pageSize, data) {
  let obj = __obj(data)
  return request({
    url: "/category/search",
    method: "get",
    params: {
      pageSize,
      pageNum,
      ...obj
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
export function deleCat (code) {
  return request({
    url: "/category/delete",
    method: "post",
    params: {
      code
    },
    // transformRequest: [function (data) {
    //   // 将数据转换为表单数据
    //   let ret = ''
    //   for (let it in data) {
    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //   }
    //   return ret
    // }],
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  });
}



//查询词根
export function getRootList (pageNum, pageSize, data) {
  let obj = __obj(data)
  return request({
    url: "/word/root/search",
    method: "get",
    params: {
      pageSize,
      pageNum,
      ...obj
    }
  });
}
//词根保存
export function rootSave (data) {
  let obj = __obj(data)
  return request({
    url: "/word/root/save",
    method: "post",
    params: {
      ...obj
    }
  });
}

//词根删除
export function rootDele (id) {
  return request({
    url: "/word/root/delete",
    method: "post",
    params: {
      id
    }
  });
}


// 查询单词
export function getWordList (pageNum, pageSize, data) {
  let obj = __obj(data)
  return request({
    url: "/word/search",
    method: "get",
    params: {
      pageSize,
      pageNum,
      ...obj
    }
  });
}

//单词删除
export function wordDele (id) {
  return request({
    url: "/word/delete",
    method: "post",
    params: {
      id
    }
  });
}


















// 查询单词
export function getRepeatList (pageNum, pageSize) {
  return request({
    url: "/word/repeat/list",
    method: "get",
    params: {
      pageSize,
      pageNum
    }
  });
}




