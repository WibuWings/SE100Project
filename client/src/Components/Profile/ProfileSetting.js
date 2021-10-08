import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, CardContent } from '@mui/material';
import UseSwitchesCustom from './switch'
class ProfileSetting extends Component {
  render() {
    return (
      <form style={{ marginTop: '25px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} autoComplete="off" noValidate>
        <Card>
          <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Setting" />
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

export default ProfileSetting;






