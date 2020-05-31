/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const studyRouter = {
  path: "/study",
  component: Layout,
  redirect: "/study/index",
  name: "Study",
  meta: {
    title: "学生管理",
    icon: "lock"
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/study/index"),
      name: "StudyAdd",
      meta: {
        title: "添加学生",
        roles: ["admin", "editor"]
      }
    }
  ]
};
export default studyRouter;
