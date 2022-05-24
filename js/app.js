import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.108.0/examples/jsm/loaders/GLTFLoader.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;

let model = new THREE.Object3D();
let modelBody = new THREE.Object3D();

let x = 0,
  y = 0;
let mouseX = 0,
  mouseY = 0;

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(35, WIDTH / HEIGHT, 1, 500);
  camera.position.set(0, 20, 190);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  //alpha : true 배경 투명으로
  renderer.setSize(WIDTH, HEIGHT);
  // renderer.shadowMap.enabled = true;

  document.querySelector(".canvasWrap").appendChild(renderer.domElement);

  {
    //조명 넣기
    var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
    light.position.set(100, 100, 100);
    scene.add(light);
  }
  {
    //조명
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(140, 160, 50);
    scene.add(light);
  }

  gltfLoadFunc("./model/stand/scene.gltf");
};

const gltfLoader = new GLTFLoader();
const gltfLoadFunc = (modelName) => {
  gltfLoader.load(
    modelName,
    (gltf) => {
      model = gltf.scene;
      console.log("root", model);

      let scaleNum = 1.4;
      model.scale.set(scaleNum, scaleNum, scaleNum);

      modelBody.position.set(-100, -23, 20);
      modelBody.add(model);
      scene.add(modelBody);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    }
  );
};

let moveNum = 0;
let scrollTop = 0;

const animate = () => {
  moveNum += (scrollTop / 1000 - moveNum) * 0.1;

  modelBody.rotation.y = moveNum;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

init();
animate();

const scrollFunc = () => {
  scrollTop = window.scrollY;
};

window.addEventListener("scroll", scrollFunc);

let circle;
window.onload = () => {
  circle = document.querySelector(".circle");
  window.addEventListener("mousemove", function (e) {
    x = e.clientX;
    y = e.clientY;
    circle.style.transform = "translate(" + x + "px, " + y + "px )";
  });

  loop();
};

function loop() {
  mouseX += (x - mouseX) * 0.09;
  mouseY += (y - mouseY) * 0.09;
  circle.style.transform = "translate(" + mouseX + "px, " + mouseY + "px )";

  requestAnimationFrame(loop);
}
