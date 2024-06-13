import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik, Field } from 'formik';
import { todoFormValidationSchema } from '../../utils/validations';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Slide } from '@mui/material';
import { update, create, remove, getById } from '../../services/todo.service';
import { FORM_MODE } from '../../utils/constants';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
export default function FormDialog({mode, values, open, handleClose}) {
  const [initialValues, setInitialValues] = useState(values);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    if(open && mode !== FORM_MODE.NEW) {
      setLoading(true);
      getById(values._id).then((res) => {
        setInitialValues(res.data)
      }).finally(() => {
        setLoading(false)
      })
    }
   
  }, [open, values, mode])
  console.log('initialValues', initialValues);
  const handleSubmit = (values, { setSubmitting, resetForm} ) => {
    if(mode == FORM_MODE.NEW) {
        // create new
        create(values).then(() => {
            handleClose();
            setInitialValues({title: undefined, description: undefined, status: 'To Do'})
            setSubmitting(false);
            resetForm();
        })
    } else if (mode === FORM_MODE.EDIT) {
        // update
        update(values).then(() => {
            handleClose();
            setInitialValues({title: undefined, description: undefined, status: 'To Do'})
            setSubmitting(false);
            resetForm()
        })
    }
  }

  const handleRemove = () => {
    if(values._id) {
      setLoadingDelete(true);
        remove(values._id).then(() => {
            handleClose();
            setInitialValues({title: undefined, description: undefined, status: 'To Do'})
        })
        .finally(() => {
          setLoadingDelete(false)
        })
    }
  }
  const statusOptions = ['To Do', 'In Progress', 'Done'];

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        {mode === FORM_MODE.NEW && <DialogTitle>New Todo</DialogTitle>}
        {mode === FORM_MODE.EDIT && <DialogTitle>Update Todo</DialogTitle>}
        {mode === FORM_MODE.VIEW && <DialogTitle>View Todo</DialogTitle>}
        {loading ? <CircularProgress size={20}/> : 
         <Formik
         initialValues={initialValues}
         validationSchema={todoFormValidationSchema}
         onReset={() => {

         }}
         values={values}
         onSubmit={handleSubmit}
       >
         {({ errors, touched, isSubmitting }) => (
           <Form>
               <DialogContent >
         {mode === 'new' && <DialogContentText sx={{mb: 3}}>
           To add a new task to your list, please provide the details below.
           Keep track of your to-dos effortlessly!
         </DialogContentText>}
         {mode === 'edit' && <DialogContentText sx={{mb: 3}}>
           You can update or remove todo.just update details below or click on remove button to delete.
         </DialogContentText>}
             <Field
               as={TextField}
               name="title"
               margin="normal"
               label="title"
               disabled={isSubmitting}
               InputProps={{ readOnly: mode === FORM_MODE.VIEW }} 
               fullWidth
               error={errors.title && touched.title}
               helperText={errors.title && touched.title ? errors.title : ""}
             />
             <Field
               as={TextField}
               name="description"
               margin="normal"
               label="Description"
               multiline
               rows={3}
               disabled={isSubmitting}
               fullWidth
               InputProps={{ readOnly: mode === FORM_MODE.VIEW }} 
               error={errors.description && touched.description}
               helperText={errors.description && touched.description ? errors.description : ""}
             />
             <Field name="status" >
               {({ field }) => (
                 <FormControl  margin="normal" fullWidth>
                   <InputLabel>Status</InputLabel>
                   <Select readOnly={mode === FORM_MODE.VIEW} {...field} label="Status" disabled={isSubmitting}>
                     {statusOptions.map((option) => (
                       <MenuItem key={option} value={option}>
                         {option}
                       </MenuItem>
                     ))}
                   </Select>
                 </FormControl>
               )}
             </Field>
             </DialogContent>
             <DialogActions>
               {isSubmitting || loadingDelete && <CircularProgress size={12}/> }
               {mode !== FORM_MODE.NEW && <Button onClick={() => handleRemove()} color="error">Delete</Button>}
         <Button onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
        {mode !== FORM_MODE.VIEW && <Button type="submit" disabled={isSubmitting}>{mode == 'new' ? 'Create New': 'Update'}</Button>} 
       </DialogActions>
           </Form>
         )}
       </Formik>}
       
       
      </Dialog>
    </React.Fragment>
  );
}