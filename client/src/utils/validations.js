import { object, string } from 'yup';
/**
 * forkim validation
 */
const loginValidationSchema = object({
    email: string().email('Invalid email address').required('Email is required'),
    password: string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });


const todoFormValidationSchema = object().shape({
  title: string()
    .required('Title is required'),
  description: string()
    .required('Description is required'),
  status: string()
    .required('Status is required')
    .oneOf(['To Do', 'In Progress', 'Done'], 'Status must be either "To Do", "In Progress", or "Done"'),
});



export {
    loginValidationSchema,
    todoFormValidationSchema
}

