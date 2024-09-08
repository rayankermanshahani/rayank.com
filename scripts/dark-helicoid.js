// creating scene object 
let scene = new THREE.Scene();

// creating camera object 
let camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.01, 1000); 
// camera position
camera.position.set(40, 40, 40); 
scene.add(camera);

// creating renderer object 
let renderer = new THREE.WebGLRenderer(); 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); 

// handle window resizing
window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight); 
  camera.aspect = window.innerWidth / window.innerHeight; 
  camera.updateProjectionMatrix(); 
});

// material for helicoid
let material = new THREE.MeshBasicMaterial({
  // color: 0xb9baca,
  color: 0xcccccc,
  wireframe: true
}); 

// function for helicoid parameters 
function Helicoid(u, v, target) {
  let alpha = Math.PI * 2 * (u - 0.5);
  let theta = Math.PI * 2 * (v - 0.5);
  let c = 8;

  let x = 6 * alpha * Math.cos(theta);
  let z = 6 * alpha * Math.sin(theta); 
  let y = c * theta;
  target.set(x, y, z);
}

// geometry for helicoid 
let geometry = new THREE.ParametricGeometry(Helicoid, 1, 77);

// creating Mesh
let helicoid = new THREE.Mesh(geometry, material);
scene.add(helicoid);

// camera direction 
camera.lookAt(new THREE.Vector3(0, 11, 0)); 
// lightsource 
let directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
scene.add(directionalLight);
// dark background 
scene.background = new THREE.Color(0x1e1f21);  

// rendering 
let render = (step) => {
  window.requestAnimationFrame(render);
  helicoid.rotation.y -= 0.015;

  renderer.render(scene, camera); 
};
window.requestAnimationFrame(render);
