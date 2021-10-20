import * as THREE from '/build/three.module.js';

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 4);
camera.rotation.x = -0.5;
// guiSettings(camera, 'camera');
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const gltfLoader = new THREE.GLTFLoader();

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 3);
scene.add(light);

// addCube(1, scene, 0x00ff00, [0, 0.5, 0.5]);
addWorld();
animate();
addPlane();
addModel('./assets/scene.gltf', 0.005, [0, 0, 0]);

import geckos from '@geckos.io/client'

// or add a minified version to your index.html file
// https://github.com/geckosio/geckos.io/tree/master/bundles

const channel = geckos({
    port: 3000
}) // default port is 9208

channel.onConnect(error => {
    if (error) {
        console.error(error.message)
        return
    }

    channel.on('chat message', data => {
        console.log(`You got the message ${data}`)
    })

    channel.emit('chat message', 'a short message sent to the server')
})

function addModel(path, scale, position) {
    gltfLoader.load(path, function (gltf) {
        const object = gltf.scene;
        object.scale.set(scale, scale, scale);
        object.position.set(position[0], position[1], position[2])
        scene.add(object);
        controlKeyboard(object);

    });
}

function addCube(size, scene, color, position) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
        color: color
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position[0], position[1], position[2])
    scene.add(cube);
    controlKeyboard(cube);
    // guiSettings(cube, 'Cube');
}

function controlKeyboard(object) {
    window.addEventListener('keydown', function (event) {
        const KEY = event.key;
        switch (KEY) {
            case 'ArrowUp':
            case 'z':
                console.log('up');
                if (object.position.z > -4.5) {
                    object.position.z -= 0.1;
                }
                break;
            case 'ArrowDown':
            case 's':
                console.log('down');
                if (object.position.z < 4.5) {
                    object.position.z += 0.1;
                }
                break;
            case 'ArrowLeft':
            case 'q':
                console.log('left');
                if (object.position.x > -4.5) {
                    object.position.x -= 0.1;
                }
                break;
            case 'ArrowRight':
            case 'd':
                console.log('right');
                if (object.position.x < 4.5) {
                    object.position.x += 0.1;
                }
                break;

            default:
                console.log('none');
                break;
        }
    })
}



function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// function guiSettings(object, name) {
//     const gui = new dat.GUI();
//     const cameraFolder = gui.addFolder(name);
//     cameraFolder.add(object.position, 'z', 0, 100).listen();
//     cameraFolder.add(object.position, 'x', 0, 100).listen();
//     cameraFolder.add(object.position, 'y', 0, 100).listen();
//     cameraFolder.add(object.rotation, 'x', -5, 5).listen();
//     cameraFolder.add(object.rotation, 'y', -5, 5).listen();
//     cameraFolder.add(object.rotation, 'z', -5, 5).listen();
// }

function addPlane() {
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(groundGeometry, groundMaterial);
    plane.rotation.x = 0.5 * Math.PI;
    scene.add(plane);
}

function addWorld() {
    const worldGeometry = new THREE.BoxGeometry(10, 10, 10);
    const worldMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF
    })
    worldMaterial.side = THREE.BackSide;
    const worldCube = new THREE.Mesh(worldGeometry, worldMaterial);
    scene.add(worldCube);
}