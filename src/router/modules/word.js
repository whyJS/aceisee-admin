/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const wordRouter = {
  path: "/word",
  component: Layout,
  redirect: "/word/enty",
  name: "Word",
  meta: {
    title: "单词管理",
    icon: "table"
  },
  children: [
    {
      path: "enty",
      component: () => import("@/views/word/enty"),
      name: "WordEnty",
      meta: {
        title: "单词录入",
        roles: ["admin", "editor"]
      }
    },
    {
      path: "manage",
      component: () => import("@/views/word/manage"),
      name: "WordManage",
      meta: {
        title: "词根管理",
        roles: ["admin", "editor"]
      }
    },
    {
      path: "type",
      component: () => import("@/views/word/type"),
      name: "WordType",
      meta: {
        title: "单词类型管理",
        roles: ["admin", "editor"]
      }
    },
    {
      path: "repeat",
      component: () => import("@/views/word/repeat"),
      name: "WordRepeat",
      meta: {
        title: "单词导入重复记录",
        roles: ["admin", "editor"]
      }
    }
  ]
};
export default wordRouter;
