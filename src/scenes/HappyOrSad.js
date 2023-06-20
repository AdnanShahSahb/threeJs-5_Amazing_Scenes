import { useEffect, useState } from "react";
import * as THREE from "three"
import { OrbitControls } from "../externalJSFiles/orbitControling";
import "./scene.css"
import * as dat from "lil-gui"

const SceneE=()=>{

    const [face,setFace]=useState("smile");

    useEffect(()=>{
    const canvas=document.getElementById('webglEE');
    const scene=new THREE.Scene()
    const boxL=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:'#008000'}))
    scene.add(boxL)
    boxL.position.set(-2,4,0)
    const boxR=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:'#008000'}))
    scene.add(boxR)
    boxR.position.set(2,4,0)
    const boxM=new THREE.Mesh(new THREE.BoxGeometry(1,2,1),new THREE.MeshBasicMaterial({color:'#008000'}))
    scene.add(boxM)
    const box=new THREE.Mesh(new THREE.BoxGeometry(3,1,1),new THREE.MeshBasicMaterial({color:'#008000'}))
    scene.add(box)
    box.position.set(0,-3,0)

   
    if(face=='smile'){
        const boxLS=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:'#008000'}))
        scene.add(boxLS)
        boxLS.position.set(2,-2,0)
        const boxRS=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:'#008000'}))
        scene.add(boxRS)
        boxRS.position.set(-2,-2,0)
    }

    if(face=="sad"){

        boxL.material.color.setHex(0xFF0000)
        boxR.material.color.setHex(0xFF0000)
        boxM.material.color.setHex(0xFF0000)
        box.material.color.setHex(0xFF0000)

        const boxRS=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:'#FF0000'}))
        scene.add(boxRS)
        boxRS.position.set(2,-4,0)
        const boxLS=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:'#FF0000'}))
        scene.add(boxLS)
        boxLS.position.set(-2,-4,0)
}

    window.onclick=()=>{
        if(face=='smile'){
            setFace('sad')
        }
        else{
            setFace('smile')
        }
    }

    const camera=new THREE.PerspectiveCamera(80,window.innerWidth/window.innerHeight,1,1000)
    scene.add(camera)
    scene.add(new THREE.CameraHelper(camera))
    camera.position.z=20;
    const renderer=new THREE.WebGLRenderer({canvas: canvas})    
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    const controls=new OrbitControls(camera,renderer.domElement)
    controls.update();
    const init=()=>{
        requestAnimationFrame(init)
        renderer.render(scene,camera)
    }
    init();
 })
    return(
        <>
        <canvas id="webglEE" className="webgl"></canvas>
        <p style={{position:'absolute',color:'white'}}>Click to Change Mood</p>
        </>
    )
}
export default SceneE;