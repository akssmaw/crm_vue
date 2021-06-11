import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index  from '@/components/index'
import elmui from '@/components/elmui'
import login from '@/components/login'
import program from '@/components/program'
import userlist from '@/components/user/userlist'
import chat from '@/components/admin/chat'
import csolo from '@/components/csolo/csolo'
import bill from '@/components/admin/bill'
import getuser from '@/components/user/getuser'
import uservalid  from '@/components/user/uservalid'
import operationlist  from '@/components/operation/operationlist'
import pastuser  from '@/components/user/pastuser'
import company from '@/components/company'


Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history',
  base:'/crm_system/',
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld

    },
   
    {
      path: '/elmui',
      name: 'elmui',
      component: elmui,
      children: [
        {
          path: '/index',
          name: 'index',
          component: index
        },
        {
          path: '/user/userlist',
          name: 'userlist',
          component: userlist
        },
        {
          path: '/user/getuser',
          name: 'getuser',
          component: getuser
        },{
          path: '/user/uservalid',
          name: 'uservalid',
          component: uservalid
        },
        {
          path: '/user/pastuser',
          name: 'pastuser',
          component: pastuser
        },
        {
          path: '/csolo/csolo',
          name: 'csolo',
          component: csolo
        },{
          path: '/operation/operationlist',
          name: 'operationlist',
          component: operationlist
        },
        {
          path: '/admin/bill',
          name: 'bill',
          component: bill
        },
        {
          path: '/program',
          name: 'program',
          component: program
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    
    {
      path: '/admin/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/company',
      name: 'company',
      component: company
    },
  ],
  
})

