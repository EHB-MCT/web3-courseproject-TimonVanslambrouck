const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 4);
camera.rotation.x = -0.5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0.5, 1)
scene.add(cube);

window.addEventListener('keydown', function (event) {
    const KEY = event.key;
    switch (KEY) {
        case 'ArrowUp':
        case 'z':
            console.log('up');
            if (cube.position.z > -4.5) {
                cube.position.z -= 0.1;
            }
            break;
        case 'ArrowDown':
        case 's':
            console.log('down');
            if (cube.position.z < 4.5) {
                cube.position.z += 0.1;
            }
            break;
        case 'ArrowLeft':
        case 'q':
            console.log('left');
            if (cube.position.x > -4.5) {
                cube.position.x -= 0.1;
            }
            break;
        case 'ArrowRight':
        case 'd':
            console.log('right');
            if (cube.position.x < 4.5) {
                cube.position.x += 0.1;
            }
            break;

        default:
            console.log('none');
            break;
    }
})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function guiSettings() {
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    const gui = new dat.GUI();
    const cubeFolder = gui.addFolder('Cube');
    cubeFolder.add(cube.position, 'x', 0, Math.PI * 2).listen();
    cubeFolder.add(cube.position, 'y', 0, Math.PI * 2).listen();
    cubeFolder.add(cube.position, 'z', 0, Math.PI * 2).listen();
    cubeFolder.open();
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(camera.position, 'z', 0, 100).listen();
    cameraFolder.add(camera.position, 'x', 0, 100).listen();
    cameraFolder.add(camera.position, 'y', 0, 100).listen();
    cameraFolder.add(camera.rotation, 'x', -5, 5).listen();
    cameraFolder.add(camera.rotation, 'y', -5, 5).listen();
    cameraFolder.add(camera.rotation, 'z', -5, 5).listen();
}

function addPlane() {
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
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
addWorld();
animate();
guiSettings();
addPlane();