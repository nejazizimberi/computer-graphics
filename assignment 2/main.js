import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// ---------------- SCENE / CAMERA / RENDERER ----------------
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

// ---------------- LIGHTS ----------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.set(30, 40, 20);
dirLight.castShadow = true;
scene.add(dirLight);

// ---------------- TEXTURES ----------------
const textureLoader = new THREE.TextureLoader();

// IMPORTANT: .href (string) perndryshe del url.lastIndexOf error
const texGrass = textureLoader.load(
  new URL("./texture/grass.webp", import.meta.url).href
);
const texRoad = textureLoader.load(
  new URL("./texture/tilesconcret.jpeg", import.meta.url).href
);
const texWhite = textureLoader.load(
  new URL("./texture/white texture.webp", import.meta.url).href
);
const texBlue = textureLoader.load(
  new URL("./texture/blue texture.webp", import.meta.url).href
);
const texBlack = textureLoader.load(
  new URL("./texture/black texture.webp", import.meta.url).href
);

// color space (Three r152+)
[texGrass, texRoad, texWhite, texBlue, texBlack].forEach((t) => {
  if ("colorSpace" in t) t.colorSpace = THREE.SRGBColorSpace;
});

// repeat settings
texGrass.wrapS = texGrass.wrapT = THREE.RepeatWrapping;
texGrass.repeat.set(12, 12);

texRoad.wrapS = texRoad.wrapT = THREE.RepeatWrapping;
texRoad.repeat.set(6, 6);

texWhite.wrapS = texWhite.wrapT = THREE.RepeatWrapping;
texWhite.repeat.set(2, 1);

texBlue.wrapS = texBlue.wrapT = THREE.RepeatWrapping;
texBlue.repeat.set(2, 1);

texBlack.wrapS = texBlack.wrapT = THREE.RepeatWrapping;
texBlack.repeat.set(2, 1);

// ---------------- GROUND ----------------
const grassMaterial = new THREE.MeshLambertMaterial({ map: texGrass });
const grass = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), grassMaterial);
grass.rotation.x = -Math.PI / 2;
grass.receiveShadow = true;
scene.add(grass);

// roads
const roadMaterial = new THREE.MeshStandardMaterial({ map: texRoad });

const mainRoad = new THREE.Mesh(new THREE.BoxGeometry(8, 0.1, 30), roadMaterial);
mainRoad.position.y = 0.05;
mainRoad.position.z = 5;
mainRoad.receiveShadow = true;
scene.add(mainRoad);

const roadExtension = new THREE.Mesh(
  new THREE.BoxGeometry(40, 0.1, 7),
  roadMaterial
);
roadExtension.position.y = 0.05;
roadExtension.position.z = -20;
roadExtension.position.x = 5;
roadExtension.rotation.y = 20;
roadExtension.receiveShadow = true;
scene.add(roadExtension);

const crossRoad = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 30), roadMaterial);
crossRoad.position.y = 0.05;
crossRoad.position.x = -20;
crossRoad.position.z = -18;
crossRoad.receiveShadow = true;
scene.add(crossRoad);

const sideRoad = new THREE.Mesh(new THREE.BoxGeometry(70, 0.1, 8), roadMaterial);
sideRoad.position.y = 0.05;
sideRoad.receiveShadow = true;
scene.add(sideRoad);

const sideRoad2 = new THREE.Mesh(new THREE.BoxGeometry(12, 0.1, 10), roadMaterial);
sideRoad2.position.y = 0.05;
sideRoad2.position.x = -10;
sideRoad2.position.z = -9;
sideRoad2.receiveShadow = true;
scene.add(sideRoad2);

// ---------------- MATERIALS ----------------
const blueBuildingMat = new THREE.MeshPhongMaterial({ map: texBlue });
const grayBuildingMat = new THREE.MeshPhongMaterial({ map: texBlack });
const whiteBuildingMat = new THREE.MeshPhongMaterial({ map: texWhite });

// ---------------- GLASS ----------------
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x88bbff,
  transparent: true,
  opacity: 0.35,
  roughness: 0.05,
  metalness: 0.0,
  transmission: 0.9,
  thickness: 0.2,
});

