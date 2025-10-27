import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // sky blue

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(25, 20, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(30, 50, 10);
sunLight.castShadow = true;
scene.add(sunLight);

// GROUND 
const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x7ec850 });
const grass = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), grassMaterial);
grass.rotation.x = -Math.PI / 2;
grass.receiveShadow = true;
scene.add(grass);

// road walkways
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const mainRoad = new THREE.Mesh(new THREE.BoxGeometry(8, 0.1, 30), roadMaterial);
mainRoad.position.y = 0.05;
mainRoad.position.z = 5;
scene.add(mainRoad);

// Road extension
const roadExtension = new THREE.Mesh(new THREE.BoxGeometry(40, 0.1, 7), roadMaterial);
roadExtension.position.y = 0.05;
roadExtension.position.z = -20;
roadExtension.position.x = 5;
roadExtension.rotation.y = 20;
scene.add(roadExtension);

//walking crossroad
const crossRoad = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 30), roadMaterial);
crossRoad.position.y = 0.05;
crossRoad.position.x = -20;
crossRoad.position.z = -18;
scene.add(crossRoad);

// Sidewalks 
const sideRoad = new THREE.Mesh(new THREE.BoxGeometry(70, 0.1, 8), roadMaterial);
sideRoad.position.y = 0.05;
scene.add(sideRoad);

// Sidewalk 2
const sideRoad2 = new THREE.Mesh(new THREE.BoxGeometry(12, 0.1, 10), roadMaterial);
sideRoad2.position.y = 0.05;
sideRoad2.position.x = -10;
sideRoad2.position.z = -9;
scene.add(sideRoad2);

// MATERIALS
const blueBuildingMat = new THREE.MeshPhongMaterial({ color: 0x3399ff });
const grayBuildingMat = new THREE.MeshPhongMaterial({ color: 0x777777 });
const whiteBuildingMat = new THREE.MeshPhongMaterial({ color: 0xffffff });

// BLUE building 
const whiteBuilding1 = new THREE.Mesh(new THREE.BoxGeometry(25, 3, 7), whiteBuildingMat);
whiteBuilding1.position.set(15, 2, -23);
whiteBuilding1.rotation.y = 20;
whiteBuilding1.castShadow = true;
scene.add(whiteBuilding1);

// GRAY building 
const grayBuilding1 = new THREE.Mesh(new THREE.BoxGeometry(12, 6, 18), grayBuildingMat);
grayBuilding1.position.set(-8.5, 3, -22);
grayBuilding1.rotation.y = 3;
grayBuilding1.castShadow = true;
scene.add(grayBuilding1);


// WHITE buildings 
const blueBuilding1 = new THREE.Mesh(new THREE.BoxGeometry(12, 6, 8), blueBuildingMat);
blueBuilding1.position.set(-12, 3, 10);
blueBuilding1.castShadow = true;
scene.add(blueBuilding1);

const whiteBuilding2 = new THREE.Mesh(new THREE.BoxGeometry(12, 6, 8), whiteBuildingMat);
whiteBuilding2.position.set(12, 3, 10);
whiteBuilding2.castShadow = true;
scene.add(whiteBuilding2);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
