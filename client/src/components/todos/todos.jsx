import React from 'react'
import { Grid, Typography, Zoom } from "@mui/material";
import Todo from './todo';

const Todos = ({todos, onView, onEdit}) => {
    return <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {todos.length === 0 && <Typography color="text.secondary">No Results Found</Typography>}
        {todos.map((todo, index) => {
            return <Todo key={todo._id} todo={todo} index={index} onView={onView} onEdit={onEdit} ></Todo>
        })}
  </Grid>
}

export default Todos;