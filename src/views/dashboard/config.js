/*
 * @Author: your name
 * @Date: 2023-02-16 15:08:18
 * @LastEditTime: 2023-02-20 18:24:36
 * @LastEditors: DESKTOP-2OD8ACM
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin-template\src\views\dashboard\config.js
 */
const config1={
  color:"['#fff', '#fff']",
  data:[60,50,40],
  shape: 'round',
  waveHeight: 25,
}

const config2={
    header: ['断面名称', '水质', '总磷'],
    data: [
      ['朱家河口', 'IV', '0.215'],
      ['江夏湖心', 'III', '0.025'],
      ['西梁子湖心', 'II', '0.92'],
      ['宗关', 'II', '0.042'],
      ['郭玉', 'III', '0.106'],
      ['牛山湖湖心', 'II', '0.019'],
      ['冯集', 'V', '0.100'],
      ['金水闸', 'III', '0.046'],
      ['太平沙', 'III', '0.103'],
      ['白浒山', 'II', '0.076']
    ],
    index: true,
    columnWidth: [50],
    align: ['center'],
    carousel: 'page'
}

// const config3={
//   //左下角
//   data: [
//     {
//       name: '周口',
//       value: 55
//     },
//     {
//       name: '南阳',
//       value: 120
//     },
//     {
//       name: '西峡',
//       value: 78
//     },
//     {
//       name: '驻马店',
//       value: 66
//     },
//     {
//       name: '新乡',
//       value: 80
//     },
//     {
//       name: '信阳',
//       value: 45
//     },
//     {
//       name: '漯河',
//       value: 29
//     }
//   ]
// }

const config3={
  title: {
    text: '水质指标',
    style:{
      fill:'#aeeff0',
    }
  },

  xAxis: {
    name: '时间',
    data: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'],
    nameTextStyle: {
      fill: '#aeeff0',
      // fontSize: 10
    },
    axisLabel:{
      style: {
        fill: '#aeeff0',
      }
    }
  },
  yAxis: {
    name: '磷含量(毫克/升)',
    data: 'value',
    nameTextStyle: {
      fill: '#aeeff0',
      // fontSize: 10
    },
    axisLabel:{
      style: {
        fill: '#aeeff0',
      }
    },
    interval :0.1,
    min:1.8
  },
  series: [
    {
      data: [1.95, 1.91, 1.93, 1.97, 1.98, 1.97, 1.95],
      type: 'line',
      smooth: true,
      color:'#32c5e9',
      label: {
        show: true,
        formatter: '{value}'
      }
    }
  ]
}

const config4={

  radius: '70%',
  activeRadius: '75%',
  data: [
    {
      name: 'I',
      value: 55
    },
    {
      name: 'Ⅱ',
      value: 120
    },
    {
      name: 'Ⅲ',
      value: 78
    },
    {
      name: 'Ⅳ',
      value: 66
    },
    {
      name: 'Ⅴ',
      value: 80
    }
  ],
  digitalFlopStyle: {
    fontSize: 25,
    fill: 'white'
  }
}

const config5={
  points: [
    {
      name: '郑州',
      coordinate: [0.48, 0.35],
      icon: {
        src: require('@/assets/mapCenterPoint.png'),
        width: 30,
        height: 30
      },
      text: {
        color: '#fb7293'
      }
    },
    {
      name: '新乡',
      coordinate: [0.52, 0.23]
    },
    {
      name: '焦作',
      coordinate: [0.43, 0.29]
    },
    {
      name: '开封',
      coordinate: [0.59, 0.35]
    },
    {
      name: '许昌',
      coordinate: [0.53, 0.47]
    },
    {
      name: '平顶山',
      coordinate: [0.45, 0.54]
    },
    {
      name: '洛阳',
      coordinate: [0.36, 0.38]
    },
    {
      name: '周口',
      coordinate: [0.62, 0.55]
    },
    {
      name: '漯河',
      coordinate: [0.56, 0.56]
    },
    {
      name: '南阳',
      coordinate: [0.37, 0.66]
    },
    {
      name: '信阳',
      coordinate: [0.55, 0.81]
    },
    {
      name: '驻马店',
      coordinate: [0.55, 0.67]
    },
    {
      name: '济源',
      coordinate: [0.37, 0.29]
    },
    {
      name: '三门峡',
      coordinate: [0.20, 0.36]
    },
    {
      name: '商丘',
      coordinate: [0.76, 0.41]
    },
    {
      name: '鹤壁',
      coordinate: [0.59, 0.18]
    },
    {
      name: '濮阳',
      coordinate: [0.68, 0.17]
    },
    {
      name: '安阳',
      coordinate: [0.59, 0.10]
    }
  ],
  lines: [
    {
      source: '新乡',
      target: '郑州'
    },
    {
      source: '焦作',
      target: '郑州'
    },
    {
      source: '开封',
      target: '郑州'
    },
    {
      source: '许昌',
      target: '郑州'
    },
    {
      source: '平顶山',
      target: '郑州'
    },
    {
      source: '洛阳',
      target: '郑州'
    },
    {
      source: '周口',
      target: '郑州'
    },
    {
      source: '漯河',
      target: '郑州'
    },
    {
      source: '南阳',
      target: '郑州'
    },
    {
      source: '信阳',
      target: '郑州'
    },
    {
      source: '驻马店',
      target: '郑州'
    },
    {
      source: '济源',
      target: '郑州'
    },
    {
      source: '三门峡',
      target: '郑州'
    },
    {
      source: '商丘',
      target: '郑州'
    },
    {
      source: '鹤壁',
      target: '郑州'
    },
    {
      source: '濮阳',
      target: '郑州'
    },
    {
      source: '安阳',
      target: '郑州'
    }
  ],
  icon: {
    show: true,
    src: require('@/assets/mapPoint.png')
  },
  text: {
    show: true,
  },
  bgImgSrc: require('@/assets/map.jpg')
}

const config6={
  data: [
    {
      name: '武汉钢铁有限公司',
      value: 13.12
    },
    {
      name: '湖北省中医院',
      value: 13.19
    },
    {
      name: '东风雷诺汽车有限公司',
      value: 17.7
    },
    {
      name: '华润武钢总医院',
      value: 10.20
    },
    {
      name: '武汉奥克化学有限公司',
      value: 7.61
    },
    {
      name: '武汉有机实业有限公司',
      value: 9.76
    },
    {
      name: '武汉大学口腔医院',
      value: 16.92
    },
    {
      name: '武汉世吉药业有限公司',
      value: 7.53
    },
    {
      name: '武汉市金银潭医院',
      value: 7.31
    },
    
  ],
  unit: '吨',
  img: [
    require('@/assets/mapPoint.png'),
    require('@/assets/mapPoint.png'),
    require('@/assets/mapPoint.png'),
    require('@/assets/mapPoint.png'),
    require('@/assets/mapPoint.png'),
    require('@/assets/mapPoint.png'),
    require('@/assets/mapPoint.png')
  ],
  showValue: true,
  textColor:'black',
}

const config7={
  data: [
    {
      name: '汉口站',
      value: 55
    },
    {
      name: '汉江站',
      value: 80
    },
    {
      name: '举水站',
      value: 78
    },
    {
      name: '江夏站',
      value: 66
    },
    {
      name: '武湖站',
      value: 75
    }
  ],
  unit: '分',
  showValue: true
}


export { config1,config2,config3,config4,config5,config6,config7}
