import "./style/main.css";
import { World } from "./World/World.js";

function main() {
  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Set up the world
  const world = new World(canvas);

  world.render();
}

main();
