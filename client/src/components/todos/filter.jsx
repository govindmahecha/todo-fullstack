import { Button, Grid, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const FilterMenu = ({onChange}) => {
    const filters = {
        todo: 'To Do',
        inProgress: 'In Progress',
        done: 'Done',
        all: 'All'
    }

    const [activeMenu, setActiveMenu] = useState(filters.all)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (e, value) => {
      setAnchorEl(null);
      setActiveMenu(value);
      onChange(value);
    };

    return (
      <Grid container xs={12} sx={{ justifyContent: "flex-end" }}>
        <Button
            id={"filter-button"}
            variant="text"
            size="small"
            aria-controls={open ? `filter-menu` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {activeMenu}
            {open ? <KeyboardArrowUpIcon fontSize="medium" /> : <KeyboardArrowDownIcon fontSize="medium" />}
          </Button>
       
        <Menu
          id={"filter-menu"}
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(undefined, activeMenu)}
          MenuListProps={{
            "aria-labelledby": `filter-button`,
          }}
        >
          <MenuItem onClick={(event) => handleClose(event, filters.todo) }>To Do</MenuItem>
          <MenuItem onClick={(event) => handleClose(event, filters.inProgress) }>In Progress</MenuItem>
          <MenuItem onClick={(event) => handleClose(event, filters.done) }>Done</MenuItem>
          <MenuItem onClick={(event) => handleClose(event, filters.all) }>All</MenuItem>
        </Menu>
      </Grid>
    );
}

export default FilterMenu;