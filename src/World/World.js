import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createScene } from "./components/scene";
import { createRenderer } from "./system/renderer";
import { Resizer } from "./system/Resizer";

let camera;
let renderer;
let scene;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    const cube = createCube();

    scene.add(cube);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single fame
    renderer.render(scene, camera);
  }
}

export { World };