const glassWindow = new THREE.Mesh(
  new THREE.BoxGeometry(5, 3, 0.2),
  glassMaterial
);
glassWindow.position.set(10, 3, 6);
glassWindow.rotation.y = Math.PI / 1;
glassWindow.castShadow = true;
scene.add(glassWindow);

const glassWindow2 = new THREE.Mesh(
  new THREE.BoxGeometry(5, 3, 0.2),
  glassMaterial
);
glassWindow2.position.set(-7, 3, -12.7);
glassWindow2.rotation.y = Math.PI / -20;
glassWindow2.castShadow = true;
scene.add(glassWindow2);

// ---------------- TREES ----------------
function createTree(x, z) {
  const tree = new THREE.Group();

  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.45, 3, 10),
    trunkMat
  );
  trunk.position.y = 1.5;
  trunk.castShadow = true;
  tree.add(trunk);

  const leavesMat = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });
  const leaves = new THREE.Mesh(new THREE.SphereGeometry(1.6, 14, 14), leavesMat);
  leaves.position.y = 3.6;
  leaves.castShadow = true;
  tree.add(leaves);

  tree.position.set(x, 0, z);
  scene.add(tree);
}

createTree(-30, 25);
createTree(-25, 18);
createTree(-18, 28);

createTree(22, 25);
createTree(28, 18);
createTree(18, 30);

createTree(-35, -10);
createTree(-28, -18);
createTree(30, -12);
createTree(25, -25);

// ---------------- BUILDINGS ----------------
// ✅ clone material so only this building changes color
const whiteBuilding1Mat = whiteBuildingMat.clone();

const whiteBuilding1 = new THREE.Mesh(
  new THREE.BoxGeometry(25, 3, 7),
  whiteBuilding1Mat
);
whiteBuilding1.position.set(15, 1.5, -23);
whiteBuilding1.rotation.y = 20;
whiteBuilding1.castShadow = true;
scene.add(whiteBuilding1);

const grayBuilding1 = new THREE.Mesh(
  new THREE.BoxGeometry(12, 6, 18),
  grayBuildingMat
);
grayBuilding1.position.set(-8.5, 3, -22);
grayBuilding1.rotation.y = 3;
grayBuilding1.castShadow = true;
scene.add(grayBuilding1);

const blueBuilding1 = new THREE.Mesh(
  new THREE.BoxGeometry(12, 6, 8),
  blueBuildingMat
);
blueBuilding1.position.set(-12, 3, 10);
blueBuilding1.castShadow = true;
scene.add(blueBuilding1);

const whiteBuilding2 = new THREE.Mesh(
  new THREE.BoxGeometry(12, 6, 8),
  whiteBuildingMat
);
whiteBuilding2.position.set(12, 3, 10);
whiteBuilding2.castShadow = true;
scene.add(whiteBuilding2);

// ---------------- LAMPS (click ON/OFF) + BUILDING CLICK ----------------
const lampPosts = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function createLampPost(x, z, rotY = 0) {
  const lamp = new THREE.Group();

  const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 6, 12), poleMat);
  pole.position.y = 3;
  pole.castShadow = true;
  lamp.add(pole);

  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.12), poleMat);
  arm.position.set(0.6, 5.6, 0);
  arm.castShadow = true;
  lamp.add(arm);

  const headMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    emissive: 0x000000,
    emissiveIntensity: 0,
  });
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 0.5), headMat);
  head.position.set(1, 5.55, 0);
  head.castShadow = true;
  lamp.add(head);

  const light = new THREE.SpotLight(0xffeeaa, 0);
  light.position.set(1, 5.45, 0);
  light.angle = Math.PI / 6;
  light.penumbra = 0.35;
  light.decay = 2;
  light.distance = 25;
  light.castShadow = true;

  const target = new THREE.Object3D();
  target.position.set(0, 0, 0);
  lamp.add(target);
  light.target = target;

  lamp.add(light);

  lamp.userData.isOn = false;
  lamp.userData.light = light;
  lamp.userData.head = head;

  lamp.position.set(x, 0, z);
  lamp.rotation.y = rotY;

  scene.add(lamp);
  lampPosts.push(lamp);
  return lamp;
}

