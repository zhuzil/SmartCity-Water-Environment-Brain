<!--**************************************************************-->
<template>
  <div>
    <div>
      <el-form style="padding: 1rem 0px 1rem 3rem;">
          <el-row>
            <el-col :span="5">
              <el-form-item label="选择监测点" class="formItem">
                <el-select v-model="chick" clearable placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="时间日期" class="formItem">
                <el-cascader
                  v-model="date"
                  :options="selectOptions"
                  separator=""
                  :props="{ expandTrigger: 'hover' }"
                  clearable placeholder="请选择">
                </el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="选择污染物" class="formItem">
                <el-select v-model="chick" clearable placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="选择反演模型" class="formItem">
                <el-select v-model="chick" clearable placeholder="请选择">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" @click="Search">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      <div ref="chart" style="width:100%;height:400px;" />
    </div>
<!--######################################################-->
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button type="primary">更新数据</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <el-button type="primary" @click="getPredict">预测数据</el-button>
        </div>
      </el-col>
    </el-row>
<!--   ######################################################### -->
  </div>

</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      chart: null,
      option: {
        title: {
          text: '水中磷含量',
          x: 'center'
        },

        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket, callback) {
            var htmlStr = '';
            var valMap = {};
            for(var i=0;i<params.length;i++){
              var param = params[i];
              var xName = param.name;//x轴的名称
              var seriesName = param.seriesName;//图例名称
              var value = param.value;//y轴值
              var color = param.color;//图例颜色

              //过滤无效值
              if(value == '-'){
                continue;
              }

              //过滤重叠值
              if(valMap[seriesName] == value){
                continue;
              }

              if(i===0){
                htmlStr += xName + '<br/>';//x轴的名称
              }
              htmlStr +='<div>';
              //为了保证和原来的效果一样，这里自己实现了一个点的效果
              htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';

              //圆点后面显示的文本
              htmlStr += seriesName + '：' + value;

              htmlStr += '</div>';
              valMap[seriesName] = value;
            }
            return htmlStr;
          }
        },
        legend: {
          // orient: 'vertical',
          right:60,
          data: ['真实值','预测值']
        },
        grid:{
          left:'3%',
          right:'4%',
          bottom:'3%',
          containLabel:true

        },
        xAxis: {
          // boundaryGap:false,
          data: []
        },
        axisLabel:{
          show:true,
          interval:2,
          rotate:60
        },
        yAxis: {},
        series: [
          {
            name: '真实值',
            type: 'line',
            areaStyle:{
              normal:{
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255,0,0,0.39)'
                }, {
                  offset: .34,
                  color: 'rgba(255,0,0,0.25)'
                },{
                  offset: 1,
                  color: 'rgba(254,0,0,0.00)'
                }])
              }
            },//区域颜色渐变
            data: []
          },
          {
            name: '预测值',
            type:'line',
            smooth:false,
            itemStyle:{
              normal:{
                lineStyle:
                  {
                    width:2,
                    type:'dotted'
                  }
              }
            },
            areaStyle:{
              normal:{
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(193,198,203,0.39)'
                }, {
                  offset: .34,
                  color: 'rgba(193,198,203,0.25)'
                },{
                  offset: 1,
                  color: 'rgba(193,198,203,0.00)'
                }])
              }
            },//区域颜色渐变
            data:[]
          }
        ]
      },
      selectOptions: [{
        value: '选项1',
        label: '监测点1'
      }, {
        value: '选项2',
        label: '监测点2'
      }],
      chick: '',
      date: [],
      dateOptions: [],
      // data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20, 5, 20, 36, 10]
    }
  },
  // created() {
  //   // this.load()
  // },
  mounted: function() {
    this.load()
    this.initChart()
  },
  methods: {
    load(){

      axios.post("http://127.0.0.1:9091/getChart").then(res=>{
        // this.student.score = res.data.score
        // console.log(this.student.score)
        // document.getElementById("result").innerText = this.student.score
        // this.scoreEditable = true

        this.option.series[0].data = res.data['curData']
        this.option.xAxis.data = res.data['curDate']
        this.changeOption()
      })
    },
    getPredict(){
      axios.post("http://127.0.0.1:9091/predict" ,this.option.series[0].data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        var predictData = res.data['predictData']
        for(let i = 0;i<68;i++)
        {
          this.option.series[1].data.push("-")
        }
        this.option.series[1].data[63] = this.option.series[0].data[63]
        for(let i = 0;i<5;i++)
        {
          this.option.series[1].data[i+64] = predictData[i]
        }
        if(this.option.xAxis.data.length<69){
          for(let i = 0;i<5;i++)
          {
            this.option.xAxis.data.push("-")
          }

        }

        this.changeOption()

      })
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.option)
    },
    changeOption() {
      // var r = Math.floor(Math.random() * 12)
      // // splice会改变原来的数组
      // // var data = this.data.splice(r,6);
      // var d = this.data.slice(r, r + 6)
      // this.option.series[0].data = d
      this.chart.setOption(this.option)
    },
    initDate() {
      let { dateOptions } = this;
      for (let i = 0; i < 12; i++) {
        let month = { value: `${i + 1}月`, label: `${i + 1}月` };
        let children = [];
        for (let j = 0; j < 31; j++) {
          let day = { value: `${j + 1}号`, label: `${j + 1}号` };
          if (j < 29) {
            children.push(day);
          }
          if (j == 29) {
            if (i != 1) {
              children.push(day);
            }
          }
          if (j == 30) {
            if ([1, 3, 5, 7, 8, 10, 12].includes(i + 1)) {
              children.push(day);
            }
          }
        }
        this.$set(month, "children", children);
        dateOptions.push(month);
      }
    },
  }
}
</script>

<style scoped>
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
