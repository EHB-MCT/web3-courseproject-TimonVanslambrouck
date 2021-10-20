import { SocketService } from './../socket.service';
import { Component, OnInit } from '@angular/core';
// import * as dat from 'dat.gui';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {

  constructor(
    private socketService: SocketService
  ) {}

  

  private scene = new THREE.Scene();
  private axesHelper = new THREE.AxesHelper(5);
  private camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private gltfLoader = new GLTFLoader();
  private renderer = new THREE.WebGLRenderer();
  // private gui = new dat.GUI();



  ngOnInit(): void {
    this.renderer.render(this.scene, this.camera);
    this.scene.add(this.axesHelper);
    this.camera.position.set(0, 2, 4);
    this.camera.rotation.x = -0.5;
    this.guiSettings(this.camera, 'camera');
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.addWorld();
    this.addPlane();
    // this.addModel('assets/scene.gltf', 0.005, [0, 0, 0]);
    this.addCube(1, 0x00ff00, [0, 0.5, 0.5]);
    this.animate();
  }
  addCube(size: number, color: number, position: number[]) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
        color: color
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position[0], position[1], position[2])
    this.scene.add(cube);
    this.controlKeyboard(cube);
    this.guiSettings(cube, 'cube');
  }

  addModel(path: string, scale: number, position: number[]) {
    const scene = this.scene;
    const controlKeyboard = (object: THREE.Group) => {
      this.controlKeyboard(object);
    }
    this.gltfLoader.load(path, function (gltf) {
      const object = gltf.scene;
      object.scale.set(scale, scale, scale);
      object.position.set(position[0], position[1], position[2])
      scene.add(object);
      controlKeyboard(object);
    });
  }

  addLight() {
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 3);
    this.scene.add(light);
  }

  addWorld() {
    const worldGeometry = new THREE.BoxGeometry(10, 10, 10);
    const worldMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF
    })
    worldMaterial.side = THREE.BackSide;
    const worldCube = new THREE.Mesh(worldGeometry, worldMaterial);
    this.scene.add(worldCube);
  }

  addPlane() {
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(groundGeometry, groundMaterial);
    plane.rotation.x = 0.5 * Math.PI;
    this.scene.add(plane);
  }

  controlKeyboard(object: any) {
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

  guiSettings(object: any, name: string) {
    // const folder = this.gui.addFolder(name);
    // folder.add(object.position, 'z', 0, 100).listen();
    // folder.add(object.position, 'x', 0, 100).listen();
    // folder.add(object.position, 'y', 0, 100).listen();
    // folder.add(object.rotation, 'x', -5, 5).listen();
    // folder.add(object.rotation, 'y', -5, 5).listen();
    // folder.add(object.rotation, 'z', -5, 5).listen();
}

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }


}

