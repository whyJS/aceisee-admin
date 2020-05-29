import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/vue-element-admin/user/login",
    method: "post",
    data
  });
}
