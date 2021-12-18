import React from 'react';
import { Typography } from '@mui/material';
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { BsCashCoin } from "react-icons/bs";
import { IoCashSharp } from "react-icons/io5";

function calculateTime(timeFrom, timeEnd)
{
    var realTimeFrom, realTimeEnd;

    realTimeFrom = parseInt(timeFrom.substring(0, timeFrom.indexOf(':')));
    if(timeFrom.indexOf('PM')!=-1) realTimeFrom += 12;
    var minuteFrom= parseInt(timeFrom.substring(timeFrom.indexOf(':')+1, timeFrom.indexOf(':') + 3));

    realTimeEnd = parseInt(timeEnd.substring(0, timeEnd.indexOf(':')));
    if(timeEnd.indexOf('PM')!=-1) realTimeEnd += 12;
    var minuteEnd= parseInt(timeEnd.substring(timeEnd.indexOf(':')+1, timeEnd.indexOf(':') + 3));

    var timeDiff = realTimeEnd - realTimeFrom;
    
    if(minuteEnd - minuteFrom < 0)
    {
        timeDiff --;
        minuteEnd += 60;
    }

    return Math.round(timeDiff + (minuteEnd - minuteFrom) / 60.0);
}

function calculateSalary(shift){
    var salary = 0;
    // Tính thời gian của ca làm
    return shift._id.shiftType.salary * (calculateTime(shift._id.shiftType.timeFrom,shift._id.shiftType.timeEnd));
}


function SalaryStats(props) {
    const typeHeaderDashboard = useSelector(state => state.typeHeaderDashboard);
    const listReciept = useSelector(state => state.listReciept)
    const listTimeKeeping = useSelector(state => state.listTimeKeeping)
    const [totalPayedSalary, setTotalPayedSalary] = React.useState('')
    const [totalNotPayedSalary, setTotalNotPayedSalary] = React.useState('')
    const regulation = useSelector(state => state.regulationReducer)
    let nowTime = new Date();
    console.log("listTimeKeeping",listTimeKeeping);

    React.useEffect(() => {
        
        let money = 0;
        let currentMonth = nowTime.getMonth() + 1;

        // console.log("listTimeKeeping",listTimeKeeping )
        // if(listTimeKeeping.length>0)
        //     console.log(calculateSalary(listTimeKeeping[0]));

        if (typeHeaderDashboard == 'Today') {
            let payedSalary = 0, notPaySalary = 0;
            for(var i = 0 ; i < listTimeKeeping.length; i++)
            {
                var realDate = listTimeKeeping[i]._id.realDate.substring(0,listTimeKeeping[i]._id.realDate.indexOf('T'));
                var date = realDate.split('-');
                // console.log(date);
                // console.log(nowTime.getDate() - 1,currentMonth,nowTime.getFullYear())
                if (date[2] == nowTime.getDate() - 1 && date[1] == currentMonth && date[0] == nowTime.getFullYear()) {
                    if(listTimeKeeping[i].isPaidSalary == true)
                    {
                        payedSalary += calculateSalary(listTimeKeeping[i]);
                    }
                    else notPaySalary += calculateSalary(listTimeKeeping[i]);
                }
            }
            setTotalPayedSalary(payedSalary);
            setTotalNotPayedSalary(notPaySalary);
        } else if (typeHeaderDashboard == 'Yesterday') {
            let payedSalary = 0, notPaySalary = 0;
            for(var i = 0 ; i < listTimeKeeping.length; i++)
            {
                var realDate = listTimeKeeping[i]._id.realDate.substring(0,listTimeKeeping[i]._id.realDate.indexOf('T'));
                var date = realDate.split('-');
                // console.log(date);
                // console.log(nowTime.getDate() - 1,currentMonth,nowTime.getFullYear())
                if (date[2] == nowTime.getDate() - 2 && date[1] == currentMonth && date[0] == nowTime.getFullYear()) {
                    if(listTimeKeeping[i].isPaidSalary == true)
                    {
                        payedSalary += calculateSalary(listTimeKeeping[i]);
                    }
                    else notPaySalary += calculateSalary(listTimeKeeping[i]);
                }
            }
            setTotalPayedSalary(payedSalary);
            setTotalNotPayedSalary(notPaySalary);

        } else if (typeHeaderDashboard == 'Month') {
            let payedSalary = 0, notPaySalary = 0;
            for(var i = 0 ; i < listTimeKeeping.length; i++)
            {
                var realDate = listTimeKeeping[i]._id.realDate.substring(0,listTimeKeeping[i]._id.realDate.indexOf('T'));
                var date = realDate.split('-');
                // console.log(date);
                // console.log(nowTime.getDate() - 1,currentMonth,nowTime.getFullYear())
                if (date[1] == currentMonth && date[0] == nowTime.getFullYear()) {
                    if(listTimeKeeping[i].isPaidSalary == true)
                    {
                        payedSalary += calculateSalary(listTimeKeeping[i]);
                    }
                    else notPaySalary += calculateSalary(listTimeKeeping[i]);
                }
            }
            setTotalPayedSalary(payedSalary);
            setTotalNotPayedSalary(notPaySalary);
        } else if (typeHeaderDashboard == 'Year') {
            let payedSalary = 0, notPaySalary = 0;
            for(var i = 0 ; i < listTimeKeeping.length; i++)
            {
                var realDate = listTimeKeeping[i]._id.realDate.substring(0,listTimeKeeping[i]._id.realDate.indexOf('T'));
                var date = realDate.split('-');
                // console.log(date);
                // console.log(nowTime.getDate() - 1,currentMonth,nowTime.getFullYear())
                if (date[0] == nowTime.getFullYear()) {
                    if(listTimeKeeping[i].isPaidSalary == true)
                    {
                        payedSalary += calculateSalary(listTimeKeeping[i]);
                    }
                    else notPaySalary += calculateSalary(listTimeKeeping[i]);
                }
            }
            setTotalPayedSalary(payedSalary);
            setTotalNotPayedSalary(notPaySalary);
        } else if (typeHeaderDashboard == 'All') {
            let payedSalary = 0, notPaySalary = 0;
            for(var i = 0 ; i < listTimeKeeping.length; i++)
            {
                if(listTimeKeeping[i].isPaidSalary == true)
                {
                    payedSalary += calculateSalary(listTimeKeeping[i]);
                }
                else notPaySalary += calculateSalary(listTimeKeeping[i]);
            }
            setTotalPayedSalary(payedSalary);
            setTotalNotPayedSalary(notPaySalary);
        }
    }, [typeHeaderDashboard])

    return (
        <div className="dashboard-css sold-good">
            <div className="dashboard-item-img sold-good" style={{ marginBottom: '30px'}}>
                <IoCashSharp className="dashboard-item-icon sold-good"></IoCashSharp>
            </div>
            {
                (Object.keys(regulation).length == 0 || regulation.currency == 'vnd' )?
                <Typography style={{ marginBottom: '10px' }} variant="h6">
                    {totalPayedSalary} / {totalNotPayedSalary} VNĐ
                </Typography>
                : 
                <Typography style={{ marginBottom: '10px' }} variant="h6">
                    {(totalPayedSalary/regulation.exchangeRate).toFixed(2)} / {(totalNotPayedSalary/regulation.exchangeRate).toFixed(2)} $
                </Typography>
            }
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Paid Salary / Unpaid Salary
            </Typography>
        </div>
    );
}

export default SalaryStats;