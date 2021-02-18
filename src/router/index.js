// import Vue from 'vue'
// import Router from 'vue-router'

// 导入components
import Home from '@/pages/Home';
import Algs from '@/pages/Algs';
import About from '@/pages/About';
import AlgDetail from '@/components/AlgDetail';
// const Home = ()=>import('@/pages/Home')
// const Algs = ()=>import('@/pages/Algs')
// const About = ()=>import('@/pages/About')
// const AlgDetail = ()=>import('@/components/AlgDetail')


Vue.use(VueRouter);

export default new VueRouter({
  // mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/algs",
    },
    {
      path: "/home",
      name: 'home',
      component: Home,
    },
    {
      path: '/algs',
      name: 'algs',
      component: Algs,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/algs/:name',
      name: 'alg',
      component: AlgDetail,
    },

  ],
  scrollBehavior(to, from,savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
