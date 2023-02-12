import { Mesh, MeshBasicMaterial, BoxGeometry } from "three";

function createCube() {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshBasicMaterial();

  return new Mesh(geometry, material);
}

export { createCube };
