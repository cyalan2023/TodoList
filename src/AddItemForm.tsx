import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox"


type Props = {
    addItem: (title: string) => void
};
export const AddItemForm = ({addItem}: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addItemHandler = () => {
        if (taskTitle.trim() !== '') {
            addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    return (
        <div>
            <TextField
                label="Enter a title"
                variant={'outlined'}
                error={!!error}
                value={taskTitle}
                size={'small'}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
                helperText={error}
            />
            {/*<input*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*    value={taskTitle}*/}
            {/*    onChange={changeItemHandler}*/}
            {/*    onKeyUp={addItemOnKeyUpHandler}*/}
            {/*/>*/}
            {/*<Button title={'+'} onClick={addItemHandler}/>*/}
            {/*<Button variant="contained"  onClick={addItemHandler}>+</Button>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>

        </div>
    );
};