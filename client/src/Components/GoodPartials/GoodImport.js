import React, { Component } from 'react';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Button, Modal } from '@mui/material';

const productTypes =[
     'food', 'detergent', 'cuisine'
];

class GoodImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
          good: {
            id: '',
            name: '',
            quantity: '',
            originPrice: 0,
            sellPrice: 0,
            importTime: '',
            expiredDate: '',
            type: 'none',
          },
          show: false,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    showModal = () => {
        this.setState({ show: true });
      };
    
    hideModal = () => {
        this.setState({ show: false });
    };
    btnClick () {
        alert('Chịu');
    }  
    render() {
        return(
            <div>
                <div>Good Import</div>
                <Button
                    variant="contained"
                    component="label"
                    >
                    Upload File
                    <input
                        type="file"
                        hidden
                    />
                </Button>
                <div class="info-container">
                    <div class="id-displaying">
                        <div class="input-label">ID</div>
                        <TextField type= "text" class="input-val"size="small" value={this.state.good.id} variant="outlined" defaultValue='1212121' inputProps={{ readOnly: true}}/>
                    </div>
                    <div class="input-container">
                        <div class="input-label">Name</div>
                        <TextField type="text" class="input-val" size="small"  value={this.state.good.name} variant="outlined" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Quantity:</div>
                        <TextField type="number" class="input-val" size="small" value={this.state.good.quantity} variant="outlined" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Original Price:</div>
                        <TextField type="number" class="input-val" size="small" value={this.state.good.originPrice} variant="outlined" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Sell Price:</div>
                        <TextField type="number" class="input-val"size="small" value={this.state.good.sellPrice} variant="outlined" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Import Time:</div>
                        <TextField type="date" class="input-val" size="small" value={this.state.good.importTime} variant="outlined" defaultValue="2017-05-24" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Expired Date:</div>
                        <TextField type="date" class="input-val" size="small" value={this.state.good.expiredDate} variant="outlined" />
                    </div>
                    <div class="input-container">
                        <div class="input-label">Product Type:</div>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="select-filled-label">Type</InputLabel>
                            <Select
                                labelid="select-filled-label"
                                id="select-filled"
                                value={this.state.good.type}
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
                        <Button onClick={this.showModal}>Add type</Button>
                        {/* <Modal
                            open={this.state.show}
                            onClose={this.hideModal}
                        >
                            Nguyễn Công Phi
                        </Modal> */}
                        {/* Chỗ này lỗi mẹ rồi =))) */}
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
