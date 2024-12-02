import './ListarTareas.css';
import { Tarea } from './Tarea.tsx';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';


interface Props {

    setTareas: React.Dispatch<React.SetStateAction<Tarea[]>>; 
    tareas: Tarea[];
  
}

interface Column {

    title: string;

}

const columns: Record<string,Column> = {
    
    p:{title:"Pendiente"},
    e:{title:"En Progreso"},
    c:{title:"Completado"},

};

  
const ListarTareas: React.FC<Props> = ({ setTareas, tareas}) => {

    const handleExpand = (task:Tarea) => {

        setTareas(tareas.map(tarea => (
            
            tarea.name === task.name ? {...tarea, expanded: !tarea.expanded} : tarea
        
        )))

    }


    const handleDelete = (tarea:Tarea) => {

        setTareas(tareas.filter((task) => (

            task.name !== tarea.name

        )))

    }

    const handleDragEnd = (result: DropResult) => {

        const { destination } = result;
    
        if (!destination) return;

        const updated = tareas.map((tarea) =>
            tarea.name === result.draggableId ? { ...tarea, state: destination.droppableId } : tarea,
        );

        setTareas(updated);

      };

    return (
        <>

        <DragDropContext onDragEnd={handleDragEnd}>
            
            <div className='columnas'>

                {Object.entries(columns).map(([id,column]) => (

                    <Droppable key={id} droppableId={id}>

                        {(provided) => (
                            
                            <div 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`${id}`}
                            > 

                                <h3>{column.title}</h3>

                                {tareas
                                .filter((tarea) => tarea.state === id)
                                .map((tarea,index)=>(
                                    
                                    <Draggable key={tarea.name} draggableId={tarea.name} index={index}>

                                        {(provided)=>(

                                            <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`tarea ${tarea.expanded ? "expandida" : ""}`}
                                            >
                                                <div>
                                                    {tarea.name}
                                                    <button className='flecha' onClick={() => (handleExpand(tarea))}>{tarea.expanded ? '▲' : '▼'}</button>
                                                </div>
                                                
                                                
                                                {tarea.expanded &&
                                                (
                                                    <> 

                                                        <div className='descripcion'>

                                                            <div className='texto'>

                                                                {tarea.description}    
                                                            
                                                            </div>
                                                            
                                                            <div className='boton'>

                                                                <button className='borrar' onClick={() => (handleDelete(tarea))}>X</button>

                                                            </div>

                                                        </div>

                                                    </> 
                                                )}

                                            </div>

                                        )}

                                    </Draggable>

                                ))}

                            </div>

                        )}

                    </Droppable>

                ))}
            
            </div>

        </DragDropContext>

        </>
    );
}

export default ListarTareas;
