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
                Thích gì thì code ra revenueasd asdasdasd asdasd asdasdasdadasdsada ad
            </div>
        );
    }
}

export default ComponentToPrint;