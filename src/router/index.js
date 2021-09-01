import { createRouter, createWebHashHistory } from "vue-router";
import { trans } from "../i18n";
import { Dialog } from "vant";

const Login = () => import("../page/login/Login.vue");
const Register = () => import("../page/login/Register.vue");
const OtherCenter = () => import("../page/OtherCenter.vue");
// const Introduce = () => import("../page/Introduce.vue");
const MineIncome = () => import("../page/mine/MineIncome.vue");
const IdentityInfo = () => import("../page/mine/IdentityInfo.vue");
const ForgotPassword = () => import("../page/login/ForgotPassword.vue");
const NativeInteraction = () => import("../page/NativeInteraction.vue");


const Test = () => import("../page/Test.vue");
const Home = () => import("../page/Home.vue");
const Detail = () => import("../page/Detail.vue");
const Mine = () => import("../page/Mine.vue");
const Complaint = () => import("../page/Complaint.vue");
const MineTradingRecord = () => import("../page/mine/MineTradingRecord.vue");
const MineGold = () => import("../page/mine/MineGold.vue");
const MineVip = () => import("../page/mine/MineVip.vue");
const MineEdit = () => import("../page/mine/MineEdit.vue");
const MineNameWeightHeight = () => import("../page/mine/MineNameWeightHeight.vue");
const MineEditHobbyWork = () => import("../page/mine/MineEditHobbyWork.vue");
const MineEditAge = () => import("../page/mine/MineEditAge.vue");
const MineBindId = () => import("../page/mine/MineBindId.vue");
const MineVisitor = () => import("../page/mine/MineVisitor.vue");
const MineService = () => import("../page/mine/MineService.vue");
const MineNumberEmail = () => import("../page/mine/MineNumberEmail.vue");
const MineSet = () => import("../page/mine/MineSet.vue");
const MineLangWith = () => import("../page/mine/MineLangWith.vue")
const Follow = () => import("../page/Follow.vue");
const MineIDAuthenticate = () => import('@page/mine/MineIDAuthenticate.vue')
const SetLangs = () => import('@page/SetLangs.vue')
const MineEditCity = () => import('@page/mine/MineEditCity.vue')
const PayGoldInfo = () => import('@page/mine/PayGoldInfo.vue')
const PayVipInfo = () => import('@page/mine/PayVipInfo.vue')
const ChangeLanguage = () => import('@page/ChangeLanguage.vue')
const ExternalLinks = () => import('@page/ExternalLinks.vue')





const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login/login", name: "login", component: Login },
  { path: "/test", name: "test", component: Test },
  {
    path: "/login/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login/forgotPassword",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/otherCenter",
    name: "otherCenter",
    component: OtherCenter,
  },
  {
    path: "/setLangs",
    name: "setLangs",
    component: SetLangs,
  },
  // {
  //   path: "/introduce",
  //   name: "introduce",
  //   component: Introduce,
  // },
  {
    path: "/mine/mineIncome",
    name: "mineIncome",
    component: MineIncome,
  },
  {
    path: "/mine/identityInfo",
    name: "identityInfo",
    component: IdentityInfo,
  },
  {
    path: "/follow",
    name: "follow",
    component: Follow,
  },
  {
    path: "/mine/mineEdit",
    name: "mineEdit",
    component: MineEdit,
  },
  {
    path: "/mine/MineNameWeightHeight/:type",
    name: "mineNameWeightHeight",
    component: MineNameWeightHeight,
  },
  {
    path: "/mine/MineEditHobbyWork/:type",
    name: "mineEditHobbyWork",
    component: MineEditHobbyWork,
  },
  {
    path: "/mine/MineNumberEmail/:type",
    name: "mineNumberEmail",
    component: MineNumberEmail,
  },
  {
    path: "/mine/mineEditAge",
    name: "mineEditAge",
    component: MineEditAge,
  },
  {
    path: "/mine/MineEditCity",
    name: "  MineEditCity",
    component: MineEditCity,
  },
  {
    path: "/mine/mineBindId",
    name: "mineBindId",
    component: MineBindId,
  },
  {
    path: "/mine/mineVisitor",
    name: "mineVisitor",
    component: MineVisitor,
  },
  {
    path: "/mine/mineService",
    name: "mineService",
    component: MineService,
  },
  {
    path: "/mine/mineSet",
    name: "mineSet",
    component: MineSet,
  },
  {
    path: "/mine/MineLangWith/:type",
    name: "mineLangWith",
    component: MineLangWith,
  },

  {
    path: "/mine",
    name: "mine",
    component: Mine,
  },
  {
    path: "/complaint",
    name: "complaint",
    component: Complaint,
  },
  {
    path: "/mine/MineTradingRecord",
    name: "MineTradingRecord",
    component: MineTradingRecord,
  },
  {
    path: "/mine/mineGold",
    name: "mineGold",
    component: MineGold,
  },
  {
    path: "/mine/mineVip",
    name: "mineVip",
    component: MineVip,
  },
  {
    path: "/mine/mineIDAuthenticate",
    name: "mineIDAuthenticate",
    component: MineIDAuthenticate
  },
  {
    path: "/nativeInteraction",
    name: "nativeInteraction",
    component: NativeInteraction
  },
  {
    path: "/payGoldInfo",
    name: "payGoldInfo",
    component: PayGoldInfo
  },

  {
    path: "/payVipInfo",
    name: "payVipInfo",
    component: PayVipInfo
  },
  {
    path: "/changeLanguage",
    name: "changeLanguage",
    component: ChangeLanguage
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail
  },
  // 外部链接
  {
    path: "/externalLinks",
    name: "externalLinks",
    component: ExternalLinks
  },

];


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
import { setStatusBarTextMode } from '@native/common/setStatusBarTextMode'
const whiteTopRouterName = ['otherCenter', 'mine', 'mineGold ', ' mineVip']
router.beforeEach((to, from, next) => {

  // 设置状态栏文字颜色
  if (whiteTopRouterName.includes(to.name)) {
    setStatusBarTextMode(0)
  } else {
    setStatusBarTextMode(1)
  }
  // console.log(to)
  next()
  // // ...
  // // 返回 false 以取消导航
  // return false
  // if (localStorage.getItem('privateUserInfo.token')) {
  //   next();
  // } else {
  //   if (to.path === '/login/login' || routes.indexOf(to.path) !== -1) {
  //     next();
  //   }
  // }
  // if (!localStorage.getItem('privateUserInfo.token')) next({ name: '/login/login' })
  // else next()
})

router.onError(async (err) => {
  console.log(err)
  if (
    err && err.message &&
    (err.message.includes('Failed to fetch dynamically imported module')
      || err.message.includes('Importing a module script failed'))
  ) {
    try {
      await Dialog.confirm({
        title: trans('h5发现新版本'),
        message: trans('h5页面已更新,请点击刷新'),
        showCancelButton: false,
        confirmButtonText: trans('刷新'),
        confirmButtonColor: '#8B5CFF'
      });
      location.reload()
    } catch (e) {
      console.log(e);
    }
  }
})
export default router;
