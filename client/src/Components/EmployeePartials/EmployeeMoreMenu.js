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
    this.myRef = React.createRef();
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
      <>
        <IconButton ref={this.myRef} onClick={() => this.setIsOpen(true)}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </IconButton>
  
        <Menu
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
          open={this.isOpen}
          onClose={() => this.setIsOpen(false)}
          anchorEl={this.myRef.current}
          // PaperProps={{
          //   sx: { width: 200, maxWidth: '100%' }
          // }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
          <MenuItem sx={{ color: 'text.secondary' }}
            onClick={()=> this.props.changePayEmployeeStatus()}
          >
            <ListItemIcon>
              <GiPayMoney size={24}/> 
            </ListItemIcon>
            <ListItemText primary="Pay money" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        </Menu>
      </>
    );
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
    updateEmployeeStatus: state.updateEmpoyeeStatus,
    payEmployeeStatus: state.payEmployeeStatus,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      changeUpdateEmployeeStatus: () => {
          dispatch({
              type: "CHANGE_UPDATE_EMPLOYEE_STATUS",
          });
      },
      changePayEmployeeStatus: () => {
        dispatch({
            type: "CHANGE_PAY_EMPLOYEE_STATUS",
        });
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeMoreMenu);