import React from 'react';
import { Typography } from '@mui/material';
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import moment from 'moment';


function TotalMoney(props) {
    const typeHeaderDashboard = useSelector(state => state.typeHeaderDashboard);
    const listReciept = useSelector(state => state.listReciept)
    const regulation = useSelector(state => state.regulationReducer)
    const [totalMoney, setTotalMoney] = React.useState('')

    // console.log("ListReceipt", listReciept);
    let nowTime = new Date();

    console.log("nowTime.getMonth",moment().subtract(24, 'days').format('l'));

    React.useEffect(() => {
        let money = 0;
        let currentMonth = nowTime.getMonth() + 1;
        let lastMonth = new Date(moment().subtract(1, 'months'))
        
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
            let yesterdayTime = new Date(moment().subtract(1, 'days'))
            listReciept.map(value => {
                let date = value.date.replace(/\s/g, "");
                date = date.split("/");
                if (date[0] == yesterdayTime.getDate() && date[1] == yesterdayTime.getMonth()+1 && date[2] == yesterdayTime.getFullYear()) {
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
                if (date[1] == lastMonth.getMonth() + 1 && date[2] == lastMonth.getFullYear()) {
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
            {
                ( Object.keys(regulation).length == 0 || regulation.currency == 'vnd' )?
                <Typography style={{ marginBottom: '10px' }} variant="h6">
                    {totalMoney.toLocaleString()} VNĐ 
                </Typography>
                :
                <Typography style={{ marginBottom: '10px' }} variant="h6">
                    {(totalMoney/regulation.exchangeRate).toFixed(2)} $
                </Typography>
            }
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Total money
            </Typography>
        </div>
    );
}

export default TotalMoney;