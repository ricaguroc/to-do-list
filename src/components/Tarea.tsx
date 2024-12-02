import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod"

import { useState } from "react";

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import './Tarea.css';

import React from "react";


const schema = z.object({

    name: z.string().min(1,'Required'),
    description: z.string().optional(),
    state: z.string().default('p'),
    expanded: z.boolean().default(false)

})


export type Tarea = z.infer<typeof schema>;
  
interface Props {

    agregarTarea: (tarea: Tarea) => void;
    tareas: Tarea[];
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    visible: boolean;
  
}

const CrearTarea: React.FC<Props> = ({agregarTarea, tareas, setVisible, visible}) => {

    const {control, handleSubmit, reset, formState: { errors } } = useForm<Tarea>({

        resolver: zodResolver(schema)

    });

    const [error,setError] = useState<string>()

    const onSubmit: SubmitHandler<Tarea> = (data) => {
    
        if(tareas.some((tarea) => (tarea.name === data.name))) {

            setError(`${data.name} ya existe`)

        } else {

            agregarTarea(data);
            setVisible(!visible);
            reset();

        }
    
    }

    return (

        <div className="basic">

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="preguntas">

                    <div className="n">

                        <label htmlFor="name"><h3>Nombre</h3></label>
                        <Controller name="name" control={control} render={({field}) => <input id="name" type="text" {...field} className={`form-control ${errors.name || error ? "is-invalid" : ""}`}></input>}/>
                        {errors.name && <p className="error">{errors.name.message}</p>}
                        <p className="error">{error}</p>

                    </div>
                    
                    <hr />

                    <div className="d">

                        <label htmlFor="description"><h3>Descripción</h3></label>
                        <Controller name="description" control={control} render={({field}) => <input id="description" type="text" {...field} className="form-control"></input>}/>

                    </div>
                    <hr />

                </div>
                
                <div className="botones">

                    <button type="submit" className="ok">+</button>
                    <button onClick={() => setVisible(!visible)} className="no" >x</button>

                </div>

            </form>

        </div>

    );
}

export default CrearTarea;
