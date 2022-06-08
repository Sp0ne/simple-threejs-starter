import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// Tweakpane
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
// Shaders
import SimpleVertexShader from './shaders/simple/vertex.glsl'
import SimpleFragmentShader from './shaders/simple/fragment.glsl'
// Gsap
import gsap from 'gsap'
// Utils
import * as Utils from './utils'

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
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();



/**
 * -----------------------------------------------------
 * DEBUGGER TWEAKPANE
 * -----------------------------------------------------
 */
// Debugger
const tweakpane = new Pane({ title: '☠ Parameters' });
tweakpane.containerElem_.style.width = '280px';
tweakpane.registerPlugin(EssentialsPlugin);

// Set Graph FPS
const fpsGraph = tweakpane.addBlade({ view: 'fpsgraph', label: 'FPS Graph' });



/**
 * -----------------------------------------------------
 * Sizes
 * -----------------------------------------------------
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});



/**
 * -----------------------------------------------------
 * Camera
 * -----------------------------------------------------
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 80);
camera.position.x = 2;
camera.position.y = 1.5;
camera.position.z = 4;
camera.lookAt(scene.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 0;
controls.maxDistance = 80;
controls.autoRotateSpeed = -5;

// Debugger
const debugCam = tweakpane.addFolder({ title: '📹 Cameras 〢 Controls', expanded: false });
debugCam.addInput(controls, 'autoRotate', { label: 'Auto Rotate' });



/**
 * -----------------------------------------------------
 * Light
 * -----------------------------------------------------
 */
const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.castShadow = true;
sunLight.shadow.camera.far = 50;
sunLight.shadow.mapSize.set(1024, 1024);
sunLight.shadow.normalBias = 0.05;
sunLight.position.set(5, 15, 0);
sunLight.rotation.set(0, 10, 10);
scene.add(sunLight);
const sunLightHelper = new THREE.DirectionalLightHelper(sunLight, 3);
scene.add(sunLightHelper);



/**
 * -----------------------------------------------------
 * Grid Helpers
 * -----------------------------------------------------
 */
const gridHelper = new THREE.GridHelper(3, 3, '#949494', '#949494');
gridHelper.material.transparent = true;
gridHelper.material.opacity = 1;
gridHelper.visible = true;
gridHelper.position.x = 0;
scene.add(gridHelper);



/**
 * -----------------------------------------------------
 * Loader Textures
 * -----------------------------------------------------
 */
const loader = new THREE.TextureLoader();
const smokeTexture = loader.load('./textures/smoke.png');
smokeTexture.minFilter = THREE.NearestFilter;
smokeTexture.magFilter = THREE.NearestFilter; // THREE.LinearFilter;



/**
 * -----------------------------------------------------
 * Materials
 * -----------------------------------------------------
 */

// base Material
const normalMaterial = new THREE.MeshNormalMaterial();

// Simple Shaders Material
const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: SimpleVertexShader,
    fragmentShader: SimpleFragmentShader,
});
const smokeMaterial = new THREE.MeshLambertMaterial({
    map: smokeTexture,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide
});



/**
 * -----------------------------------------------------
 * Object
 * -----------------------------------------------------
 */
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const smokeGeometry = new THREE.PlaneBufferGeometry(4, 4);

// Group Mesh
const groupMeshCube = new THREE.Group()
scene.add(groupMeshCube)
// Mesh 1
const cube = new THREE.Mesh(cubeGeometry, normalMaterial);
cube.position.set(1, 0.5, 0);
groupMeshCube.add(cube);

// Mesh 2
const cube2 = new THREE.Mesh(cubeGeometry, shaderMaterial);
cube2.position.set(-1, 0.5, 0);
groupMeshCube.add(cube2);


// Mesh 3
let smokeParticles = [];
for (let i = 0, l = 10; i < l; i++) {
    let particle = new THREE.Mesh(smokeGeometry, smokeMaterial);

    particle.position.x = THREE.MathUtils.randFloatSpread( 4 );
    particle.position.y = 0;
    particle.position.z = THREE.MathUtils.randFloatSpread( 4 );

    particle.rotation.z = Math.random() * 360;
    particle.rotation.x = -Math.PI / 2;
    scene.add(particle);
    smokeParticles.push(particle);
}


/**
 * -----------------------------------------------------
 * Renderer
 * -----------------------------------------------------
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x333333, 1);


/**
 * -----------------------------------------------------
 * Raycasting
 * -----------------------------------------------------
 */
const cursor = {
    position: new THREE.Vector2(),
    positionReal: new THREE.Vector2(),
}
window.addEventListener('mousemove', (event) => {
    cursor.position.x = (event.clientX / sizes.width) * 2 - 1
    cursor.position.y = -(event.clientY / sizes.height) * 2 + 1
    cursor.positionReal.x = event.clientX
    cursor.positionReal.y = event.clientY
})

/**
 * -----------------------------------------------------
 * Raycasting
 * -----------------------------------------------------
 */
window.addEventListener('pointerup', () => {

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(cursor.position, camera)
    const intersects = raycaster.intersectObjects(groupMeshCube.children, true)
    // If found
    if (intersects.length) {
        let intersect = intersects[0]

        //cGSAP Anim
        const timeline = gsap.timeline();;
        timeline.to(intersect.object.rotation, { y: Math.PI * 2 , duration: 1, ease: "none" }, '<');
    }
})

/**
 * -----------------------------------------------------
 * Animate
 * -----------------------------------------------------
 */
const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () =>
{
    // Monitor FPS
    fpsGraph.begin();

    // Delta
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;


    // Update controls
    controls.update();

    // Update Particles
    smokeParticles.forEach(sp => {
        sp.rotation.z += deltaTime * 0.2;
    });

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);

    // Update Statistics
    Utils.setStatistics({renderer, fpsGraph});

    // Monitor FPS - END
    fpsGraph.end()
};

tick();
