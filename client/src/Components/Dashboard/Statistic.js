import { merge, now } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import BaseOptionChart from './BaseOptionChart';
import SplitButton from './GroupButton';
// ----------------------------------------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { date } from 'faker';


export default function AppWebsiteVisits() {
  const [typeDate, setTypeData] = React.useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sartuday', 'Sunday']);
  const [title, setTitle] = React.useState('last weak')
  const [tienGoc, setTienGoc] = React.useState([])
  const [tienDoanhThu, setTienDoanhThu] = React.useState([])
  const [tienLai, setTienLai] = React.useState([])
  var CHART_DATA = [
    {
      name: 'Tiền gốc',
      type: 'column',
      data: tienGoc
    },
    {
      name: 'Doanh thu',
      type: 'area',
      data: tienDoanhThu
    },
    {
      name: 'Lợi nhuận',
      type: 'line',
      data: tienLai
    }
  ];
  const typeTimeDashboard = useSelector(state => state.typeTimeDashboard)
  const listReciept = useSelector(state => state.listReciept)
  let nowTime = new Date()
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [1, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    // xaxis: {
    //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    // },
    xaxis: {
      categories: typeDate,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} VNĐ`;
          }
          return y;
        }
      }
    }
  });

  const DateInWeak = (type) => {
    let arrCurrentWeak = [];
    let arrLastWeak = []
    let currentMonth = nowTime.getMonth() + 1

    if (type === 'Weak') {
      // Weak
      if (nowTime.getDay() === 0) {
        //Xử lý nếu CN từ ngày 7 trở lên
        if (nowTime.getDate() >= 7) {
          for (let i = 0; i < 7; i++) {
            arrCurrentWeak.push((nowTime.getDate() - i) + " " + currentMonth + " " + nowTime.getFullYear())
          }
          return arrCurrentWeak
        }
        //NGƯỢC LẠI
        else {
          for (let i = 0; i < nowTime.getDate(); i++) {
            arrCurrentWeak.push((nowTime.getDate() - i) + " " + currentMonth + " " + nowTime.getFullYear())
          }
          let maxDayInLastMonth = new Date(nowTime.getFullYear(), nowTime.getMonth(), 0).getDate()
          for (let i = 0; i < 7 - nowTime.getDate(); i++) {
            arrCurrentWeak.push((maxDayInLastMonth - i) + " " + nowTime.getMonth() + " " + nowTime.getFullYear())
          }
          return arrCurrentWeak
        }
      } else {
        if (nowTime.getDate() >= nowTime.getDay()) {
          for (let i = 0; i < nowTime.getDay(); i++) {
            arrCurrentWeak.push((nowTime.getDate() - i) + " " + currentMonth + " " + nowTime.getFullYear())
          }
          console.log(arrCurrentWeak)
          return arrCurrentWeak
        } else {
          for (let i = 0; i < nowTime.getDate(); i++) {
            arrCurrentWeak.push((nowTime.getDate() - i) + " " + currentMonth + " " + nowTime.getFullYear())
          }
          let maxDayInLastMonth = new Date(nowTime.getFullYear(), nowTime.getMonth(), 0).getDate()
          for (let i = 0; i < nowTime.getDay() - nowTime.getDate(); i++) {
            arrCurrentWeak.push((maxDayInLastMonth - i) + " " + nowTime.getMonth() + " " + nowTime.getFullYear())
          }
          console.log(arrCurrentWeak)
          return arrCurrentWeak
        }
      }

      //////LAST WEAK // 
    } else {
      // Last Weak
      if (nowTime.getDay() === 0) {
        if (nowTime.getDate() >= 14) {
          for (let i = 0; i < 7; i++) {
            arrCurrentWeak.push((nowTime.getDate() - i - 7) + " " + currentMonth + " " + nowTime.getFullYear())
          }
          return arrCurrentWeak
        } else if (nowTime.getDate() <= 7) {
          let a = 7 - nowTime.getDate();
          let maxDayInLastMonth = new Date(nowTime.getFullYear(), nowTime.getMonth(), 0).getDate()
          for (let i = 0; i < 7; i++) {
            arrLastWeak.push((maxDayInLastMonth - i - a) + " " + nowTime.getMonth() + " " + nowTime.getFullYear())
          }
          console.log(arrLastWeak)
          return arrLastWeak
        }
        else {
          for (let i = 0; i < nowTime.getDate() - 7; i++) {
            arrCurrentWeak.push((nowTime.getDate() - 7 - i) + " " + currentMonth + " " + nowTime.getFullYear())
          }
          let maxDayInLastMonth = new Date(nowTime.getFullYear(), nowTime.getMonth(), 0).getDate()
          for (let i = 0; i < 14 - nowTime.getDate(); i++) {
            arrCurrentWeak.push((maxDayInLastMonth - i) + " " + nowTime.getMonth() + " " + nowTime.getFullYear())
          }
          return arrCurrentWeak
        }
      }
      else {
        //
        if (nowTime.getDate() - nowTime.getDay() >= 7) {
          for (let i = 0; i < 7; i++) {
            arrLastWeak.push((nowTime.getDate() - i - nowTime.getDay()) + " " + currentMonth + " " + nowTime.getFullYear())
          }
          return arrLastWeak
        } else if (nowTime.getDate() <= nowTime.getDay()) {
          let a = nowTime.getDay() - nowTime.getDate();
          let maxDayInLastMonth = new Date(nowTime.getFullYear(), nowTime.getMonth(), 0).getDate()
          for (let i = 0; i < 7; i++) {
            arrLastWeak.push((maxDayInLastMonth - i - a) + " " + nowTime.getMonth() + " " + nowTime.getFullYear())
          }
          console.log(arrLastWeak)
          return arrLastWeak
        }
        else {
          for (let i = 0; i < nowTime.getDate() - nowTime.getDay(); i++) {
            arrCurrentWeak.push((nowTime.getDate() - i - nowTime.getDay()) + " " + currentMonth + " " + nowTime.getFullYear())
          }
          let maxDayInLastMonth = new Date(nowTime.getFullYear(), nowTime.getMonth(), 0).getDate()
          for (let i = 0; i < 7 - (nowTime.getDate() - nowTime.getDay()); i++) {
            arrCurrentWeak.push((maxDayInLastMonth - i) + " " + nowTime.getMonth() + " " + nowTime.getFullYear())
          }
          console.log(arrCurrentWeak)
          return arrCurrentWeak
        }
      }
    }
  }

  ///////Weak
  const totalMoneyInWeak = (arrDate, type) => {
    let arrDoanhThu = []
    let arrTienGoc = []
    let arrLai = []
    arrDate.map(value => {
      let date = value.split(" ")
      let moneyDoanhThu = 0
      let moneyTienGoc = 0
      listReciept.map(reciept => {
        let dateReciept = reciept.date.replace(/\s/g, "");
        dateReciept = dateReciept.split("/")
        if (date[0] === dateReciept[0] && date[1] === dateReciept[1] && date[2] === dateReciept[2]) {
          moneyDoanhThu += reciept.totalFinalMoney;
          reciept.listProduct.map(value => {
            moneyTienGoc += value.quantity * value.product.importPrice;
          })
        }
      })
      arrTienGoc.unshift(moneyTienGoc)
      arrDoanhThu.unshift(moneyDoanhThu)
      arrLai.unshift(moneyDoanhThu - moneyTienGoc)
    })
    setTienGoc(arrTienGoc)
    setTienDoanhThu(arrDoanhThu)
    setTienLai(arrLai)
  }


  ///////Month

  const DateInMonth = (type) => {
    let arrCurrentMonth = [];
    let arrLastMonth = []
    let month = nowTime.getMonth();
    let year = nowTime.getFullYear();
    let monthCurrent = month + 1
    for (let i = 0; i < 8; i++) {
      let data
      if (i === 0) {
        data = '1/' + monthCurrent
        arrCurrentMonth.push(data)
        data = '1/' + month
        arrLastMonth.push(data)
      } else {
        data = i * 4 + '/' + monthCurrent
        arrCurrentMonth.push(data)
        data = i * 4 + '/' + month
        arrLastMonth.push(data)
      }
    }

    if (type === 'Month') {
      //Month
      let data = new Date(year, month + 1, 0).getDate() + '/' + monthCurrent
      arrCurrentMonth.push(data)
      console.log(arrCurrentMonth)
      return arrCurrentMonth
    } else {
      //Last month
      let data = new Date(year, month, 0).getDate() + '/' + month
      arrLastMonth.push(data)
      return arrLastMonth
    }
  }

  const totalMoneyInMonth = (arrDate, type) => {
    var newArr
    let arrDoanhThu = [0]
    let arrTienGoc = [0]
    let arrLai = [0]
    if (type === 'Month') {
      newArr = arrDate.filter(value => {
        let data = value.replace(/\s/g, "")
        data = value.split("/");
        if (nowTime.getDate() >= data[0]) {
          return value
        }
      })
      if (nowTime.getDate() % 4 !== 0) {
        let month = nowTime.getMonth() + 1;
        let a = nowTime.getDate() + "/" + month
        newArr.push(a)
      }
      console.log(newArr)
      setTypeData(newArr)
    } else {
      setTypeData(arrDate)
    }


    if (type === 'Month') {
      for (let i = 1; i <= nowTime.getDate() / 4; i++) {
        let year = nowTime.getFullYear();
        let date = newArr[i].replace(/\s/g, "");
        date = date.split("/")
        let moneyDoanhThu = 0;
        let moneyTienGoc = 0;
        listReciept.map(reciept => {
          let dateReciept = reciept.date.replace(/\s/g, "");
          dateReciept = dateReciept.split("/")
          if (date[0] == dateReciept[0] || date[0] - 1 == dateReciept[0] || date[0] - 2 == dateReciept[0] || date[0] - 3 == dateReciept[0]) {
            if (date[1] == dateReciept[1] && year == dateReciept[2])
              moneyDoanhThu += reciept.totalFinalMoney;
            reciept.listProduct.map(value => {
              moneyTienGoc += value.quantity * value.product.importPrice;
            })
          }
        })
        arrDoanhThu.push(moneyDoanhThu);
        arrTienGoc.push(moneyTienGoc)
        arrLai.push(moneyDoanhThu - moneyTienGoc)
      }
      if (nowTime.getDate() % 4 !== 0) {
        let moneyDoanhThu = 0;
        let moneyTienGoc = 0;
        for (let i = 4 * (nowTime.getDate() % 4 + 1) + 1; i <= nowTime.getDate(); i++) {
          let year = nowTime.getFullYear();
          let month = nowTime.getMonth() + 1;
          listReciept.map(reciept => {
            let dateReciept = reciept.date.replace(/\s/g, "");
            dateReciept = dateReciept.split("/")
            if (i == dateReciept[0] && month == dateReciept[1] && year == dateReciept[2]) {
              moneyDoanhThu += reciept.totalFinalMoney;
              reciept.listProduct.map(value => {
                moneyTienGoc += value.quantity * value.product.importPrice;
              })
            }
          })
        }
        arrDoanhThu.push(moneyDoanhThu);
        arrTienGoc.push(moneyTienGoc)
        arrLai.push(moneyDoanhThu - moneyTienGoc)
      }

      setTienGoc(arrTienGoc)
      setTienDoanhThu(arrDoanhThu)
      setTienLai(arrLai)
    } else {
      let month = nowTime.getMonth()
      let year = nowTime.getFullYear();
      for (let i = 1; i <= 7; i++) {
        let date = arrDate[i].replace(/\s/g, "");
        date = date.split("/")
        let moneyDoanhThu = 0;
        let moneyTienGoc = 0;
        listReciept.map(reciept => {
          let dateReciept = reciept.date.replace(/\s/g, "");
          dateReciept = dateReciept.split("/")
          if (date[0] == dateReciept[0] || date[0] - 1 == dateReciept[0] || date[0] - 2 == dateReciept[0] || date[0] - 3 == dateReciept[0]) {
            if (month == dateReciept[1] && year == dateReciept[2]) {
              moneyDoanhThu += reciept.totalFinalMoney;
              reciept.listProduct.map(value => {
                moneyTienGoc += value.quantity * value.product.importPrice;
              })
            }
          }
        })
        arrDoanhThu.push(moneyDoanhThu);
        arrTienGoc.push(moneyTienGoc)
        arrLai.push(moneyDoanhThu - moneyTienGoc)
      }

      if (new Date(year, month, 0).getDate() > 28) {
        let moneyDoanhThu = 0;
        let moneyTienGoc = 0;
        for (let i = 29; i <= new Date(year, month, 0).getDate(); i++) {
          listReciept.map(reciept => {
            let dateReciept = reciept.date.replace(/\s/g, "");
            dateReciept = dateReciept.split("/")
            if (i == dateReciept[0] && month == dateReciept[1] && year == dateReciept[2]) {
              moneyDoanhThu += reciept.totalFinalMoney;
              reciept.listProduct.map(value => {
                moneyTienGoc += value.quantity * value.product.importPrice;
              })
            }
          })
        }
        arrDoanhThu.push(moneyDoanhThu);
        arrTienGoc.push(moneyTienGoc)
        arrLai.push(moneyDoanhThu - moneyTienGoc)
      }
      setTienGoc(arrTienGoc)
      setTienDoanhThu(arrDoanhThu)
      setTienLai(arrLai)
    }

  }


  ////// YEAR
  const DateInYear = (type) => {
    let arrDoanhThu = []
    let arrTienGoc = []
    let arrLai = []
    var currentYear
    if (type === 'Year') {
      currentYear = nowTime.getFullYear();
    } else {
      currentYear = nowTime.getFullYear() - 1;
    }
    for (let i = 1; i <= 12; i++) {
      let moneyDoanhThu = 0;
      let moneyTienGoc = 0;
      listReciept.map(reciept => {
        let dateReciept = reciept.date.replace(/\s/g, "");
        dateReciept = dateReciept.split("/")
        if (i == dateReciept[1] && currentYear == dateReciept[2]) {
          moneyDoanhThu += reciept.totalFinalMoney;
          reciept.listProduct.map(value => {
            moneyTienGoc += value.quantity * value.product.importPrice;
          })
        }
      })
      arrDoanhThu.push(moneyDoanhThu);
      arrTienGoc.push(moneyTienGoc)
      arrLai.push(moneyDoanhThu - moneyTienGoc)
    }
    setTienGoc(arrTienGoc)
    setTienDoanhThu(arrDoanhThu)
    setTienLai(arrLai)
  }

  React.useEffect(() => {
    console.log(typeTimeDashboard)
    console.log(listReciept);

    if (typeTimeDashboard === 'Weak' || typeTimeDashboard === 'Last Weak') {
      setTypeData(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sartuday', 'Sunday'])
      totalMoneyInWeak(DateInWeak(typeTimeDashboard), typeTimeDashboard);
      setTitle('last weak')
    } else if (typeTimeDashboard === 'Month' || typeTimeDashboard === 'Last Month') {
      totalMoneyInMonth(DateInMonth(typeTimeDashboard), typeTimeDashboard)
      setTitle('last month')
    } else {
      DateInYear(typeTimeDashboard)
      setTypeData(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
      setTitle('last year')
    }

  }, [typeTimeDashboard])

  return (
    <Card>
      <div className="titleStatistic">
        <CardHeader style={{ fontWeight: '800' }} title="Revenue" subheader={"(+43%) than " + title} />
        <SplitButton></SplitButton>
      </div>

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
