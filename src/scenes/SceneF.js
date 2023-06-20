import { useEffect } from "react";
import * as THREE from "three"
import { OrbitControls } from "../externalJSFiles/orbitControling";
import "./scene.css"
import * as dat from "lil-gui"

const SceneF=()=>{

    useEffect(()=>{
        const canvas=document.getElementById('webglFF')
        const scene=new THREE.Scene();
        // scene.add(new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshNormalMaterial()))

        const partGeo=new THREE.SphereGeometry(1,32,32)

        const count=5000;
        const pos= new Float32Array(count)
        console.log(pos);
        

        for(let i=0;i<count*3;i++){
            pos[i]=(Math.random()-0.5)*10       //SO NOT IN (0.9384) BUT IN (1.9384) OR (2.9384) 
            
        }

        partGeo.setAttribute('position',new THREE.BufferAttribute(pos,3))

        const particlesMaterial=new THREE.PointsMaterial({size:0.02,sizeAttenuation:true});
        const obj=new THREE.Points(partGeo, particlesMaterial);
        scene.add(obj)


        const camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,1000);
        scene.add(camera)
        camera.position.z=5;
        const renderer=new THREE.WebGLRenderer({canvas:canvas});
        renderer.setSize(window.innerWidth,window.innerHeight)
        const orbiting=new OrbitControls(camera,renderer.domElement)
        orbiting.update();

        const anim=()=>{
            requestAnimationFrame(anim)
        renderer.render(scene,camera)

        
        // console.log(obj.position.z);
        // obj.position.z+=0.01;
            

        // if(obj.position.z>2)
        // obj.position.z=-5;

    }
    anim();
    })
    return(
        <>
        <button>asdfj</button>
        <canvas id="webglFF" className="webgl">

        </canvas>
        </>
    )
}

export default SceneF;