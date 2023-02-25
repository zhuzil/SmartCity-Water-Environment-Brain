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
<!--      表格-->
      <div>
        <el-table
          :data="tableData"
          :span-method="arraySpanMethod"
          border
          style="width: 100%">
          <el-table-column
            prop="description"
            label="物质"
            width="80">
          </el-table-column>
          <el-table-column
            prop="temp"
            label="水温"
            width="80">
          </el-table-column>
          <el-table-column
            prop="ph"
            label="ph">
          </el-table-column>
          <el-table-column
            prop="oxygen"
            label="溶解氧">
          </el-table-column>
          <el-table-column
            prop="conductivity"
            label="电导率">
          </el-table-column>
          <el-table-column
            prop="turbidity"
            label="浊度">
          </el-table-column>
          <el-table-column
            prop="MnO"
            label="高猛酸盐指数">
          </el-table-column>
          <el-table-column
            prop="NH"
            label="氨氮">
          </el-table-column>
          <el-table-column
            prop="P"
            label="总磷">
          </el-table-column>
          <el-table-column
            prop="N"
            label="总氮">
          </el-table-column>
          <el-table-column
            prop="chlorophyll"
            label="叶绿素">
          </el-table-column>
          <el-table-column
            prop="Algal"
            label="藻密度">
          </el-table-column>

        </el-table>
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
      tableData: [{
        description:'标准',
        temp:'-',
        ph:'-',
        oxygen:10.0,
        conductivity:1300.0,
        turbidity:40.0,
        MnO:4.0,
        NH:1.0,
        P:0.200,
        N:13.00,
        chlorophyll:0.100,
        Algal:3534113,
      },
      {
        description:'源(磷)',
        temp:'9.4',
        ph:'7.48',
        oxygen:6.78,
        conductivity:343.6,
        turbidity:24.9,
        MnO:4.01,
        NH:0.135,
        P:0.357,
        N:13.06,
        chlorophyll:'*',
        Algal:'*',
      },
      {
        description:'超标情况',
        temp:'-',
        ph:'-',
        oxygen:"-",
        conductivity:"-",
        turbidity:"-",
        MnO:"轻微超标",
        NH:"-",
        P:"严重超标",
        N:"轻微超标",
        chlorophyll:'*',
        Algal:'*',
      },
        {
          description:"异常监测点：滠口,经度:114.0335508,纬度:30.724505,时间：2023-02-20,12:00",
        },
        {
          description:"反演结果分析：总磷严重超标；\n污染核心区域：经度：114.315031，纬度：30.593049；\n人为可能性：90%"
        },
        {
          description: '可能成因：活污水中磷的含量过高（一般是由含磷洗衣粉被过多使用而造成的）、好氧段的聚磷菌不能大量摄取溶解性磷（导致排泥不畅，沉淀效果较差）、工业污染（排放过多含磷的化学物质，如气体、液体、固体等）'
        }
      ],
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
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex >= 3) {
        if (columnIndex === 0) {
          return [1, 12];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
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
          if (j === 29) {
            if (i !== 1) {
              children.push(day);
            }
          }
          if (j === 30) {
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

.el-table .cell{
  white-space: pre-line;
}
</style>
