import React from "react";
import {Btn} from "./Btn";

type TodoListHeaderPropsType = {
    title: string
}

export const TodoListHeader = ({title}: TodoListHeaderPropsType) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "15px"
        }}>
            <h3 style={{margin: "0"}}>{title}</h3>
            <Btn title="x"/>
        </div>
    );
};

