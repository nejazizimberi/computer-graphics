import * as THREE from 'three';
import { shadowPositionWorld } from 'three/src/nodes/TSL.js';


const scene = new THREE.Scene();
const camera =  
new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('basictexture/blue_metal_plate_diff_2k.jpg');


texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);

const material = new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.3,
    roughness: 0.2
});

const cube = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),

    material
);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

scene.add(cube);
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();