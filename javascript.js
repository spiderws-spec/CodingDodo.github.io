
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
// const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

// const image = new BABYLON.GUI.Image("bg", "back.jpg");
// image.stretch = BABYLON.GUI.Image.STRETCH_EXTEND;

// advancedTexture.addControl(image);
// advancedTexture.isForeground = false;
let lookCtrl;
const target = BABYLON.MeshBuilder.CreateSphere("target", { diameter: 0.2 }, scene);

target.visibility = 0;

BABYLON.SceneLoader.ImportMesh("", "./", "model.glb", scene, function(meshes) {

    const skeleton = scene.skeletons[0];
    const headBone = skeleton?.bones.find(b => b.name === "Neck");
     console.log("Bones:", skeleton.bones);

    const material = meshes[0].material;
    const mat = scene.materials[1];

    if (mat.bumpTexture) {
        mat.bumpTexture.level = 1.4;
        mat.environmentIntensity = 0;

    }
    target.position = new BABYLON.Vector3.Zero;
    lookCtrl = new BABYLON.BoneLookController(
        scene.meshes[0],     
        headBone,          // bone
        target.position,   // target
        {
            adjustYaw: Math.PI * 0,
            adjustPitch: Math.PI *0.6,
            adjustRoll: Math.PI *-1
        }
    );
    console.log(mat instanceof BABYLON.PBRMaterial);
    // scene.animationGroups.forEach(g => g.stop());
});
engine.disablePointerLock =false;
scene.preventDefaultOnPointerDown = false;
// camera
const camera = new BABYLON.ArcRotateCamera(
    "cam",
    Math.PI / 2.3,
    Math.PI / 2.3,
    20,
    BABYLON.Vector3.Zero(),
    scene
);
camera.target = new BABYLON.Vector3(1, 3, 0);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
//camera.attachControl(canvas, true);
// const image = new BABYLON.GUI.Image("bg", "Backround.png");

// light
const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 2, 0),
    scene
);
const hemi = new BABYLON.HemisphericLight(
    "hemi",
    new BABYLON.Vector3(1, 2, 0),
    scene
);
light.intensity = 1;
hemi.intensity =0.5;
light.diffuse = new BABYLON.Color3(1.15, 1.15, 1.1);

hemi.groundColor = new BABYLON.Color3(0, 0, 1);

window.addEventListener("mousemove", (e) => {

        const ray = scene.createPickingRay(
            e.clientX,
            e.clientY,
            BABYLON.Matrix.Identity(),
            camera
        );

    
        const distance = 10;
        const dir = new BABYLON.Vector3(
            -ray.direction.x -0.75,
            ray.direction.y+0.125,
            ray.direction.z
        );

        target.position = ray.origin.add(dir.scale(10));
        
});

scene.registerBeforeRender(() => {
    if (lookCtrl) lookCtrl.update();
});

engine.runRenderLoop(() => {

    
    

    const skeleton = scene.skeletons[0];
    

    // if (!headBone)
    // {
    //     return;
    // }



//    bone.translate(
     
//      1232,
//      BABYLON.Space.GLOBAL
//     );

    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});


const panel = document.getElementById("sidePanel");
const content = document.getElementById("panelContent");

