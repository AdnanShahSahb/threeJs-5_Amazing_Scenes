import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "../loaders/gltfLoadering";
import * as SkeletonUtils from "../externalJSFiles/skeletoning";
import { OrbitControls } from "../externalJSFiles/orbitControling";
import { SVGLoader } from "../loaders/svgLoading";
import theSVG from "../svgs/thunderbolting.svg"
import "./scene.css"
import img from "../images/cringey.jpg"



const SceneA = () => {

  const [loader, setloader] = useState(true)


  useEffect(() => {

    let scene;
    let camera;
    // let renderer;
    let modal;
    let thunderBolt;
    let lathe;
    let grouping = new THREE.Group()


    //CREATING CANVAS------------------------------------------------------------
    const canvas = document.querySelector('#webgl')

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });


    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio);

    //CREATING A SCENE--------------------------------------------------------------------
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 2, 5000)


    camera.position.z = 20;
    camera.position.y = 10;
    camera.lookAt(0, 1, 0);



    // AROUND THE OBJ------------------------------------------------------------------------
    const points = [];
    for (let i = 0; i < 5; i++) {
      points.push(new THREE.Vector2(1, i));
    }
    const geometry = new THREE.LatheGeometry(points);
    const textLoader = new THREE.TextureLoader();

    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, map: textLoader.load(img) });
    lathe = new THREE.Mesh(geometry, material);

    // scene.add( lathe );
    lathe.position.y = -1

    grouping.add(lathe)

    //SETTING OBJ MODAL--------------------------------------------------------------------
    const convertedObj = new URL("../modals/Soldier.glb", import.meta.url);

    const loader = new GLTFLoader();

    loader.load(convertedObj.href, function (gltfff) {
      // console.log(gltfff,gltfff.scene);


      modal = SkeletonUtils.clone(gltfff.scene);



      modal.scale.set(1.4, 1.4, 1.4)
      modal.rotation.set(0, 3.1, 0)
      modal.position.y = -1
      modal.position.z = 5.5


      // WRAP TEXTURE/COLOR -------------------------------------------------
      modal.traverse(function (obj) {
        if (obj.isMesh)
          //   obj.material.color.set("GREEN")
          obj.material.map = new THREE.TextureLoader().load(img)
      })

      // scene.add(modal);
      grouping.add(modal)
      grouping.add(lathe)
      console.log(modal);
      animate();
    });

    // ADDING LIGHT----------------------------------------------------------
    const hemilighting = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
    hemilighting.position.set(0, 1, 0);
    scene.add(hemilighting)

    // ADDING BRIGHTNESS----------------------------------------------------------
    const brightening = new THREE.DirectionalLight(0xffffff, 3)
    brightening.position.set(0, 1, 0)
    scene.add(brightening)

    // SETTING CONTROLLS --------------------------------------------------------
    const controling = new OrbitControls(camera, renderer.domElement)
    controling.update();



    //ADDING SVG----------------------------------------------------------------
    const addingSVG = new SVGLoader();
    // console.log(theSVG);


    addingSVG.load(theSVG,
      function (data) {
        const paths = data.paths;
        thunderBolt = new THREE.Group();

        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];

          const material = new THREE.MeshPhongMaterial(({

            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false,
            // wireframe:true,

          }))

          const shapes = SVGLoader.createShapes(path)
          // console.log(shapes);

          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j]
            const geometry = new THREE.ShapeGeometry(shape)
            const mesh = new THREE.Mesh(geometry, material)
            thunderBolt.add(mesh)
          }
        }

        // scene.add(thunderBolt)

        thunderBolt.scale.set(0.05, 0.05, 0.05)
        thunderBolt.position.y = -1
        thunderBolt.position.z = 0

        grouping.add(thunderBolt)

      }
    )

    const clock = new THREE.Clock()


    scene.add(grouping)
    setloader(false)
    let speeding = 0.01;
    let groupSpeeding = 0.0001;

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)


      if (modal.position.z > 0) {
        modal.position.z -= 0.04;
      }
      else {
        const timing = clock.getElapsedTime()
        if (timing < 10) {
          speeding += 0.001;
          thunderBolt.rotateY(speeding)
        }
        else {
          thunderBolt.rotateY(1)
          grouping.rotation.y += 0.01;
          if (timing > 15)
            groupSpeeding += 0.001;
          grouping.position.y += groupSpeeding
        }
        console.log(timing);
      }

    }

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight  //but it will need update as we resize the window
      camera.updateProjectionMatrix();// it needs to be called after updating projection matrix
      renderer.setSize(window.innerWidth, window.innerHeight)//it updates/thanks to it
    })


  })//USEeFFECT CLOSES


  return (
    <>
      {loader ? <div style={{ position: 'absolute', zIndex: 101, color: 'black' }}>
        <canvas id="webgl" className="webgl"></canvas> {/**so it doesnt give me undefined error */}
        <h1 >Loading...</h1>
      </div>
        :
        <>
          <svg viewBox='0 0 400 400' style={{ position: 'absolute', zIndex: 300, height: '90vh', width: '400px', right: '0', top: '50' }}>
            {/* <line x1="100" y1="0" x2="100" y2="500" stroke='white' />
            <line x1="200" y1="0" x2="200" y2="500" stroke='white' />
            <line x1="300" y1="0" x2="300" y2="500" stroke='white' />
            <line x1="400" y1="0" x2="400" y2="500" stroke='white' />

            <line x1="0" y1="100" x2="400" y2="100" stroke='white' />
            <line x1="0" y1="200" x2="400" y2="200" stroke='white' />
            <line x1="0" y1="300" x2="400" y2="300" stroke='white' />
            <line x1="0" y1="400" x2="400" y2="400" stroke='white' />
            <line x1="0" y1="500" x2="400" y2="500" stroke='white' /> */}
            <text x="330" y="-40" textAnchor="middle" fill="brown" fontSize="64" fontWeight="bolder">Btns</text>

            <path d="M300,0 C200,100 100,300 100,400 z" fill='brown' />
            <path d="M50,350 C 75,400 85,410 75,450 " stroke='brown' fill="brown" />
            <path d="M75,450 C100,425 110,435 150,430 " stroke='brown' fill="brown" />
            {/* C100,425 110,435 75,450 150,450  */}
            {/* <path d="M75,200 30,100" stroke='white' /> */}
          </svg>
          <canvas id="webgl" className="webgl"></canvas>
          <p style={{ position: 'absolute', color: 'white',fontSize:'20px' }}>ITS FUNNY AINT IT 😆</p>
        </>
      }
    </>
  );
};
export default SceneA;
