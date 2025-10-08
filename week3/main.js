import * as THREE from 'three';
import { Wireframe } from 'three/examples/jsm/Addons.js';
import { lightPosition } from 'three/src/nodes/TSL.js';
import { color, Const } from 'three/tsl';
import { AmbientLight, DirectionalLight } from 'three/webgpu';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z=3;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 ); 
// const geometry = new THREE.ConeGeometry( 1, 2, 32 ); 
// const geometry = new THREE.CylinderGeometry( 1, 1, 2, 10 ); 
// const geometry = new THREE.SphereGeometry( 1, 32, 32 ); 
const geometry = new THREE.TorusGeometry( 1, 0.4, 16, 100 ); 
// const material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true} ); 
// const material = new THREE.MeshLambertMaterial( {color: 0x8844ff} );
// const material = new THREE.MeshStandardMaterial( {
//     color: 0x8844ff,
//     metalness: 0.4,
//     roughness: 0.3,
//     emissive: 0x220044
// } );

const material = new THREE.MeshPhongMaterial( {
    color: 0x8844ff,
    specular: 0xffffff,
    // specular:0x000000,
    shininess: 50,
} );

const object = new THREE.Mesh( geometry, material ); scene.add( object );

const ambientLight = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,1.0);
directionalLight.position.set(1,1,5);
scene.add(directionalLight);

// const light = new THREE.DirectionalLight(0xffffff,1);
// light.position.set(2,2,5);
// scene.add(light);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight,0.5);
scene.add(lightHelper);

ambientLight.intensity = 0.4;
directionalLight.intensity = 1.2;

function animate(){
    requestAnimationFrame(animate);
    object.rotation.x += 0.01;
    object.rotation.y += 0.01;
    object.rotation.z += 0.01;
    renderer.render(scene,camera);

}
animate();