createLampPost(-15, 5, Math.PI / 2);
createLampPost(15, 5, Math.PI / 2);
createLampPost(-16, -10, 0);
createLampPost(5, -5, Math.PI / 1);

function toggleLamp(lamp) {
  lamp.userData.isOn = !lamp.userData.isOn;

  if (lamp.userData.isOn) {
    lamp.userData.light.intensity = 2.2;
    lamp.userData.head.material.emissive.setHex(0xffeeaa);
    lamp.userData.head.material.emissiveIntensity = 1.5;
  } else {
    lamp.userData.light.intensity = 0;
    lamp.userData.head.material.emissive.setHex(0x000000);
    lamp.userData.head.material.emissiveIntensity = 0;
  }
}

function onPointerDown(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

  raycaster.setFromCamera(mouse, camera);

  // -------- CLICK BUILDING1: change color (tint) --------
  const hitBuilding = raycaster.intersectObject(whiteBuilding1, false);
  if (hitBuilding.length) {
    whiteBuilding1.userData.toggled = !whiteBuilding1.userData.toggled;

    if (whiteBuilding1.userData.toggled) {
      // keep texture, add tint
      whiteBuilding1.material.color.setHex(0xff4444); // red-ish
    } else {
      whiteBuilding1.material.color.setHex(0xffffff); // normal
    }
    return; // mos vazhdo te lampat
  }

  // collect all meshes from lamps
  const clickableMeshes = [];
  for (const lp of lampPosts) {
    lp.traverse((obj) => {
      if (obj.isMesh) clickableMeshes.push(obj);
    });
  }

  const hits = raycaster.intersectObjects(clickableMeshes, false);
  if (!hits.length) return;

  let obj = hits[0].object;
  while (obj && !lampPosts.includes(obj)) obj = obj.parent;

  if (obj) toggleLamp(obj);
}

renderer.domElement.addEventListener("pointerdown", onPointerDown);

// ---------------- CHARACTER (GLB) + AUTO MOVE ----------------
const gltfLoader = new GLTFLoader();
const clock = new THREE.Clock();

let character = null;
let mixer = null;

const pathPoints = [
  new THREE.Vector3(-10, 0, -2.5),
  new THREE.Vector3(4, 0, -2.5),
  new THREE.Vector3(4, 0, 2.5),
  new THREE.Vector3(-4, 0, 2.5),
  new THREE.Vector3(-4, 0, -2.5),
];

let targetIndex = 0;
const speed = 4.0;
const groundOffsetY = 0.0;

gltfLoader.load(
  new URL("./models/character-male-a.glb", import.meta.url).href,
  (gltf) => {
    character = gltf.scene;

    character.scale.set(1.2, 1.2, 1.2);
    character.position.copy(pathPoints[0]);
    character.position.y = groundOffsetY;

    character.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    scene.add(character);

    if (gltf.animations && gltf.animations.length) {
      mixer = new THREE.AnimationMixer(character);
      const walk =
        gltf.animations.find((a) => /walk/i.test(a.name)) || gltf.animations[0];

      const action = mixer.clipAction(walk);
      action.play();
    }
  },
  undefined,
  (err) => console.error("GLB load error:", err)
);

function updateCharacter(delta) {
  if (!character) return;
  if (mixer) mixer.update(delta);

  const target = pathPoints[targetIndex];
  const pos = character.position;

  const toTarget = new THREE.Vector3().subVectors(target, pos);
  toTarget.y = 0;

  const dist = toTarget.length();
  if (dist < 0.2) {
    targetIndex = (targetIndex + 1) % pathPoints.length;
    return;
  }

  toTarget.normalize();
  pos.addScaledVector(toTarget, speed * delta);
  pos.y = groundOffsetY;

  const lookAtPos = new THREE.Vector3(pos.x + toTarget.x, pos.y, pos.z + toTarget.z);
  character.lookAt(lookAtPos);
}

// ---------------- RESIZE ----------------
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------------- ANIMATE ----------------
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  updateCharacter(delta);

  controls.update();
  renderer.render(scene, camera);
}
animate();
