import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// Tweakpane
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
// Shaders
import SimpleVertexShader from './shaders/simple/vertex.glsl'
import SimpleFramentShader from './shaders/simple/fragment.glsl'


/**
* ------------------------------------
* Author: Vinces
* Website: https://vinces.io
* v.0.1
* Three.js - SIMPLE STARTER THREE.JS
* Work In Progress
* ------------------------------------
*/



/**
 * -----------------------------------------------------
 * Base
 * -----------------------------------------------------
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * -----------------------------------------------------
 * DEBBUGER TWEAKPANE
 * -----------------------------------------------------
 */
// Debbuger
const tweakpane = new Pane({ title: '☠ Parameters' })
tweakpane.containerElem_.style.width = '250px'
tweakpane.registerPlugin(EssentialsPlugin)

// Set Graph FPS
const fpsgraph = tweakpane.addBlade({ view: 'fpsgraph', label: 'FPS Graph' })


/**
 * -----------------------------------------------------
 * Sizes
 * -----------------------------------------------------
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * -----------------------------------------------------
 * Camera
 * -----------------------------------------------------
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 80)
camera.position.x = 1
camera.position.y = 2
camera.position.z = 3
camera.lookAt(scene.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 0
controls.maxDistance = 80

// Debugger
const debugCam = tweakpane.addFolder({ title: '📹 Cameras 〢 Controls', expanded: false })
debugCam.addInput(controls, 'autoRotate', { label: 'Auto Rotate' })

/**
 * -----------------------------------------------------
 * Grid Helpers
 * -----------------------------------------------------
 */
const gridHelper = new THREE.GridHelper(3, 3, '#949494', '#949494')
gridHelper.material.transparent = true
gridHelper.material.opacity = 1
gridHelper.visible = true
scene.add(gridHelper)


/**
 * -----------------------------------------------------
 * Cube
 * -----------------------------------------------------
 */
 const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// base : const normalMaterial = new THREE.MeshNormalMaterial()
// Simple Shaders Material
const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: SimpleVertexShader,
      fragmentShader: SimpleFramentShader,
})
// Mesh
const cube = new THREE.Mesh(cubeGeometry, shaderMaterial)
cube.position.set(-0.1, 0.5, 0)
scene.add(cube)


/**
 * -----------------------------------------------------
 * Light
 * -----------------------------------------------------
 */
const sunLight = new THREE.DirectionalLight(0xffffff, 1)
sunLight.castShadow = true
sunLight.shadow.camera.far = 50
sunLight.shadow.mapSize.set(1024, 1024)
sunLight.shadow.normalBias = 0.05
sunLight.position.set(5, 15, 10)
sunLight.rotation.set(0, 10, 10)
scene.add(sunLight)
const sunLightHelper = new THREE.DirectionalLightHelper(sunLight, 3)
scene.add(sunLightHelper)


/**
 * -----------------------------------------------------
 * Renderer
 * -----------------------------------------------------
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x333333, 1)


/**
 * -----------------------------------------------------
 * Animate
 * -----------------------------------------------------
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () =>
{
    fpsgraph.begin()
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    fpsgraph.end()
}

tick()