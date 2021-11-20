import React from 'react';
import { Typography } from '@mui/material';
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'

function TotalMoney(props) {
    const typeHeaderDashboard = useSelector(state => state.typeHeaderDashboard);
    const listReciept = useSelector(state => state.listReciept)
    const [totalMoney, setTotalMoney] = React.useState('')

    let nowTime = new Date()

    React.useEffect(() => {
        let money = 0;
        let currentMonth = nowTime.getMonth() + 1;

        if (typeHeaderDashboard == 'Today') {
            listReciept.map(value => {
                let date = value.date.replace(/\s/g, "");
                date = date.split("/");
                if (date[0] == nowTime.getDate() && date[1] == currentMonth && date[2] == nowTime.getFullYear()) {
                    if(!value.deleted) {
                        money += value.totalFinalMoney
                    }
                }
            })
            setTotalMoney(money)
        } else if (typeHeaderDashboard == 'Yesterday') {
            listReciept.map(value => {
                let date = value.date.replace(/\s/g, "");
                date = date.split("/");
                if (date[0] == nowTime.getDate() - 1 && date[1] == currentMonth && date[2] == nowTime.getFullYear()) {
                    if(!value.deleted){
                        money += value.totalFinalMoney
                    }
                }
            })
            setTotalMoney(money)
        } else if (typeHeaderDashboard == 'Month') {
            listReciept.map(value => {
                let date = value.date.replace(/\s/g, "");
                date = date.split("/");
                if (date[1] == currentMonth && date[2] == nowTime.getFullYear()) {
                    if(!value.deleted) {
                        money += value.totalFinalMoney
                    }
                }
            })
            setTotalMoney(money)
        } else if (typeHeaderDashboard == 'Year') {
            listReciept.map(value => {
                let date = value.date.replace(/\s/g, "");
                date = date.split("/");
                if (date[2] == nowTime.getFullYear()) {
                    if(!value.deleted) {
                        money += value.totalFinalMoney
                    }
                }
            })
            setTotalMoney(money)
        } else if (typeHeaderDashboard == 'All') {
            listReciept.map(value => {
                if(!value.deleted) {
                    money += value.totalFinalMoney
                }
            })
            setTotalMoney(money)
        }
    }, [typeHeaderDashboard])

    return (
        <div className="dashboard-css">
            <div className="dashboard-item-img" style={{ marginBottom: '30px' }}>
                <RiMoneyDollarCircleFill className="dashboard-item-icon"></RiMoneyDollarCircleFill>
            </div>
            <Typography style={{ marginBottom: '10px' }} variant="h6">{totalMoney.toLocaleString()} VNĐ  
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Total money
            </Typography>
        </div>
    );
}

export default TotalMoney;