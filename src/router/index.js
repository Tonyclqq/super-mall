// 1.导入vue 和vue-router
import vue from 'vue';
import vueRouter from 'vue-router';

// import home from 'views/home/home';
// import category from 'views/category/category';
// import shopcart from 'views/shopcart/shopcart';
// import profile from 'views/profile/profile';
// 2.调用Vue.use()，注册组件
vue.use(vueRouter);
// 配置组件与路径的映射关系，这个采用的是懒加载的模式，上面注释的是采用普通模式
const home = () => import('views/home/home');
const category = () => import('views/category/category');
const shopcart = () => import('views/shopcart/shopcart');
const profile = () => import('views/profile/profile');
const detail = () => import('views/detail/Detail');
const routerPush = vueRouter.prototype.push
vueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
//3.定义路由
const routes = [
    { path: '', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/category', component: category },
    { path: '/shopcart', component: shopcart },
    { path: '/profile', component: profile },
    { path: '/detail',component:detail}
]
// 4.创建路由实例
const router = new vueRouter({
    routes
})
//5.导出路由实例
export default router
