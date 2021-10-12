import React, { Component } from 'react';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Button } from '@mui/material';

const productTypes =[
     'food', 'detergent', 'cuisine'
];

class GoodImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
          type: 'none', 
        };
      }
    btnClick () {
        alert('Fuck');
    }  
    render() {
        return(
            <div>
                <div>Good Import</div>
                <div class="info-container">
                    <div class="id-displaying">
                        <div class="input-label">ID</div>
                        <TextField type= "text" class="input-val"size="small" ref="goodId" variant="outlined" defaultValue='1212121' inputProps={{ readOnly: true}}/>
                    </div>
                    <div class="input-container">
                        <div class="input-label">Name</div>
                        <TextField type="text" class="input-val" size="small" ref="good-name" variant="outlined" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Quantity:</div>
                        <TextField type="number" class="input-val" size="small" ref="good-quantity" variant="outlined" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Original Price:</div>
                        <TextField type="number" class="input-val" size="small" ref="good-original-price" variant="outlined" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Sell Price:</div>
                        <TextField type="number" class="input-val"size="small" ref="good-sell-price" variant="outlined" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Import Time:</div>
                        <TextField type="date" class="input-val" size="small" ref="good-import-time" variant="outlined" defaultValue="2017-05-24" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Expired Date:</div>
                        <TextField type="date" class="input-val" size="small" ref="good-expired-date" variant="outlined" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Product Type:</div>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="select-filled-label">Type</InputLabel>
                            <Select
                                labelid="select-filled-label"
                                id="select-filled"
                                value={this.state.type}
                                onChange={(event) => {
                                    this.setState({type: event.target.value});
                                }}
                            >
                                {
                                    productTypes.length==0 ? <MenuItem value={'none'}>None</MenuItem>
                                    : productTypes.map((type) =>
                                        <MenuItem value={type}>{type}</MenuItem>
                                    )
                                }   
                            </Select>
                        </FormControl>
                        <Button variant="text">
                            Add Type
                        </Button>
                    </div>
                    <Button variant="contained" onClick={this.btnClick}>
                        Import
                    </Button>
                </div>
            </div>
        );        
    }
}

export default GoodImport;
