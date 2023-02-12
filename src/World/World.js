import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createLights } from "./components/lights";
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
		const lights = createLights();

		scene.add(cube, lights);

		const resizer = new Resizer(container, camera, renderer);

		resizer.noop();
	}

	render() {
		// draw a single fame
		renderer.render(scene, camera);
	}
}

export { World };
