import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, Divider, Grid, CardContent } from '@mui/material';
import UseSwitchesCustom from './DarkMode'



class ProfileSetting extends Component {
  render() {
    return (
      <form style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} autoComplete="off" noValidate>
        <Card>
          <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="Setting" />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid  item md={12} xs={12}>
                <p style={{fontWeight:'600', transform: 'translateY(0)', fontSize: '1rem'}}>DarkMode</p>
                {UseSwitchesCustom()}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      statusDarkmode: state.statusDarkmode
  }
}

export default  connect(mapStateToProps)(ProfileSetting);






