import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import search from '@/components/search'
import showNow from '@/components/showNow'
import showFuture from '@/components/showFuture'
import movieMsg from '@/components/movieMsg'
import starMsg from '@/components/starMsg'
import smallComment from '@/components/smallComment'
import comment from '@/components/comment'
import searchResult from '@/components/searchResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },   
    {
      path: '/search',
      name: 'search',
      component: search
    },    
    {
      path: '/showNow',
      name: 'showNow',
      component: showNow
    }, 
    {
      path: '/showFuture',
      name: 'showFuture',
      component: showFuture
    }, 
    {
      path: '/movie/:id',
      name: 'movieMsg',
      component: movieMsg
    },
    {
      path: '/starMsg/:id',
      name: 'starMsg',
      component: starMsg
    },
    {
      path: '/smallComment/:id',
      name: 'smallComment',
      component: smallComment
    },
    {
      path:'/comment/:id',
      name:'comment',
      component:comment
    },
    {
      path:'/searchResult/',
      name:'searchResult',
      component:searchResult
    }
   
  ]
})
