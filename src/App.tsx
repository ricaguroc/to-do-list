import { useState } from 'react';
import './App.css';
import { Tarea } from './components/Tarea.tsx';
import CrearTarea from './components/Tarea.tsx';
import ListarTarea from './components/ListarTareas.tsx'


function App() {

  const [visible, setVisible] = useState(false)

  const [tareas, setTareas] = useState<Tarea[]>([]);

  const agregarTarea = (nuevaTarea: Tarea) => {

    setTareas([...tareas, nuevaTarea]);

  };


  return (
    <>

      <div className='mobile'>
        
        <p>La aplicación no funciona en celulares.</p>

      </div>

      <div className='base'>

          {visible ? (
          <>

            <CrearTarea agregarTarea={agregarTarea} tareas={tareas} setVisible={setVisible} visible={visible}/>

          </>
          ) : (
          <>

            <div className="basico">

              <div>
                
                <button onClick={() => setVisible(!visible)} className='button'>+</button>

              </div>

              <ListarTarea setTareas={setTareas} tareas={tareas}/>

            </div>
          </>
          ) }

      </div>

    </>

  );
}

export default App;
