import * as THREE from 'three';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(0, 0, 0);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x884444 });
const floor = new THREE.Mesh(planeGeometry, planeMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

const torusGeometry = new THREE.TorusGeometry(0.7, 0.3, 16, 100);
const torusMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x8844ff,
    specular: 0xaaaaaa, 
    shininess: 60 ,
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-2, 0, 0);
scene.add(torus);


const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff4444 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 0, 0);
scene.add(cube);


const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x44ff44,
    metalness: 0.5,
    roughness: 0.4
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 0, 0);
scene.add(sphere);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(3, 5, 2);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.3);
scene.add(directionalLightHelper);


function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.02;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    sphere.rotation.y += 0.015;

    renderer.render(scene, camera);
}

animate();
