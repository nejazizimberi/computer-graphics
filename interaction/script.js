import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 600);
document.getElementById("scene").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    75,
    renderer.domElement.width / renderer.domElement.height,
    0.1,
    100
);
camera.position.set(1, 0, 5);
scene.add(camera);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


const raycaster = new THREE.Raycaster();
raycaster.near = 0.0;
raycaster.far = 100;

const mouse = new THREE.Vector2();


const cubes = [];
let lastSelectedCube = null;
let lastSelectedCubeColor = null;

for (let i = 0; i < 30; i++) {

    const size = randBetween(0.2, 1);
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(
        randBetween(-4, 4),
        randBetween(-4, 4),
        randBetween(-5, 0)
    );

    scene.add(cube);
    cubes.push(cube);
}

window.addEventListener("click", (event) => {

    // Correct mouse positioning relative to canvas
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(cubes);

    if (intersects.length > 0) {
        const selectedCube = intersects[0].object;

        if (lastSelectedCube && lastSelectedCube !== selectedCube) {
            lastSelectedCube.material.color.set(lastSelectedCubeColor);
        }

        lastSelectedCube = selectedCube;
        lastSelectedCubeColor = selectedCube.material.color.getHex();

        selectedCube.material.color.set(0xffffff);
    }
});

window.addEventListener('resize', () => {
    const width = renderer.domElement.clientWidth;
    const height = renderer.domElement.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});


function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();


function randBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    return Math.random() * 0xffffff;
}