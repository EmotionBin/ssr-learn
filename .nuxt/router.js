import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2d3dc73d = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _6beda9b2 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _11ffd4f6 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _6a853ff6 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _7762cf76 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _216eed80 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _514f8343 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _2d3dc73d,
    children: [{
      path: "",
      component: _6beda9b2,
      name: "home"
    }, {
      path: "/login",
      component: _11ffd4f6,
      name: "login"
    }, {
      path: "/register",
      component: _11ffd4f6,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _6a853ff6,
      name: "profile"
    }, {
      path: "/settings",
      component: _7762cf76,
      name: "settings"
    }, {
      path: "/editor",
      component: _216eed80,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _514f8343,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
