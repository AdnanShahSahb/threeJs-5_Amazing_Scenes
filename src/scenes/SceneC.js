import "./scene.css"
import * as THREE from "three"
import { useEffect, useState } from "react"
import { OrbitControls } from "../externalJSFiles/orbitControling"
import * as dat from 'lil-gui'
import gsap from "gsap"
import { DirectionalLightHelper, HemisphereLightHelper, LoadingManager } from "three"
import img1 from "../images/a1.png"
import { GLTFLoader } from "../loaders/gltfLoadering"
import * as SkeletonUtils from "../externalJSFiles/skeletoning"
import { SVGLoader } from "../loaders/svgLoading"
import thatSVG from "../svgs/thunderbolting.svg"
import imggg from "../images/uv_grid_opengl.jpg"
import { OBJLoader } from "../loaders/objLoadering"


const SceneC=()=>{

    const [loading,setLoading]=useState(true)

    useEffect(()=>{


        const cloccc=new THREE.Clock();

        // const loadingManager=new LoadingManager();


        const canvas=document.getElementById('webgl3');

        const scene=new THREE.Scene();


        
// ----------------------------- LIGHTS --------------------------------------

// const am=new THREE.AmbientLight(0xfffffff,0.5)
// scene.add(am)
// am.castShadow=true
//it doesnt have any helper


    //  const hemilighting=new THREE.HemisphereLight(0xffffff, 0x444444, 1)
    //         scene.add(hemilighting)
    //         hemilighting.position.z=8;
    //         // scene.add(new HemisphereLightHelper(hemilighting))
    // hemilighting.castShadow=true
    



const directionalLight = new THREE.DirectionalLight(0xfffffff, 1)
scene.add(directionalLight)
            directionalLight.position.z=8;
    directionalLight.castShadow=true    

scene.add(new DirectionalLightHelper(directionalLight))


    // const pointLight = new THREE.PointLight(0xff9000, 5, 10, 2)
    // pointLight.position.set(1, 0, 6)
    // pointLight.castShadow=true

    // scene.add(pointLight)
    // scene.add(new THREE.PointLightHelper(pointLight))


//         // Param: color, intensity, distance, angle, penumbra, decay
// const spotLight = new THREE.SpotLight(0x78ff00,4, 20, Math.PI * 0.1, 0.1, 1)
// spotLight.position.set(0, 0,10)
// // spotLight.target()
// spotLight.target.position.x = - 0.75
// scene.add(spotLight.target)
// scene.add(spotLight)

// scene.add(new THREE.SpotLightHelper(spotLight))


// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 3, 1)
// rectAreaLight.position.set(-1.5, 0, 1.5)
// rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight)    




// ----------------------------- FOR_SHADOWS --------------------------------------
const grassTexture2=new THREE.TextureLoader().load("https://thumbs.dreamstime.com/b/texture-pure-wood-wall-ordinary-old-wooden-hthe-texture-pure-wood-wall-ordinary-wooden-house-70039838.jpg")

const plane=new THREE.Mesh(new THREE.PlaneGeometry(10,10), new THREE.MeshStandardMaterial())
scene.add(plane)
plane.rotation.z=-4
plane.position.z=-4
plane.material.doubleSide=true



// renderer.shadowmap.enabled=true
// cube.castShadow=true;
// directionalLight.castShadow=true;

plane.receiveShadow=true



// ----------------------------- OBJ=>MATERIALS --------------------------------------



//         const grassTexture=new THREE.TextureLoader().load("https://thumbs.dreamstime.com/b/texture-pure-wood-wall-ordinary-old-wooden-hthe-texture-pure-wood-wall-ordinary-wooden-house-70039838.jpg")
//         console.log(grassTexture.isTexture);
//         const cubeGeo=new THREE.BoxGeometry(1,1,1)

//         const matGeo=new THREE.MeshStandardMaterial({
//                 // transparent:true,
//                 // opacity:0.9,
//                 color:'red',
//                 map:grassTexture,
                
//             }
//         )
//         const cube=new THREE.Mesh(cubeGeo,matGeo)
//         // cube.position.set(-2.5,-2,1)
//         cube.position.set(0,0,4)
//         scene.add(cube)
// cube.castShadow=true;


        const sphere=new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshStandardMaterial())
        sphere.position.set(0,-2,1)
        scene.add(sphere)
        sphere.position.set(0,0,4)
        sphere.castShadow=true;
        

        // const torus=new THREE.Mesh(new THREE.TorusGeometry(1,0.1), new THREE.MeshBasicMaterial())
        // torus.position.set(2.5,-2,1)
        // scene.add(torus)

        // sphere.material=matGeo
        // torus.material=matGeo

        //     const hemilighting=new THREE.HemisphereLight(0xffffff, 0x444444, 4)
        //     scene.add(hemilighting)


//----------------------------------GUI--------------------------------------------

        const gui=new dat.GUI({  width: 300 });
        

        gui.add(directionalLight.position,"z").min(0).max(20).step(0.01)
        gui.add(sphere.position,"z").min(-10).max(20).step(0.01)



        // gui.add(cube.position, 'y')
        // gui.add(cube.position, 'x')
        // gui.add(cube.position, 'z').min(- 10).max(10).step(0.01)

        // gui.add(cube.rotation,'x').min(-10).max(10).step(0.01).name("rotationX")
        // gui.add(cube.rotation,'y').min(-10).max(10).step(0.01).name("rotationY")

        // const parameters={
        //     spining:()=>{
        //         gsap.to(cube.rotation,{duration:1,y:cube.rotation.y+10})
        //     }
        // }

        // gui.add(parameters,'spining')

        // gui.add(hemilighting,"intensity").min(-20).max(20).step(0.01)




        const camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,1000)
        scene.add(camera)


        camera.position.set(0,-8,20)

        const renderer=new THREE.WebGLRenderer({canvas:canvas})
        renderer.setSize(window.innerWidth,window.innerHeight)
        renderer.shadowMap.enabled=true;

        
        const control=new OrbitControls(camera,renderer.domElement);
        control.update();
        
        const animating=()=>{
            requestAnimationFrame(animating);
            renderer.render(scene,camera)

            // cube.position.x+=0.01;

            // spotLight.update()
        }
        animating();


        window.addEventListener('resize',()=>{
            camera.aspect=window.innerWidth/window.innerHeight
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth,window.innerHeight)
        })


    },[loading])



    return(
        <>
        <canvas id="webgl3" className="webgl"></canvas>
        </>
    )
}
export default SceneC;