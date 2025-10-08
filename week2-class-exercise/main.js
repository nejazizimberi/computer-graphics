import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(3,3,3);
// const material = new THREE.MeshBasicMaterial({color:0x48CAE4});
// const cubeMesh = new THREE.Mesh(geometry, material);
// scene.add(cubeMesh);

//Change object position
// cubeMesh.position.x = 0.7
// cubeMesh.position.y = 0.6
// cubeMesh.position.z = 1
// cubeMesh.position.set(0.7, -0.6, 1)

//console.log("Instance to camera", cubeMesh.position.distanceTo(camera.position))

//Axes helper

const axes = new THREE.AxesHelper(5)
scene.add(axes)

//Scale objects
// cubeMesh.scale.x = 2
// cubeMesh.scale.y = 0.25
// cubeMesh.scale.z = 0.5

//Rotating objects
// cubeMesh.rotation.x = Math.PI*0.25
// cubeMesh.rotation.y = Math.PI*0.25

//Applying all transformations at once
// cubeMesh.position.x = 0.7
// cubeMesh.position.y = 0.6
// cubeMesh.position.z = 1
// cubeMesh.scale.x = 2
// cubeMesh.scale.y = 0.25
// cubeMesh.scale.z = 0.5
// cubeMesh.rotation.x = Math.PI*0.25
// cubeMesh.rotation.y = Math.PI*0.25

//Scene graph
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1,10,10),
    new THREE.MeshBasicMaterial({color:0xff0000})
)

sphere1.position.x = -3
group.add(sphere1)

const cylinder2 = new THREE.Mesh(
    new THREE.CylinderGeometry(1,1,3,10),
    new THREE.MeshBasicMaterial({color:0x48CAE4})
)

cylinder2.position.x = 0
group.add(cylinder2)

const cone3 = new THREE.Mesh(
    new THREE.ConeGeometry(1,3,16),
    new THREE.MeshBasicMaterial({color:0x74C365})
)

cone3.position.x = 3
group.add(cone3)


const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);

function animate(){
    requestAnimationFrame(animate);
 //   cubeMesh.rotation.x += 0.01;
 //   cubeMesh.rotation.y += 0.01;
    renderer.render(scene,camera);
}

animate();