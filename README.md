# Simple Three.js Starter 

_Simple Three.js boilerplate powered by Vite for fast experience starter._ 

π§ͺ **v0.0.1** **γ’** [Live Demo](https://sp0ne.github.io/simple-threejs-starter/) 

---

![Screen Starter](public/screenshots/demo-2.gif)

---


## π Features


- Node.js [**v14.19 min**](https://nodejs.org/en/) π¦
- Three.js [**v0.141.0**](https://github.com/mrdoob/three.js/) π¦
- Powered with [Vite](https://vite.dev/) π¦
- UI controls using [Tweakpane](https://cocopon.github.io/tweakpane/) π
- Animate by [GSAP](https://greensock.com/docs/v3/GSAP)
- Simple Shaders support (glsl) with [vite-plugin-glsl](https://github.com/UstymUkhman/vite-plugin-glsl) π¨
- Minimal Raycasting.
- Simple texture support / loader

---

## πΎ Installation

#### π Hit in your terminal for setup

```bash
# npm install
yarn
```

## π₯ Usage γ’ Get Started

```bash
# Compiles & hot-reloads for development
# npm run dev
yarn dev

# Or Vite preview
# npm run serve
yarn serve

# Build & minifies for production
# npm run build
yarn build

# Deploy on Gh-pages
# npm run deploy
yarn deploy
```

**App running at on [localhost:9000/simple-threejs-starter/](http://localhost:9000/simple-threejs-starter/)**



### βοΈ Config vite β‘

Change config in `vite.config.vue` if you want:

```javascript
export default defineConfig({
  base: '/simple-threejs-starter/', // Remove or Adapt it ! (it's just for GH-PAGES)
  // ...stuff...
  server: {
    port: 9000,                     // Default 9000: Adapt it !
  },
  // ...stuff...
})
```


Reminder π¦:

```bash
# update dependencies. need existing yarn.lock file.
yarn upgrade-interactive --latest
```


---


## π Bugs γ’ Contributing

**First off, thanks for taking the time to contribute! π !!**
The issue tracker is the preferred channel for bug reports, features requests and submitting pull requests.


---


## π­ Credits γ’ </π»β€>

Originally written & currently maintained with by [@Sp0neπ§ββ][vinces-git] Β© 2022

**ππ»**: 
π₯ [vinces.io][vinces] **γ’** 
π [@Sp0ne][vinces-git] **γ’**
π§ͺ [codepen][vinces-codepen]



---


[vinces]: https://vinces.io
[vinces-git]: https://github.com/Sp0ne
[vinces-codepen]: https://codepen.io/Sp0ne
