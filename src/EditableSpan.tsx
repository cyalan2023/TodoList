import {ChangeEvent, useState} from "react";


type Props = {
    oldTitle: string
    updateTitle:(newTitle:string)=>void
};
export const EditableSpan = ({oldTitle,updateTitle}: Props) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)



    const editModeHandler=()=>{
        setEdit(!edit)
        if(edit){
            updateTitleHandler()
        }
    }

    const changeTitleHandler=(event: ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(event.currentTarget.value)
    }


    const updateTitleHandler = () => {
        updateTitle(newTitle.trim())
    }

    return (
        edit
            ? <input value={newTitle} onBlur={editModeHandler} autoFocus onChange={changeTitleHandler}/>
            : <span onDoubleClick={editModeHandler}>{oldTitle}</span>
    );
};
