import { merge, now } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import BaseOptionChart from './BaseOptionChart';
import SplitButton from './GroupButton';
import OptionYear from './OptionYear';
import OptionMonth from './OptionMonth';
// ----------------------------------------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import moment from 'moment'

export default function AppWebsiteVisits() {
  const [typeDate, setTypeData] = React.useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sartuday', 'Sunday']);
  const [title, setTitle] = React.useState('last Week')
  const [tienGoc, setTienGoc] = React.useState([])
  const [tienDoanhThu, setTienDoanhThu] = React.useState([])
  const [tienLai, setTienLai] = React.useState([])
  const [growth, setGrowth] = React.useState('(+100%) than Last Week')
  const [showOption, setShowOption] = React.useState(false);
  var CHART_DATA = [
    {
      name: 'Funds',
      type: 'column',
      data: tienGoc
    },
    {
      name: 'Revenue',
      type: 'area',
      data: tienDoanhThu
    },
    {
      name: 'Profit',
      type: 'line',
      data: tienLai
    }
  ];
  const typeTimeDashboard = useSelector(state => state.typeTimeDashboard)
  const listReciept = useSelector(state => state.listReciept)
  const typeMonth = useSelector(state => state.monthSelectDashboard)
  const typeYear = useSelector(state => state.yearSelectDashboard)
  const regulation = useSelector(state => state.regulationReducer)

  let nowTime = new Date()
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [1, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    xaxis: {
      categories: typeDate,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            if(regulation == {})
            {
              return `${y.toFixed(0)} VNĐ`;
            }
            if (regulation.currency == 'vnd')
              return `${y.toFixed(0)} VNĐ`;
            else
              return `${(y).toFixed(2)} $`;
          }
          return y.toFixed(2);
        }
      }
    }
  });

  const DateInWeek = (type) => {
    let Week = [];
    if (type === 'Week') {
      // Week
      if (nowTime.getDay() === 0) {
        for (let i = 0; i < 7; i++) {
          let nowDate = new Date(moment().subtract(i, 'days'))
          let date = nowDate.getDate() + " " + (nowDate.getMonth() + 1) + " " + nowDate.getFullYear();
          Week.push(date)
        }
        return Week
      } else {
        for (let i = 0; i < nowTime.getDay(); i++) {
          let nowDate = new Date(moment().subtract(i, 'days'))
          let date = nowDate.getDate() + " " + (nowDate.getMonth() + 1) + " " + nowDate.getFullYear();
          Week.push(date)
        }
        return Week
      }

    } else {
      if (nowTime.getDay() === 0) {
        for (let i = 0; i < 7; i++) {
          let nowDate = new Date(moment().subtract(i + 7, 'days'))
          let date = nowDate.getDate() + " " + (nowDate.getMonth() + 1) + " " + nowDate.getFullYear();
          Week.push(date)
        }
        return Week
      } else {
        for (let i = 0; i < 7; i++) {
          let nowDate = new Date(moment().subtract(i + nowTime.getDay(), 'days'))
          let date = nowDate.getDate() + " " + (nowDate.getMonth() + 1) + " " + nowDate.getFullYear();
          Week.push(date)
        }
        return Week
      }
    }
  }

  ///////Week
  const totalMoneyInWeek = (arrDate, type) => {
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
          if (!reciept.deleted) {
            moneyDoanhThu += reciept.totalFinalMoney;
            reciept.listProduct.map(value => {
              moneyTienGoc += value.quantity * value.product.importPrice;
            })
          }
        }
      })
      if (regulation.currency !== 'vnd') {
        moneyDoanhThu = (moneyDoanhThu / regulation.exchangeRate).toFixed(2);
        moneyTienGoc = (moneyTienGoc / regulation.exchangeRate).toFixed(2)
      }
      arrTienGoc.unshift(moneyTienGoc)
      arrDoanhThu.unshift(moneyDoanhThu)
      arrLai.unshift(moneyDoanhThu - moneyTienGoc)
    })
    setTienGoc(arrTienGoc)
    setTienDoanhThu(arrDoanhThu)
    setTienLai(arrLai)
  }


  ///////Month

  const DateInMonth = (month123, year123, currentMonth) => {
    let arrCurrentMonth = [];
    let arrLastMonth = []
    let month = new Date(moment().subtract(1, 'months'))
    let lastMonth = month.getMonth() + 1;
    let year = nowTime.getFullYear();
    let monthCurrent = nowTime.getMonth() + 1;

    for (let i = 0; i < 8; i++) {
      let data
      if (i === 0) {
        data = '1/' + monthCurrent
        arrCurrentMonth.push(data)
        data = '1/' + month123
        arrLastMonth.push(data)
      } else {
        data = i * 4 + '/' + monthCurrent
        arrCurrentMonth.push(data)
        data = i * 4 + '/' + month123
        arrLastMonth.push(data)
      }
    }

    if (currentMonth === true) {
      //Month
      let data = new Date(year, nowTime.getMonth() + 1, 0).getDate() + '/' + monthCurrent
      arrCurrentMonth.push(data)
      return arrCurrentMonth
    } else {
      //Last month
      let data = new Date(year123, month123, 0).getDate() + '/' + lastMonth
      arrLastMonth.push(data)
      return arrLastMonth
    }
  }




  const totalMoneyInMonth = (arrDate, currentMonth, month123, year123) => {
    var newArr
    let arrDoanhThu = [0]
    let arrTienGoc = [0]
    let arrLai = [0]
    if (currentMonth) {
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
      setTypeData(newArr)
    } else {
      setTypeData(arrDate)
    }

    if (currentMonth) {
      if (nowTime.getDate() / 4 === 0) {

      } else {
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
              if (!reciept.deleted) {
                if (date[1] == dateReciept[1] && year == dateReciept[2])
                  moneyDoanhThu += reciept.totalFinalMoney;
                reciept.listProduct.map(value => {
                  moneyTienGoc += value.quantity * value.product.importPrice;
                })
              }
            }
          })
          if (regulation.currency !== 'vnd') {
            moneyDoanhThu = (moneyDoanhThu / regulation.exchangeRate).toFixed(2);
            moneyTienGoc = (moneyTienGoc / regulation.exchangeRate).toFixed(2)
          }
          arrDoanhThu.push(moneyDoanhThu);
          arrTienGoc.push(moneyTienGoc)
          arrLai.push(moneyDoanhThu - moneyTienGoc)
        }
      }

      if (nowTime.getDate() % 4 !== 0) {
        let moneyDoanhThu = 0;
        let moneyTienGoc = 0;
        for (let i = 4 * Math.floor(nowTime.getDate() / 4); i <= nowTime.getDate(); i++) {
          let year = nowTime.getFullYear();
          let month = nowTime.getMonth() + 1;
          listReciept.map(reciept => {
            let dateReciept = reciept.date.replace(/\s/g, "");
            dateReciept = dateReciept.split("/")
            if (i == dateReciept[0] && month == dateReciept[1] && year == dateReciept[2]) {
              if (!reciept.deleted) {
                moneyDoanhThu += reciept.totalFinalMoney;
                reciept.listProduct.map(value => {
                  moneyTienGoc += value.quantity * value.product.importPrice;
                })
              }
            }
          })
        }
        if (regulation.currency !== 'vnd') {
          moneyDoanhThu = (moneyDoanhThu / regulation.exchangeRate).toFixed(2);
          moneyTienGoc = (moneyTienGoc / regulation.exchangeRate).toFixed(2)
        }
        arrDoanhThu.push(moneyDoanhThu);
        arrTienGoc.push(moneyTienGoc)
        arrLai.push(moneyDoanhThu - moneyTienGoc)
      }

      setTienGoc(arrTienGoc)
      setTienDoanhThu(arrDoanhThu)
      setTienLai(arrLai)
    } else {

      for (let i = 1; i <= 7; i++) {
        let date = arrDate[i].replace(/\s/g, "");
        date = date.split("/")
        let moneyDoanhThu = 0;
        let moneyTienGoc = 0;
        listReciept.map(reciept => {
          let dateReciept = reciept.date.replace(/\s/g, "");
          dateReciept = dateReciept.split("/")
          if (date[0] == dateReciept[0] || date[0] - 1 == dateReciept[0] || date[0] - 2 == dateReciept[0] || date[0] - 3 == dateReciept[0]) {
            if (month123 == dateReciept[1] && year123 == dateReciept[2]) {
              if (!reciept.deleted) {
                moneyDoanhThu += reciept.totalFinalMoney;
                reciept.listProduct.map(value => {
                  moneyTienGoc += value.quantity * value.product.importPrice;
                })
              }
            }
          }
        })
        if (regulation.currency !== 'vnd') {
          moneyDoanhThu = (moneyDoanhThu / regulation.exchangeRate).toFixed(2);
          moneyTienGoc = (moneyTienGoc / regulation.exchangeRate).toFixed(2)
        }
        arrDoanhThu.push(moneyDoanhThu);
        arrTienGoc.push(moneyTienGoc)
        arrLai.push(moneyDoanhThu - moneyTienGoc)
      }

      if (new Date(year123, month123, 0).getDate() > 28) {
        let moneyDoanhThu = 0;
        let moneyTienGoc = 0;
        for (let i = 29; i <= new Date(year123, month123, 0).getDate(); i++) {
          listReciept.map(reciept => {
            let dateReciept = reciept.date.replace(/\s/g, "");
            dateReciept = dateReciept.split("/")
            if (i == dateReciept[0] && month123 == dateReciept[1] && year123 == dateReciept[2]) {
              if (!reciept.deleted) {
                moneyDoanhThu += reciept.totalFinalMoney;
                reciept.listProduct.map(value => {
                  moneyTienGoc += value.quantity * value.product.importPrice;
                })
              }
            }
          })
        }
        if (regulation.currency !== 'vnd') {
          moneyDoanhThu = (moneyDoanhThu / regulation.exchangeRate).toFixed(2);
          moneyTienGoc = (moneyTienGoc / regulation.exchangeRate).toFixed(2)
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
  const DateInYear = (year) => {
    let arrDoanhThu = []
    let arrTienGoc = []
    let arrLai = []
    for (let i = 1; i <= 12; i++) {
      let moneyDoanhThu = 0;
      let moneyTienGoc = 0;
      listReciept.map(reciept => {
        let dateReciept = reciept.date.replace(/\s/g, "");
        dateReciept = dateReciept.split("/")
        if (i == dateReciept[1] && year == dateReciept[2]) {
          if (!reciept.deleted) {
            moneyDoanhThu += reciept.totalFinalMoney;
            reciept.listProduct.map(value => {
              moneyTienGoc += value.quantity * value.product.importPrice;
            })
          }
        }
      })

      if (regulation.currency !== 'vnd') {
        moneyDoanhThu = (moneyDoanhThu / regulation.exchangeRate).toFixed(2);
        moneyTienGoc = (moneyTienGoc / regulation.exchangeRate).toFixed(2)
      }

      arrDoanhThu.push(moneyDoanhThu);
      arrTienGoc.push(moneyTienGoc)
      arrLai.push(moneyDoanhThu - moneyTienGoc)
      setTienGoc(arrTienGoc)
      setTienDoanhThu(arrDoanhThu)
      setTienLai(arrLai)
    }
  }

  // // Tắng trưởng của công ty
  const GrowthPercent = (month, year, type, arrCurrent, arrLast) => {
    let moneyLast = 0;
    let moneyCurrent = 0;

    if (month === 0) {
      listReciept.map(value => {
        let date = value.date.replace(/\s/g, "")
        date = date.split("/")
        if (date[2] == year) {
          if (!value.deleted) {
            moneyCurrent += value.totalFinalMoney
          }
        }
        if (date[2] == year - 1) {
          if (!value.deleted) {
            moneyLast += value.totalFinalMoney
          }
        }
      })
      if (moneyLast == 0 && moneyCurrent == 0) {
        setGrowth('(+0%) than Last Year')
      } else if (moneyLast == 0) {
        setGrowth('(+100%) than Last Year')
      } else if (moneyCurrent == 0) {
        setGrowth('(+0%) than Last Year')
      } else {
        let percent = (moneyCurrent / moneyLast) * 100
        if (percent >= 100) {
          setGrowth(`(+${(percent - 100).toFixed(2)}%) than Last Year`)
        } else {
          setGrowth(`(-${(100 - percent).toFixed(2)}%) than Last Year`)
        }
      }
    } else if (month !== 0 && month == nowTime.getMonth() + 1 && year == nowTime.getFullYear()) {
      if (type === 'Week' || type === 'Last Week') {
        arrCurrent.map(date => {
          let item = date.split(" ");
          listReciept.map(value => {
            let valueDate = value.date.replace(/\s/g, "")
            valueDate = valueDate.split("/")
            if (!value.deleted) {
              if (item[0] == valueDate[0] && item[1] == valueDate[1] && item[2] == valueDate[2]) {
                moneyCurrent += value.totalFinalMoney
              }
            }
          })
        })

        arrLast.map(date => {
          let item = date.split(" ");
          listReciept.map(value => {
            let valueDate = value.date.replace(/\s/g, "")
            valueDate = valueDate.split("/")
            if (!value.deleted) {
              if (item[0] == valueDate[0] && item[1] == valueDate[1] && item[2] == valueDate[2]) {
                moneyLast += value.totalFinalMoney
              }
            }
          })
        })

        if (moneyLast == 0 && moneyCurrent == 0) {
          setGrowth('(+0%) than Last Week')
        } else if (moneyLast == 0) {
          setGrowth('(+100%) than Last Week')
        } else if (moneyCurrent == 0) {
          setGrowth('(+0%) than Last Week')
        } else {
          let percent = (moneyCurrent / moneyLast) * 100
          if (percent >= 100) {
            setGrowth(`(+${(percent - 100).toFixed(2)}%) than Last Week`)
          } else {
            setGrowth(`(-${(100 - percent).toFixed(2)}%) than Last Week`)
          }
        }
      } else {
        let lastMonth = month == 1 ? 12 : month - 1
        let yearOfLastMonth = month == 1 ? year - 1 : year
        listReciept.map(value => {
          let date = value.date.replace(/\s/g, "")
          date = date.split("/")
          if (date[1] == month && date[2] == year) {
            if (!value.deleted) {
              moneyCurrent += value.totalFinalMoney
            }
          }
          if (date[1] == lastMonth && date[2] == yearOfLastMonth) {
            if (!value.deleted) {
              moneyLast += value.totalFinalMoney
            }
          }
        })


        if (moneyLast == 0 && moneyCurrent == 0) {
          setGrowth('(+0%) than Last Month')
        } else if (moneyLast == 0) {
          setGrowth('(+100%) than Last Month')
        } else if (moneyCurrent == 0) {
          setGrowth('(+0%) than Last Month')
        } else {
          let percent = (moneyCurrent / moneyLast) * 100
          if (percent >= 100) {
            setGrowth(`(+${(percent - 100).toFixed(2)}%) than Last Month`)
          } else {
            setGrowth(`(-${(100 - percent).toFixed(2)}%) than Last Month`)
          }
        }
      }
    } else {
      let lastMonth = month == 1 ? 12 : month - 1
      let yearOfLastMonth = month == 1 ? year - 1 : year
      listReciept.map(value => {
        let date = value.date.replace(/\s/g, "")
        date = date.split("/")
        if (date[1] == month && date[2] == year) {
          if (!value.deleted) {
            moneyCurrent += value.totalFinalMoney
          }
        }
        if (date[1] == lastMonth && date[2] == yearOfLastMonth) {
          if (!value.deleted) {
            moneyLast += value.totalFinalMoney
          }
        }
      })
      if (moneyLast == 0 && moneyCurrent == 0) {
        setGrowth('(+0%) than Last Month')
      } else if (moneyLast == 0) {
        setGrowth('(+100%) than Last Month')
      } else if (moneyCurrent == 0) {
        setGrowth('(+0%) than Last Month')
      } else {
        let percent = (moneyCurrent / moneyLast) * 100
        if (percent >= 100) {
          setGrowth(`(+${(percent - 100).toFixed(2)}%) than Last Month`)
        } else {
          setGrowth(`(-${(100 - percent).toFixed(2)}%) than Last Month`)
        }
      }
    }
  }


  React.useEffect(() => {

    if (typeMonth === 0) {
      DateInYear(typeYear)
      GrowthPercent(typeMonth, typeYear, typeTimeDashboard);
      setTypeData(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
      setShowOption(false);
      setTitle('last year')
    } else if (typeMonth !== 0 && typeMonth == nowTime.getMonth() + 1 && typeYear == nowTime.getFullYear()) {
      setShowOption(true);
      if (typeTimeDashboard === 'Week' || typeTimeDashboard === 'Last Week') {
        let arrCurrent = DateInWeek('Week')
        let arrLast = DateInWeek('Last Week')
        setTypeData(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sartuday', 'Sunday'])
        totalMoneyInWeek(DateInWeek(typeTimeDashboard), typeTimeDashboard);
        GrowthPercent(typeMonth, typeYear, typeTimeDashboard, arrCurrent, arrLast);
        setTitle('last Week')
      } else {
        setShowOption(true);
        totalMoneyInMonth(DateInMonth(typeMonth, typeYear, true), true, typeMonth, typeYear)
        GrowthPercent(typeMonth, typeYear, typeTimeDashboard, '', '');
      }
    } else {
      setShowOption(false);
      totalMoneyInMonth(DateInMonth(typeMonth, typeYear, false), false, typeMonth, typeYear)
      GrowthPercent(typeMonth, typeYear, typeTimeDashboard, '', '');
    }

  }, [typeTimeDashboard, growth, typeMonth, typeYear,regulation])



  return (
    <Card>
      <div className="titleStatistic">
        <CardHeader style={{ fontWeight: '800' }} title="Revenue" subheader={growth} />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <OptionYear></OptionYear>
          <OptionMonth></OptionMonth>
          {showOption ? (
            <SplitButton></SplitButton>
          ) : null}
        </div>
      </div>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
