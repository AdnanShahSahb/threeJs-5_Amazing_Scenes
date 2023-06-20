import { useEffect } from "react";
import * as THREE from "three"
import "./scene.css"
// import { OrbitControls } from "../externalJSFiles/orbitControling";
const SceneG = () => {


    useEffect(() => {
        const canvas = document.getElementById('webglGee')
        const scene = new THREE.Scene();
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 'white' }))
        scene.add(plane)
        plane.position.set(0, 0, 0)
        // plane.rotation.set(0,0,0)

        var ambientLight = new THREE.AmbientLight(0xffffff, 5);
        scene.add(ambientLight);

        const obj1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: 'red', transparent: true }))
        scene.add(obj1)
        obj1.position.set(-1, 0, 0.25)
        const obj2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: 'black', transparent: true }))
        scene.add(obj2)
        obj2.position.set(0, 0, 0.25)
        const obj3 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: 'blue', transparent: true }))
        scene.add(obj3)
        obj3.position.set(1, 0, 0.25)
        const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000)
        scene.add(camera)
        camera.position.set(0, -4, 4)
        camera.rotation.set(1, 0, 0)
        // camera.position.set(0,-3,10)

        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        // const controling=new OrbitControls(camera,renderer.domElement)
        // controling.update();

        obj1.userData.draggable = true;
        obj2.userData.draggable = true;
        obj3.userData.draggable = true;

        obj1.userData.name = "red";
        obj2.userData.name = "black";
        obj3.userData.name = "blue";

        plane.userData.ground = true;

        const raycaster = new THREE.Raycaster();
        const clickingMouse = new THREE.Vector2();
        const movingMouse = new THREE.Vector2();
        var isDraggable = THREE.Object3D;

        window.addEventListener('click', (e) => {
            clickingMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            clickingMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(clickingMouse, camera)
            const intersecting = raycaster.intersectObjects(scene.children);

            if (isDraggable && isDraggable.userData !== undefined) {
                isDraggable.material.opacity = 1
                isDraggable = null;
                console.log('drop obj');
                return false;
            }

            if (intersecting.length > 1) {
                isDraggable = intersecting[0].object
                console.log('pick obj');
                isDraggable.material.opacity = 0.7
            }
            // console.log(isDraggable);

        })


        window.addEventListener('mousemove', (e) => {

            movingMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            movingMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            if (isDraggable) {
                raycaster.setFromCamera(movingMouse, camera)
                const intersecting = raycaster.intersectObjects(scene.children)

                if (intersecting.length > 0) {
                    for (let o of intersecting) {
                        if (isDraggable.position && o.object.userData.ground) {
                            console.log(isDraggable.position);
                            isDraggable.position.x = o.point.x
                            isDraggable.position.y = o.point.y
                        }
                    }
                }


            }
        })



        const anim = () => {
            requestAnimationFrame(anim)
            renderer.render(scene, camera)
        }
        anim();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }, [])


    return (
        <>
            <canvas id="webglGee" className="webgl"></canvas>
            <p style={{ position: 'absolute', color: 'white', textAlign: 'left' }}>
                1) Click obj to pick the obj<br />
                2) Move the obj<br />
                3) click anywhere to drop the obj<br />
            </p>
        </>
    )
}
export default SceneG;