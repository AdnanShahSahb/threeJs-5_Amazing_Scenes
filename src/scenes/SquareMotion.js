import { useEffect } from "react";
import * as THREE from "three";
import "./scene.css"
import gsap from "gsap"



const SceneB = () => {
  useEffect(() => {


    const canvas = document.getElementById('webgigling');

    const scene = new THREE.Scene();

    const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial('color: 0x00ff00'))
    cube.position.set(0, 0, 0)
    scene.add(cube)

    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 5;

    scene.add(camera)


    const renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    let flaging = true;
    let x = 0;
    let val2;
    for (let val1 = 0; val1 < 20; val1 = val1 + 2) {

      flaging && x++;

      if (flaging === true) {
        val2 = 0 + x;
        gsap.to(cube.position, { duration: 1, delay: val1, x: val2 })
        gsap.to(cube.position, { duration: 1, delay: val1 + 1, y: val2 })
        flaging = false;
      }
      else {
        val2 = 0 - x;
        gsap.to(cube.position, { duration: 1, delay: val1, x: val2 })
        gsap.to(cube.position, { duration: 1, delay: val1 + 1, y: val2 })
        flaging = true;
      }
      console.log(val1);


    }




    // gsap.to(cube.rotation, { duration: 4, delay: 0, y: 10 })
    // gsap.to(cube.position, { duration: 1, delay: 1, y: 1 })
    // gsap.to(cube.position, { duration: 1, delay: 2, x: -1 })
    // gsap.to(cube.position, { duration: 1, delay: 3, y: -1 })
    // gsap.to(cube.position, { duration: 1, delay: 4, x: 2 })
    // gsap.to(cube.position, { duration: 1, delay: 5, y: 2 })
    // gsap.to(cube.position, { duration: 1, delay: 6, x: -2 })
    // gsap.to(cube.position, { duration: 1, delay: 7, y: -2 })


    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    )

    const ticking = () => {
      // cube.rotation.x+=0.4;
      renderer.render(scene, camera)
      window.requestAnimationFrame(ticking);
    }
    ticking();


  }); //USEeFFECT CLOSES

  const content = `
      let flaging=true;<br/>
      let x=0;<br/>
      let val2;<br/>
      for(let val1=0;val1<20;val1=val1+2){<br/>

        flaging && x++;<br/>

      if(flaging===true){<br/>
        val2 = 0 + x;<br/>
      gsap.to(cube.position, {duration: 1, delay: val1, x: val2 })<br/>
      gsap.to(cube.position, {duration: 1, delay: val1+1, y: val2 })<br/>
      flaging=false;<br/>
          }<br/>
      else{<br/>
        val2 = 0 - x;<br/>
      gsap.to(cube.position, {duration: 1, delay: val1, x: val2 })<br/>
      gsap.to(cube.position, {duration: 1, delay: val1+1, y: val2 })<br/>
      flaging=true;<br/>
            }<br/>
      console.log(val1);<br/>`


  const thePara =
    <div style={{ position: 'absolute', color: 'white',width:'100vw' }}>
      <h1 style={{textAlign:'center'}}>Scaling in a square motion using GSAP</h1>
      <p style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: content }}>
      </p>
    </div>

  return <><canvas id="webgigling" className="webgl"></canvas>
    <div>{thePara}</div>
  </>;
};

export default SceneB;
