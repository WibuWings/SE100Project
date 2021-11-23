import React from 'react';
import { Typography } from '@mui/material';
import { FaReceipt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import moment from 'moment'


function ErrorReceipt(props) {
    const typeHeaderDashboard = useSelector(state => state.typeHeaderDashboard);
    const listReciept = useSelector(state => state.listReciept)
    const [index, setIndex] = React.useState(0)
    let nowTime = new Date()

    React.useEffect(() => {
        let errorReciept = 0;
        let currentMonth = nowTime.getMonth() + 1;
        let lastMonth = new Date(moment().subtract(1, 'months'))
        let yesterdayTime = new Date(moment().subtract(1, 'days'))

        if (typeHeaderDashboard == 'Today') {
            listReciept.map(value => {
                let date = value.date.replace(/\s/g, "");
                date = date.split("/");
                if (date[0] == nowTime.getDate() && date[1] == currentMonth && date[2] == nowTime.getFullYear()) {
                    if (value.deleted) {
                        errorReciept++
                    }
                }
            })
            setIndex(errorReciept)
        } else if (typeHeaderDashboard == 'Yesterday') {
            listReciept.map(value => {
                let date = value.date.replace(/\s/g, "");
                date = date.split("/");
                if (date[0] == yesterdayTime.getDate() - 1 && date[1] == yesterdayTime.getMonth() + 1 && date[2] == yesterdayTime.getFullYear()) {
                    if (value.deleted) errorReciept++
                }
            })
            setIndex(errorReciept)
        } else if (typeHeaderDashboard == 'Month') {
            listReciept.map(value => {
                let date = value.date.replace(/\s/g, "");
                date = date.split("/");
                if (date[1] == lastMonth.getMonth() && date[2] == lastMonth.getFullYear()) {
                    if (value.deleted) errorReciept++
                }
            })
            setIndex(errorReciept)
        } else if (typeHeaderDashboard == 'Year') {
            listReciept.map(value => {
                let date = value.date.replace(/\s/g, "");
                date = date.split("/");
                if (date[2] == nowTime.getFullYear()) {
                    if (value.deleted) errorReciept++
                }
            })
            setIndex(errorReciept)
        } else if (typeHeaderDashboard == 'All') {
            listReciept.map(value => {
                if (value.deleted) {
                    errorReciept++
                }
            })
            setIndex(errorReciept)
        }
    }, [typeHeaderDashboard])

    return (
        <div className="dashboard-css error-receipt">
            <div className="dashboard-item-img error-receipt" style={{ marginBottom: '30px' }}>
                <FaReceipt className="dashboard-item-icon error-receipt"></FaReceipt>
            </div>
            <Typography style={{ marginBottom: '10px' }} variant="h4">{index}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Error receipt
            </Typography>
        </div>
    );
}

export default ErrorReceipt;