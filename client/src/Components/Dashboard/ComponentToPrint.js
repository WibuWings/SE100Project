import React from 'react';

class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }



    render() {
        return (
            <div className="row">
                Thích gì thì code ra 
            </div>
        );
    }
}

export default ComponentToPrint;