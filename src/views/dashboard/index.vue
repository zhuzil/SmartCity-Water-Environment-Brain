<template>
  <div class="dashboard-container">
    <div v-if="show" class="loadingDiv">
      <dv-loading id="loading">Loading...</dv-loading>
    </div>
    <div v-else style="margin:0">
      <div class="container">
        <div class="box left">
          <dv-border-box-12 class="border-box">
            <dv-charts :option="config3" class="charts" style="height:250px;"></dv-charts>
          </dv-border-box-12>
          <dv-border-box-8 class="border-box">
            <dv-scroll-board :config="config2" class="charts" style="height:280px" />
          </dv-border-box-8>
          <dv-border-box-12 class="border-box">
            <div style="width:95%;margin: 0 auto;"><h3 style="text-align: center; margin: 1rem 0 0 0;color: aliceblue;">企业排污量</h3></div>
            <dv-scroll-ranking-board :config="config6" class="charts" style="height:230px" />
            <!-- <dv-charts :option="config3" class="charts" style="height:230px"/> -->
          </dv-border-box-12>

        </div>
        <div class="box center">
          <!-- <dv-border-box-1 class="border-box"> -->
            <dv-border-box-11 :color="['#2e6099','#2e6099']" title="城市水环境智慧大脑">
            <el-form :inline="true" style="padding: 5rem 0px 0px 5rem;">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="选择指标" class="formItem" style="margin: 0 1rem 0 0;">
                    <el-select  clearable placeholder="请选择">
                      <el-option
                        v-for="item in LLoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="选择站点" class="formItem" style="margin: 0 0 0 0;">
                    <el-select clearable placeholder="请选择">
                      <el-option
                        v-for="item in LLoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div style="width: 100%;">
              <dv-decoration-8 :color="['#2e6099']" style="width:49%;height:30px;margin: 10px 0 0 10px; display: inline-block;" />
              <dv-decoration-8 :color="['#2e6099']" :reverse="true" style="width:49%;height:30px;margin: 10px 0 0 0; display: inline-block;" />
            </div>
            
            <!-- <dv-flyline-chart-enhanced :config="config5" :dev="true" class="charts" style="height:800px"/> -->
            <div id="map" style="width:600px;height: 700px;margin: 0 auto"></div>
          <!-- </dv-border-box-1> -->
        </dv-border-box-11>
        </div>
        <div class="box right">
          <dv-border-box-12 class="border-box">
            <!-- <dv-scroll-ranking-board :config="config3" class="charts" style="height:250px" /> -->
              <!-- <dv-active-ring-chart :config="config4" class="charts" style="height:250px" /> -->
              <div style="width:95%;margin: 0 auto;"><h3 style="text-align: center; margin: 1rem 0 0 0;color: aliceblue;">各水质占比</h3></div>
              <dv-active-ring-chart class="radio" :config="config4" style="width:250px;height:250px;margin: 0 auto;" />
<!--            <dv-charts :config="config3" class="charts" style="height:250px"></dv-charts>-->
          </dv-border-box-12>
          <dv-border-box-8 :reverse="true" class="border-box">
            <!-- <dv-conical-column-chart :config="config6" class="charts" style="height:250px;" /> -->
            <div style="width:95%;margin: 0 auto;"><h3 style="text-align: center; margin: 1rem 0 0 0;color: aliceblue;">汉口站水位</h3></div>
            <dv-water-level-pond  :config="config1"  style="height:250px; width: 50%; margin: 0 auto;" />
          </dv-border-box-8>
          <dv-border-box-12 class="border-box">
            <div style="width:95%;margin: 0 auto;"><h3 style="text-align: center; margin: 1rem 0 0 0;color: aliceblue;">各站点水质质量</h3></div>
            <dv-capsule-chart :config="config7" class="charts" style="height:250px" />
          </dv-border-box-12>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Charts from '@jiaminghi/charts'
import {config1,config2,config3,config4,config5,config6,config7} from "./config.js"
import echarts from "echarts"  //先引入echarts
import axios from 'axios'

