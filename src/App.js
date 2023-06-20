import './App.css';
// import SceneH from './scenes/SceneH';
import HappyOrSad from './scenes/HappyOrSad';
// import SceneF from './scenes/SceneF';
import DragObjs from './scenes/DragObjs';
import EarthSunMoon from './scenes/EarthSunMoon';
// import SceneC from './scenes/SceneC';
import SquareMotion from './scenes/SquareMotion';
import FunnyRocket from './scenes/FunnyRocket';
import { useState } from 'react';

function App() {
  const [scene, setScene] = useState(1);
  return (
    <div className="App">
      
      <div style={{ position: 'absolute', color: 'white', right: '0', bottom: '0', zIndex: 100 }}>
        <button onClick={() => { setScene(1) }} style={{ backgroundColor: `${scene == 1 ? 'gray' : 'white'} `, color: `${scene != 1 ? 'gray' : 'white'}`, height: '40px', width: '120px' }}>Funny Rocket</button>
        <button onClick={() => { setScene(2) }} style={{ backgroundColor: `${scene == 2 ? 'gray' : 'white'} `, color: `${scene != 2 ? 'gray' : 'white'}`, height: '40px', width: '120px' }}>Square Motion</button>
        <button onClick={() => { setScene(3) }} style={{ backgroundColor: `${scene == 3 ? 'gray' : 'white'} `, color: `${scene != 3 ? 'gray' : 'white'}`, height: '40px', width: '120px' }}>Earth Sun & Moon</button>
        <button onClick={() => { setScene(4) }} style={{ backgroundColor: `${scene == 4 ? 'gray' : 'white'} `, color: `${scene != 4 ? 'gray' : 'white'}`, height: '40px', width: '120px' }}>Happy Or Sad</button>
        <button onClick={() => { setScene(5) }} style={{ backgroundColor: `${scene == 5 ? 'gray' : 'white'} `, color: `${scene != 5 ? 'gray' : 'white'}`, height: '40px', width: '120px' }}>Draggable Objects</button>
      </div>

      {scene == 1 && <FunnyRocket />}
      {scene == 2 && <SquareMotion />}
      {scene == 3 && <EarthSunMoon />}
      {scene == 4 && <HappyOrSad />}
      {scene == 5 && <DragObjs />}
    </div>
  );
}

export default App;
