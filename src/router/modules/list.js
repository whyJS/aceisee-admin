/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const listRouter = {
  path: "/list",
  component: Layout,
  redirect: "/list/entry",
  name: "List",
  meta: {
    title: "List管理",
    icon: "component"
  },
  children: [
    {
      path: "entry",
      component: () => import("@/views/list/entry"),
      name: "ListEnty",
      meta: {
        title: "-List录入",
        roles: ["admin", "editor"]
      }
    },
    {
      path: "entryauto",
      component: () => import("@/views/list/entryauto"),
      name: "ListEnty",
      meta: {
        title: "-List录入(手动)",
        roles: ["admin", "editor"]
      }
    },
    {
      path: "distribution",
      component: () => import("@/views/list/distribution"),
      name: "ListDistribution",
      meta: {
        title: "-List分配",
        roles: ["admin", "editor"]
      }
    },
    {
      path: "record",
      component: () => import("@/views/list/record"),
      name: "ListRecord",
      meta: {
        title: "测试记录",
        roles: ["admin", "editor"]
      }
    },
    {
      path: "census",
      component: () => import("@/views/list/census"),
      name: "ListCensus",
      meta: {
        title: "测试统计",
        roles: ["admin", "editor"]
      }
    }
  ]
};
export default listRouter;