export default {
  data() {
    return{
      show:true,
      config1,
      config2,
      config3,
      config4,
      config5,
      config6,
      config7,
      LLoptions: [{
        value: '选项1',
        label: '监测点1'
      }, {
        value: '选项2',
        label: '监测点2'
      }],
    }
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    showLoading() {
      this.awesome = !this.awesome
    },
    init(){
      var myChart = echarts.init(document.getElementById('map'));
      echarts.registerMap('cityMap',this.mapJson,{});  //加载自定义边界数据地图
      // 随机生成每个区的污染站点数
      // var dict = {};
      // for(var i=0;i<this.mapJson.features.length;i++){
      //   var name = this.mapJson.features[i].properties.name;
      //   dict[name] = Math.floor(Math.random() * 100);
      // }
      var option = {
        // backgroundColor:'#04222e',// 背景颜色
        tooltip: {
          trigger: 'item',
          formatter: p => {
            // console.log(p.name)
            let val = p.data.value;
            if (window.isNaN(val)) {
              val = 0;
            }
            if (p.name == '武昌区') {
              val=1;
            }
            let txtCon = "<div style='text-align:center'> 地区：" + p.name + "<br />污染点数：" + val + "<br />" + '</div>';
              // "<div style='text-align:center'> 地区：" + p.name + "<br />污染点数：" + p.data.value + "<br />" + '</div>';
            return txtCon;
          }
        },
        series: [
          {
            name: '地图',
            type: 'map',
            mapType: 'cityMap',
            aspectScale: 0.85,  //地图长度比
            itemStyle: {
              normal: {
                show: true,
                areaColor:'#031525', //地图区域的颜色 也可以颜色渐变如下的 areaColor
                // areaColor:'#ffffff',
                // areaColor:'#304156',
                // areaColor:{
                //     type: 'radial',
                //     x: 0.5,
                //     y: 0.5,
                //     r: 0.8,
                //     colorStops: [{
                //         offset: 0,
                //         color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                //     }, {
                //         offset: 1,
                //         color: 'rgba(147, 235, 248, .5)' // 100% 处的颜色
                //     }],
                //     globalCoord: false // 缺省为 false
                // },
                borderColor: '#0CD5DD', //边界线颜色
                // borderColor: '#031525',
                borderWidth: '1', //边界线的宽度
              },
              emphasis: { // 鼠标移入时区域的样式
                areaColor: '#2AB8FF',
                borderWidth: 0,
                color: 'green'
              }
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#32c5e9'  //省市区字体颜色
                  // color: 'black'
                }
              },
              emphasis: {//对应的鼠标悬浮效果
                show: true,
                textStyle: {
                  color: '#333'  //鼠标移入对应的省市区字体颜色
                }
              }
            },
            data: this.mapData   // 上面添加了 name,value,level,cityCode的数据
          }
        ]
      }
      myChart.setOption(option);
    }
  },
  mounted() {
    // this.show = true;
    setTimeout(() => {
      this.show = false
      //areaCode 为省市区的code
      axios.get('https://geo.datav.aliyun.com/areas_v3/bound/420100_full.json').then(res=>{
        console.log('边界数据')
        console.log(res.data)  //获取的边界数据
        this.mapJson=res.data
        //对获取的每个子区域添加 name:省市区名称  value 要展示的值  level 此区域的省市区等级  cityCode：省市区的code
        //可通过需求自行添加和修改
        this.mapData = this.mapJson.features.map(item => {
          return ({
            name: item.properties.name,
            value: 0,
            level: item.properties.level,
            cityCode: item.properties.adcode
          })
        })
        this.init()//调用下面的 echarts初始化
      })
    }, 1000)
  }

}
</script>

<style scoped>
.loadingDiv{
  width: 33%;
  margin: 0 auto;
  padding: 20px;
  /* background: #f0e68c; */
}

.container{
  display: flex;
  flex-direction: row;
  background-color: #01132C;
  /* background-color: #ffffff; */
  /*background-color: #304156;*/
}
.left,.right{
  width: 25%;
}
.center{
  width: 50%;
}
.box{
  display: flex;
  flex-direction: column;
}
.charts{
  width: 90%;
  margin: 5%;
}
.border-box{
  margin: auto;
  padding: 0;
}

</style>

<style lang="less">
.dv-active-ring-chart .active-ring-info .active-ring-name{
  color: white;
}

.dv-capsule-chart .label-column{
  div{
    color: white;
  }
}

.ranking-value{
  color: #1370fb;
}
.info-name{
  color: white;
}
.el-form--inline .el-form-item__label{
  color: white;
}
.formItem .el-form-item__label{
  color: white;
}

</style>