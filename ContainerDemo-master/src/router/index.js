import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Post from '@/components/Post'
import Get from '@/components/Get'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      alias: '/Login'
    },
    {
      path: '/post/overdue=:overdue',
      name: 'Post',
      component: Post 
    },
    {
      path: '/post',
      name: 'Post',
      component: Post 
    },
    
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/post/Get',
      name: 'Get',
      component: Get 
    },
    {
      path: '/post/Home',
      name: 'Home',
      component: Home 
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login 
    },
    {
      path: '/post/Login',
      name: 'Login',
      component: Login 
    },
    {
      path: '/post/Post',
      name: 'Post',
      component: Login 
    },
    {
      path: '/get',
      name: 'Get',
      component: Get
    }
  ]
})
