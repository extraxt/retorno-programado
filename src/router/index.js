import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meetup from '@/components/Meetup/Meetup'
import Pacientes from '@/components/Pacientes/Pacientes'
import NovoPaciente from '@/components/Pacientes/NovoPaciente'
import Paciente from '@/components/Pacientes/Paciente'
import NovaClinica from '@/components/Clinicas/NovaClinica'
import Clinicas from '@/components/Clinicas/Clinicas'
import NovoRetorno from '@/components/Retornos/NovoRetorno'
import Retornos from '@/components/Retornos/Retornos'
import Retorno from '@/components/Retornos/Retorno'
import AuthGuard from './auth-guard'

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
      component: Signup
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
    },
    {
      path: '/novopaciente',
      name: 'Novo Paciente',
      component: NovoPaciente,
      beforeEnter: AuthGuard
    },
    {
      path: '/paciente/:id',
      name: 'Paciente',
      props: true,
      component: Paciente,
      beforeEnter: AuthGuard
    },
    {
      path: '/clinicas',
      name: 'Clínicas',
      component: Clinicas,
      beforeEnter: AuthGuard
    },
    {
      path: '/novaclinica',
      name: 'Nova Clínica',
      component: NovaClinica,
      beforeEnter: AuthGuard
    },
    {
      path: '/novoretorno',
      name: 'Novo Retorno',
      component: NovoRetorno,
      beforeEnter: AuthGuard
    },
    {
      path: '/retornos',
      name: 'Retornos',
      component: Retornos,
      beforeEnter: AuthGuard
    },
    {
      path: '/retorno/:id',
      name: 'Retorno',
      props: true,
      component: Retorno,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
