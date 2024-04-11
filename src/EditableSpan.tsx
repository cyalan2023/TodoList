import React, {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";


type Props = {
    oldTitle: string
    updateTitle: (newTitle: string) => void
};
export const EditableSpan = ({oldTitle, updateTitle}: Props) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)


    const editModeHandler = () => {
        setEdit(!edit)
        if (edit) {
            updateTitleHandler()
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }


    const updateTitleHandler = () => {
        updateTitle(newTitle.trim())
    }

    return (
        edit
            ? <TextField
                label="Enter a title"
                variant={'outlined'}
                onBlur={editModeHandler}
                value={newTitle}
                size={'small'}
                onChange={changeTitleHandler}

            />
            : <span onDoubleClick={editModeHandler}>{oldTitle}</span>
    );
};
