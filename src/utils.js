import * as THREE from 'three'
/**
* ------------------------------------
* Author: Vinces
* Website: https://vinces.io
* v.0.1
* Three.js - SIMPLE STARTER THREE.JS
* Work In Progress
* ------------------------------------
*/

export const randomizeMatrix2d = (matrix) => {
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    position.x = THREE.MathUtils.randFloatSpread( 5 );
    position.y = THREE.MathUtils.randFloatSpread( 5 );
    position.z = 0;

    scale.x = scale.y = scale.z = 1;

    matrix.compose(position, quaternion, scale)
};

export const setStatistics = ({renderer, fpsGraph}) => {
    const monitoring = document.querySelector('section#monitoring');

    monitoring.querySelector('span#nb_fps').innerText = Math.round(fpsGraph.controller_.valueController.stopwatch_.fps);
    monitoring.querySelector('span#nb_call').innerText = renderer.info.render.calls;
    monitoring.querySelector('span#nb_triangles').innerText = renderer.info.render.triangles;
    monitoring.querySelector('span#nb_lines').innerText = renderer.info.render.lines;
    monitoring.querySelector('span#nb_geometries').innerText = renderer.info.memory.geometries;
    monitoring.querySelector('span#nb_textures').innerText = renderer.info.memory.textures;
    monitoring.querySelector('span#nb_materials').innerText = renderer.info.programs.length
};