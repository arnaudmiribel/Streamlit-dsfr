import Vue from 'vue'
import VueRouter from 'vue-router'

import MyComponent from './components/MyComponent.vue'

import './assets/base.css'

const routes = [
	{ path: '/my_component', component: MyComponent },
	{ path: '/dsfr_button', component: () => import('./components/DsfrButton.vue') },
]

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes,
})

Vue.createApp({})
	.use(router)
	.mount('#app')
