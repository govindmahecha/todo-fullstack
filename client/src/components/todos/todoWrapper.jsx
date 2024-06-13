import React, { useState, useEffect } from "react";
import { CircularProgress, Container, Fab } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Filters from "./filter"
import Todos from "./todos"
import FormDialog from "./form";
import { getAll } from "../../services/todo.service";
import { FORM_MODE } from "../../utils/constants";

const initialValues = {
  title: undefined,
  description: undefined,
  status: 'To Do'
}

const Wrapper = (props) => {
    const [open, setOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState(initialValues)
    const [selectedFilter, setSelectedFilter] = useState('All')
    const [data, setData] = useState([]);
    const [mode, setMode] = useState(FORM_MODE.NEW)
    const [loading,setLoading] = useState(false);
    

    const fetchTodos = () => {
      getAll(selectedFilter).then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setLoading(false)
      })
    }

    useEffect(() => {
      setLoading(true);
      fetchTodos();
    }, [selectedFilter])

    const handleChange = (value) => {
      setSelectedFilter(value);
    }

    const handleClose = () => {
      // 
      setSelectedForm(initialValues)
      setOpen(false);
      fetchTodos();
    }

    const handleViewOrEdit =(mode, todo) => {
      setMode(mode);
      setSelectedForm(todo)
      setOpen(true);
    }

    return <Container data-testid="wrapper-component">
        <Filters onChange={handleChange} />
        {loading ? <CircularProgress size={14} />:
        <Todos todos={data} onView={(todo) => handleViewOrEdit(FORM_MODE.VIEW, todo)} onEdit={(todo) => handleViewOrEdit(FORM_MODE.EDIT, todo)} />}
        
        <Fab data-testid="add-button" color="primary" sx={{position: 'fixed', bottom: 16, right:16}} onClick={() => { setSelectedForm(initialValues); setMode(FORM_MODE.NEW); setOpen(true)}}>
            <AddIcon />
        </Fab>
        <FormDialog mode={mode} values={selectedForm} open={open} handleClose={handleClose} />
    </Container>
}


export default Wrapper;