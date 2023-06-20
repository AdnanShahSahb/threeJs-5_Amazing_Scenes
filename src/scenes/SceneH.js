


import './scene.css'
import * as THREE from 'three'
import { useEffect } from 'react'
import { OrbitControls } from "../externalJSFiles/orbitControling";

import * as CANNON from "cannon-es"
import { Sphere, Vec3 } from 'cannon-es';


const SceneH=()=>{

    useEffect(()=>{

        const canvas=document.getElementById('webglHi')
        const scene=new THREE.Scene();

        const box=new THREE.Mesh(new THREE.BoxGeometry(2,2,2), new THREE.MeshNormalMaterial({}))
        scene.add(box)
        
        const sphere=new THREE.Mesh(new THREE.SphereGeometry(2), new THREE.MeshNormalMaterial({}))
        scene.add(sphere)
        

        const plane=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.MeshNormalMaterial({}));
        scene.add(plane)
// -----------------------------------------------------------------------------------------------

        const planePhyMaterial=new CANNON.Material();
        const boxPhyMaterial=new CANNON.Material();
        const spherePhyMaterial=new CANNON.Material();

        //1
        const world=new CANNON.World({
            gravity:new CANNON.Vec3(0,-9.83,0),
        })
        const timeStep=1/60;

        const planePhy=new CANNON.Body({
            shape:new CANNON.Box(new CANNON.Vec3(15,15,0.1)),
            type: CANNON.Body.STATIC,
            material:planePhyMaterial
        })
        world.addBody(planePhy)
        planePhy.quaternion.setFromEuler(-Math.PI/2,0,0)

        const spherePhy=new CANNON.Body({
            shape:new CANNON.Sphere(2),
            mass:2,
            position:new Vec3(1,20,0),
            material:spherePhyMaterial
        })
        world.addBody(spherePhy)

        const boxPhy=new CANNON.Body({
            shape:new CANNON.Box(new CANNON.Vec3(1,1,1)),
            mass:1,
            position:new Vec3(0,25,0),
            material:boxPhyMaterial
        })
        world.addBody(boxPhy)

        spherePhy.linearDamping=0.5;
        spherePhy.angularVelocity.set(0,10,0)
        spherePhy.angularDamping=0.4

        const boxContactMaterial=new CANNON.ContactMaterial(planePhyMaterial,boxPhyMaterial,{friction:0.2,restitution:1})
        const sphereContactMaterial=new CANNON.ContactMaterial(planePhyMaterial,spherePhyMaterial,{restitution:1})

        world.addContactMaterial(boxContactMaterial,sphereContactMaterial)


// -----------------------------------------------------------------------------------------------

        const camera=new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,1000)
        camera.position.set(0,20,-30)
        scene.add(camera)
        const renderer=new THREE.WebGLRenderer({canvas:canvas})
        renderer.setSize(window.innerWidth,window.innerHeight)

        const orby=new OrbitControls(camera,renderer.domElement)
        orby.update();

        const anim=()=>{
            requestAnimationFrame(anim)

            world.step(timeStep)

            plane.position.copy(planePhy.position)
            plane.quaternion.copy(planePhy.quaternion)

            sphere.position.copy(spherePhy.position)
            sphere.quaternion.copy(spherePhy.quaternion)
            
            box.position.copy(boxPhy.position)
            box.quaternion.copy(boxPhy.quaternion)


            renderer.render(scene,camera)

        }
        anim();



    })


    return(
        <canvas id='webglHi' className='webgl'>

        </canvas>
    )
}
export default SceneH;