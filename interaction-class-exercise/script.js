import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(2, 2, 6);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// Raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// UI
const infoPanel = document.getElementById("infoPanel");
infoPanel.textContent = "Click a cube to see its information here.";

// Cubes
const cubes = [];
let selected = null;
let originalColor = null;

// Create cubes (20+)
for (let i = 0; i < 20; i++) {
    const width = rand(0.3, 1);
    const height = rand(0.3, 1);
    const depth = rand(0.3, 1);

    const geo = new THREE.BoxGeometry(width, height, depth);
    const mat = new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff
    });

    const cube = new THREE.Mesh(geo, mat);

    cube.position.set(
        rand(-4, 4),
        rand(-4, 4),
        rand(-6, -1)
    );

    cube.userData.dimensions = { width, height, depth };
    scene.add(cube);
    cubes.push(cube);
}

// Click event
window.addEventListener("click", (e) => {
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(cubes);

    // Empty space
    if (hits.length === 0) {
        clearSelection();
        infoPanel.textContent = "No object selected.";
        return;
    }

    selectCube(hits[0].object);
});

function selectCube(cube) {
    if (selected && selected !== cube) {
        selected.material.color.set(originalColor);
        selected.scale.set(1, 1, 1);
    }

    selected = cube;
    originalColor = cube.material.color.getHex();

    cube.material.color.set(0xffff00);
    cube.scale.set(1.25, 1.25, 1.25);

    const { x, y, z } = cube.position;
    const { width, height, depth } = cube.userData.dimensions;

    infoPanel.innerHTML = `
        <strong>Position</strong><br>
        x: ${x.toFixed(2)}<br>
        y: ${y.toFixed(2)}<br>
        z: ${z.toFixed(2)}<br><br>

        <strong>Size</strong><br>
        width: ${width.toFixed(2)}<br>
        height: ${height.toFixed(2)}<br>
        depth: ${depth.toFixed(2)}
    `;
}

function clearSelection() {
    if (!selected) return;
    selected.material.color.set(originalColor);
    selected.scale.set(1, 1, 1);
    selected = null;
}

// Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loop
function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// Helpers
function rand(min, max) {
    return Math.random() * (max - min) + min;
}