const pages = {
    home: `
        <h2>Projects</h2>

        <div class="project">
            <img src="Projects/img1.png"  width="300">
            <p>Pine Forest</p>
        </div>

        <div class="project">
            <img src="Projects/img2.png"  width="300">
            <p>Unfinished Stenonychosaurus Inequalis Skeleton</p>
        </div>
        <div class="project">
            <img src="Projects/img3.png"  width="300">
            <p>Diabloceratops</p>
        </div>

        <div class="project">
            <img src="Projects/img4.png"  width="300">
            <p>Diabloceratops Mesh</p>
        </div>
                <div class="project">
            <img src="Projects/img5.png"  width="300">
            <p>Scorpion</p>
        </div>

        <div class="project">
            <img src="Projects/img6.png"  width="300">
            <p>Scorpion Mesh</p>
        </div>
        <div class="project">
            <img src="Projects/img7.png"  width="300">
            <p>Troodon</p>
        </div>
        <div class="project">
            <img src="Projects/img8.png"  width="300">
            <p>Troodon Mesh</p>
        </div>

        <div class="project">
            <img src="Projects/img9.png"  width="300">
            <p>Dodo Bird</p>
        </div>
                <div class="project">
            <img src="Projects/img10.png"  width="300">
            <p>Dodo Bird Mesh</p>
        </div>

        <div class="project">
            <img src="Projects/img11.png"  width="300">
            <p>Robot</p>
        </div>
                <div class="project">
            <img src="Projects/img12.png"  width="300">
            <p>Robot Mesh</p>
        </div>
                <div class="project">
            <img src="Projects/img13.png"  width="300">
            <p>Spinosaurus</p>
        </div>

        <div class="project">
            <img src="Projects/img14.png"  width="300">
            <p>Spinosaurus Mesh</p>
        </div>
        
    `,
    about: `<h2>About</h2>  <div class="logo"><img src="DodoLogo.svg" alt="Logo"> </div><p class="aboutText">I\'m CodingDodo, a 3D artist and a
     programmer from Canada. I started doing gamedev a few years ago which got me into 3D modeling. When I'm not 
     3D modeling or programming, I play drums,
     play video games and listen to music. If you're interested in my 3D modeling, you can contact me for commission in the contact section.
    
            </p
    `,
    projects: `
  <div class="contact-section">

    <h2>Contact</h2>

    <div class="contact-box">
      <p><strong>Email:</strong> CodingDodo@outlook.com</p>
      <p><strong>Discord:</strong> spirit42_ (Faster Respond Time)</p>
    </div>

    <h2>Commission Pricing - In CAD</h2>

    <div class="pricing-grid">

      <div class="price-card">
        <h3>Sculpt</h3>
        <p class="price">$15 - $30</p>
        <p>Simple Sculpt Without retopology</p>
      </div>

      <div class="price-card">
        <h3>Sculpt + Retopology</h3>
        <p class="price">$30 - $50</p>
        <p>Poly Count adjusted For your needs, with both high poly and Low Poly(normal map included)</p>
      </div>

      <div class="price-card">
        <h3>Textured + Uv unwrap</h3>
        <p class="price">+$5- $10</p>
        <p>Uv Unwrap and texture the Model</p>
      </div>

      <div class="price-card">
        <h3>Rigged + Weights</h3>
        <p class="price">+ $5 - $15</p>
        <p>Rig and weight paint Model</p>
      </div>
      <div class="price-card">
        <h3>Single Animation</h3>
        <p class="price">+$5</p>
        <p>1 Animations for Rigged Model</p>
      </div>
      <div class="price-card">
        <h3>3 Animations</h3>
        <p class="price">+10$</p>
        <p>3 Animations for Rigged Model</p>
      </div>

    </div>

  </div>
`
};
let isOpen = false;
let isAnimating = false;
let currentPage = "home";
let delay = 0;
function switchPanel(page) {
    

    if (isAnimating) return;
    isAnimating = true;

    document.body.classList.remove("panel-open");
    
    if (isOpen)
    {
        delay = 300;
    }
    else
    {
        delay = 0;
    }
    setTimeout(() => {
        if (page != currentPage || isOpen ==false)
        {
            isOpen = true;
            document.body.classList.add("panel-open");
        }
        else
        {
            isOpen = false;
        }
        
        content.innerHTML = pages[page];
        
        currentPage = page;  
        isAnimating = false;
    }, delay);


}

const circle = document.getElementById("cursor-circle");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

let scale = 1;
let targetScale = 1;

let perspective = 800;
let targetPerspective = 10;

let rotX = -10;
let rotY = 25;

let targetRotX = -10;
let targetRotY = 25;
const thresholdY = window.innerHeight * 0.2;


window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (e.clientY < thresholdY || isOpen) {
        targetScale = 0.2;        
        targetPerspective = 1200; 
        targetRotY = 0;
        targetRotX = 0;
        circle.style.zIndex = '10';
    } else {
        targetScale = 1;
        targetPerspective = 800;
        targetRotY = 25;
        targetRotX = -10;
        circle.style.zIndex = '0';
        
    }
});

const circles = document.querySelectorAll(".inner");

const cycle = 2500; 
const restRatio = 0.25; 

circles.forEach((circle, i) => {
  const offset = i * 400;

  function animate(time) {
    const t = (time + offset) % cycle;
    const progress = t / cycle;

    let scale = 1;

    const activeTime = 1 - restRatio;

    if (progress < activeTime) {
   
      const p = progress / activeTime;

     
      scale = 1 + Math.sin(p * Math.PI) * 0.15;
    } else {

      scale = 1;
    }

    circle.style.transform = `scale(${scale })`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
function animate() {


    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    scale += (targetScale - scale) * 0.01;

    
    perspective += (targetPerspective - perspective) * 0.01;

    rotX += (targetRotX - rotX) * 0.02;
    rotY += (targetRotY - rotY) * 0.02;

    circle.style.left = currentX + "px";
    circle.style.top = currentY + "px";

    circle.style.transform =
        `perspective(${perspective}px)
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        translate(-50%, -50%)
        scale(${scale})`;

    

    requestAnimationFrame(animate);
}

animate();