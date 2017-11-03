import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meetup from '@/components/Meetup/Meetup'
import Pacientes from '@/components/Pacientes/Pacientes'
import AuthGuard from './auth-guard'
import RegistrarGuard from './registrar-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/registrar',
      name: 'Registrar',
      component: Signup,
      beforeEnter: RegistrarGuard
    },
    {
      path: '/entrar',
      name: 'Entrar',
      component: Signin
    },
    {
      path: '/pacientes',
      name: 'Pacientes',
      component: Pacientes,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
