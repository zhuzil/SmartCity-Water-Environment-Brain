<template>
  <div class="image">
    <div style="width: 90%; margin: 0 auto;">
      <h2 style="padding: 0 0 10px 0; margin: 20px 0 10px 0;">
        反演结果：
      </h2>
      <div style="border: 2px solid #304156;  border-radius: 5px; padding: 10px;">
        <el-form style="padding: 5px 0px 0px 2rem;">
          <el-row>
            <el-col :span="5">
              <el-form-item label="选择监测点" class="formItem">
                <el-select v-model="chick" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
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
                  :options="dateOptions"
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
                    v-for="item in options"
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
                    v-for="item in options"
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
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <img :src="require('../../assets/pollution/' + (item.src) + '.png')" style="padding: 10px 0 0 0;">
            <p style=" margin:0.5rem 0">{{ item.name }}</p>
          </li>
        </ul>
      </div>

      <h2 style="padding: 0; ">
        结果分析：
      </h2>
    </div>
    <div style="width: 90%; margin: 0 auto;">
      <div id="resultTxt">
        <p class="p1">1、检测对象：</p>
        <p>此次水质异常断面：滠口,2023-02-20,12:00。</p>
        <p class="p1">2、监测结果：</p>
        <p>水质类别：V,ph:7.96,溶解氧:8.01,电导率:246.0,浊度:47.3,高锰酸盐指数：3.82,氨氮:1.881,总磷:0.140,总氮:3.65,叶绿素:*,藻密度:*</p>
        <p class="p1">3、遥感结果：</p>
        <p>异常值:浊度,    问题源点定位：  精度：30.732780,纬度：113.333880,    浊度：49.9     严重超标！
        </p> 
        <p>
           异常值:氨氮,    问题源点定位：  精度：30.734780,纬度：113.358320,    氨氮：2.014    中度超标
        </p>
        <p class="p1">4、原因分析：</p>
        <p>
          浊度:
            （1）物理因素：雨水的冲积：下雨的时候，雨水会冲刷在池塘坡度上的泥沙，造成水质的浑浊。
            （2）生物因素：放养密度过大目前很多养殖户在水产养殖的时候水生动物的密度过大，在池塘中形成大面积的水生动物的活动而引起水体的浑浊。最终导致水体中的水质透明度降低；水体中的藻类无法进行光合作用，池塘底的溶解氧较低，容易引起对虾缺氧浮头。
        </p>
        <p>
            氨氮：
            （1）物理因素：周围排污企业废水未达标排放
            （2）生物因素：氧化菌适合生存在靠近碱性环境下。形成该现象的主要原因是于受 PH 值的影响，氧化沟内硝化菌与反硝化菌受到限制将使氧化菌转化为氨态氮，从而增加进水氨氮的含量。
        </p>
      </div>
      <div class="grid-content bg-purple-light" style="padding: 1rem 0; text-align: right;">
        <el-button type="primary" @click="SaveResult">保存结果</el-button>
      </div>
    </div>
    <div style="margin-bottom: 5rem;">
    </div>
  </div>
</template>

<script>
import Element from 'element-ui';
export default {
  data() {
    return {
      list: [
        {
          src:'1',
          name:'原图'
        },
        {
          src:'COD_2',
          name:'COD'
        },
        {
          src:'DO_2',
          name:'DO'
        },
        {
          src:'NH_2',
          name:'NH'
        },
        {
          src:'TN_2',
          name:'TN'
        },
        {
          src:'TP_2',
          name:'TP'
        }
      ],
      display_pq:true,
      display_qd:true,
      options: [{
        value: '选项1',
        label: '监测点1'
      }, {
        value: '选项2',
        label: '监测点2'
      }],
      chick: '',
      date: [],
      dateOptions: [],
    }

  },
  mounted() {
    this.initDate();
  },
  methods :{
    SaveResult(){
      this.$message({
        message: '保存成功',
        type: 'success'
      });
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

<style lang='less' scoped>
.image {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      flex: 0 0 30%;
      height: 24rem;
      display: inline-block;
      // background: #ededee;
      margin-bottom: 1rem;
      text-align: center;
    }
  }
  #resultTxt {
    border: 2px solid #304156;
    border-radius: 5px;
    // width: 90%;
    margin: 0 auto;
    padding: 10px 10px;
    .p1{
      text-indent:0;
    }
    p{
      margin: 0;
      padding: 0;
      text-indent:2em;
      font-family:"Microsoft Yahei";
      line-height:1.5em;

    }
  }
}
</style>

<style>
.formItem .el-form-item__label {
  color: black;
  font-size: 18px;
}
</style>
