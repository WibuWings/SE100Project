import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import {GiPayMoney} from "react-icons/gi";
import {connect} from 'react-redux';
import React, { Component } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

// ----------------------------------------------------------------------

class EmployeeMoreMenu extends Component {
  // const ref = useRef(null);
  // const [isOpen, setIsOpen] = useState(false);
  
  constructor(props) {
    super(props);
    this.state= {
      change: 'false'
    }
  }
  setIsOpen(val) {
    this.isOpen = val;
    this.setState({change: val});
  }

  edit() {
    this.props.changeUpdateEmployeeStatus();
  }

  isOpen=false;
  render() {
    return (
      <div
        style={{
          position:'relative'
        }}
      >
        <IconButton onClick={() => this.setIsOpen(true)}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </IconButton>
  
        <Menu
          open={this.isOpen}
          style={{
            position:'absolute',
            top: 0,
            right: 0,
          }}
          onClose={() => this.setIsOpen(false)}
          PaperProps={{
            sx: { width: 200, maxWidth: '100%' }
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Icon icon={trash2Outline} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
  
          <MenuItem sx={{ color: 'text.secondary' }}
            onClick={() => this.edit()}
          >
            <ListItemIcon>
              <Icon icon={editFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
          <MenuItem sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <GiPayMoney size={24}/> 
            </ListItemIcon>
            <ListItemText primary="Pay money" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        </Menu>
      </div>
    );
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
    updateEmployeeStatus: state.updateEmpoyeeStatus,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      changeUpdateEmployeeStatus: () => {
          dispatch({
              type: "CHANGE_UPDATE_EMPLOYEE_STATUS",
          });
      },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeMoreMenu);