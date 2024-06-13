import { Button, Card, CardActions, CardContent, Grid, IconButton, Typography, Zoom } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { useState } from "react";

export default function Todo({ todo, index, onView, onEdit }) {
    const [showHover, setShowHover] = useState(false);

    return  <Zoom in={true} style={{ transitiondelay: `${300 * index}ms` }}>
        <Grid onMouseEnter={() => setShowHover(true)} onMouseLeave={() => setShowHover(false)} item xs={12} sm={6} md={4} rowSpacing={2} columnSpacing={2}>
            <Card>
                <CardContent>
                    <Typography fontSize={14} color="text.primary">{todo.title}</Typography>
                    <Typography color="text.secondary" fontSize={13} sx={{
                        pt: 1,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        lineHeight: 1.2,

                    }}>
                        {todo.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container>
                        <Grid item xs={3} sx={{ pl: 1, display: "flex", alignItems: "center" }}>
                            <Typography variant='span' color="text.secondary" fontSize={10}>{moment(todo.updatedAt).format('DD MMM')}</Typography>
                        </Grid>
                        <Grid item xs={9} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            
                            
                                <Zoom in={showHover}>
                                   <IconButton color="disabled" onClick={() => onEdit(todo)}> <EditIcon fontSize="small" color="disabled" /></IconButton></Zoom>
                                <Zoom in={showHover}>
                                    <IconButton color="disabled" onClick={() => onView(todo)}><VisibilityIcon fontSize="small" color="disabled" /></IconButton></Zoom>
                                
                                <Typography variant="span" color="primary" fontSize={12}>{todo.status}</Typography>
                            
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
        </Zoom>
}