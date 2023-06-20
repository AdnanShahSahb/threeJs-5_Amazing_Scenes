import { useEffect } from "react";
import * as THREE from "three"
import { DirectionalLightHelper, PointLightHelper } from "three";
import { OrbitControls } from "../externalJSFiles/orbitControling";
import "./scene.css"

const SceneD=()=>{

    useEffect(()=>{
    const group=new THREE.Group();
    const canvas=document.getElementById('webglDee');
    const scene=new THREE.Scene();
    const hemilight=new THREE.AmbientLight('#FFFFFF',0.1)
    scene.add(hemilight)
    const direLight=new THREE.DirectionalLight('#FFFFF',3)
    scene.add(direLight)
    direLight.position.set(-3,0,-30)

    const textu3=new THREE.TextureLoader().load('https://previews.123rf.com/images/voyata/voyata1906/voyata190600087/124867239-design-material-sun-texture-at-center-of-the-solar-system-universe-not-3d-render.jpg')
    const sun=new THREE.Mesh(new THREE.SphereGeometry(1,36,36),new THREE.MeshStandardMaterial({map: textu3,side:THREE.DoubleSide}))
    scene.add(sun)
    sun.position.set(-3,0,-30)
    sun.scale.set(2,2,2)
    const textu=new THREE.TextureLoader().load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSthSZ_f7Hj5HpeeccEls-w1IwcbD08-6AKT5H9AopZQ&s')
    const earth=new THREE.Mesh(new THREE.SphereGeometry(1,36,36),new THREE.MeshStandardMaterial({map: textu,side:THREE.DoubleSide}))
    scene.add(earth)
    earth.position.set(0,0,0)
    // const light=new THREE.PointLight('#FFFFFF',1)
    // scene.add(light)
    // group.add(light)
    // light.position.z=2;
    const textu2=new THREE.TextureLoader().load('https://media.istockphoto.com/photos/moon-surface-picture-id470801450?b=1&k=20&m=470801450&s=170667a&w=0&h=9DoRDGa5E3jFoX0HfIO2YHeAKWu2DK0hwwOxUY2g6xM=')
    const moon=new THREE.Mesh(new THREE.SphereGeometry(1,36,36),new THREE.MeshStandardMaterial({map: textu2}))
    group.add(moon)
    moon.scale.set(0.3,0.3,0.3)
    moon.position.set(0,0,2)
    // scene.add(new PointLightHelper(light))
    const camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,1000) 
    // scene.add(camera)
    camera.position.z=8
    camera.position.x=8
    const renderer=new THREE.WebGLRenderer({canvas:canvas});
    renderer.setSize(window.innerWidth,window.innerHeight)
        
        renderer.shadowMap.enabled=true
        earth.castShadow=true;
        direLight.castShadow=true;
        moon.receiveShadow=true
        earth.receiveShadow=true;
        moon.castShadow=true

    const control=new OrbitControls(camera,renderer.domElement);
    control.update();

    scene.add(group)
    
    const anim=()=>{
    renderer.render(scene,camera)
    requestAnimationFrame(anim)
    group.rotateY(0.01)
    earth.rotation.y+=0.002;
    console.log(moon.receiveShadow);
    }
    anim();

    })


    return(
        <canvas id="webglDee" className="webgl">

        </canvas>
    )
}
export default SceneD;