import './style/main.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.IcosahedronGeometry(20, 1)
const material = new THREE.MeshNormalMaterial()
// Material Props.
material.wireframe = true
// Create Mesh & Add To Scene
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  5000
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 50
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
// controls.enableZoom = false
controls.enablePan = false
controls.dampingFactor = 0.05
controls.maxDistance = 1000
controls.minDistance = 30
controls.touches = {
  ONE: THREE.TOUCH.ROTATE,
  TWO: THREE.TOUCH.DOLLY_PAN,
}

const stats = Stats()
document.body.appendChild(stats.dom)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * GUI Controls
 */
const settings = {
  rotate: true
}
const gui = new dat.GUI()
const geometryFolder = gui.addFolder('Geometry')
geometryFolder.add(mesh.rotation, 'x', 0, Math.PI * 2)
geometryFolder.add(mesh.rotation, 'y', 0, Math.PI * 2)
geometryFolder.add(mesh.rotation, 'z', 0, Math.PI * 2)
geometryFolder.add(settings, 'rotate')
geometryFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 50)
cameraFolder.open();

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  if (settings.rotate) {
    stats.begin()
    //mesh.rotation.y += 0.01 * Math.sin(1)
    //mesh.rotation.y += 0.01 * Math.sin(1)
    mesh.rotation.z += 0.01 * Math.sin(1)
    stats.end()
  }

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  stats.update()

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
