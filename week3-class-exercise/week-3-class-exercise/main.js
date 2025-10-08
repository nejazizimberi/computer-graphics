import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('container');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(4, 3, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
container.appendChild(renderer.domElement);

// Floor (plane)
const floorGeo = new THREE.PlaneGeometry(20, 20);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.9, metalness: 0 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Geometry 1: Box - MeshStandardMaterial (blue)
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x1166ff, metalness: 0.2, roughness: 0.4 })
);
box.position.set(-2, 0.5, 0);
box.castShadow = true;
scene.add(box);

// Geometry 2: Sphere - MeshPhongMaterial (red, shiny)
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshPhongMaterial({ color: 0xff3333, specular: 0xffffff, shininess: 80 })
);
sphere.position.set(0, 0.7, -1.5);
sphere.castShadow = true;
scene.add(sphere);

// Geometry 3: TorusKnot - MeshLambertMaterial (green, matte)
const torus = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.5, 0.15, 120, 16),
  new THREE.MeshLambertMaterial({ color: 0x33ff88 })
);
torus.position.set(1.8, 0.8, 0.8);
torus.castShadow = true;
scene.add(torus);

// Lights: Ambient + Directional + Point (3 lights total, requirement >=2 satisfied)
const ambient = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambient);

const dir = new THREE.DirectionalLight(0xffffff, 0.9);
dir.position.set(5, 8, 4);
dir.castShadow = true;
dir.shadow.mapSize.set(1024, 1024);
dir.shadow.camera.left = -6;
dir.shadow.camera.right = 6;
dir.shadow.camera.top = 6;
dir.shadow.camera.bottom = -6;
scene.add(dir);

const point = new THREE.PointLight(0xffee88, 0.6, 20);
point.position.set(-4, 3, 5);
scene.add(point);

// Helpers
const dirHelper = new THREE.DirectionalLightHelper(dir, 0.5);
scene.add(dirHelper);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();

// Resize handling
window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation
function animate() {
  requestAnimationFrame(animate);
  box.rotation.y += 0.01;
  sphere.rotation.y += 0.008;
  torus.rotation.x += 0.01;
  torus.rotation.z += 0.007;
  renderer.render(scene, camera);
}

animate();
