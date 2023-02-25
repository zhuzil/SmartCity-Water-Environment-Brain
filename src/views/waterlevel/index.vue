<template>
  <div >
    <el-row type="flex" :gutter="20">
      <el-col :span="10">
        <p>
          <el-select
            v-model="keywords"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            :clearable="true"
            size="mini"
            @change="currentSelect"
            style="width: 500px"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item"
              class="one-text"
            >
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.district
                }}</span>
            </el-option>
          </el-select>
        </p>

      </el-col>

      <el-col :span="3"><p>纬度：{{ form.lat }}</p> </el-col>
      <el-col :span="3" ><p>经度：{{ form.lng }}</p></el-col>
      <el-col :span="4"><p>详细地址：{{ form.address }}</p></el-col>
    </el-row>


    <div id="container" class="container"></div>
    <button @click="getPoints"></button>
    <button @click="removePoints"></button>

  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
  // 安全密钥
  securityJsCode: "cf8b1622ebc431cb5168645d381afde8",
};
export default {
  name: "TestIndex",
  data() {
    return {
      // 地图实例
      map: null,
      // 标记点
      marker: "",
      markerList:[],
      windowList:[],
      // 地址逆解析
      geoCoder: null,
      // 搜索提示
      AutoComplete: null,
      // 搜索关键字
      keywords: "",
      // 位置信息
      form: {
        lng: "",
        lat: "",
        address: "",
        adcode: "", //地区编码
      },
      // 搜索节流阀
      loading: false,
      // 搜索提示信息
      options: [],
    };
  },
  methods: {
    initMap() {
      AMapLoader.load({
        // 你申请的Key
        key: "c45b8bff109f4651e2efe0793ca26521",
        version: "2.0",
        // 需要用到的插件
        plugins:["AMap.Geocoder",'AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation', 'AMap.AutoComplete', 'AMap.PlaceSearch','AMap.DistrictSearch',
         'AMap.OverView', 'AMap.PolyEditor', 'AMap.CircleEditor'],
        
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            mapStyle:'amap://styles/macaron',
            viewMode: "3D", //是否为3D地图模式
            zoom: 10, //初始化地图级别
            center: [114.364908, 30.545242], //初始化地图中心点位置
          });
          this.drawBounds();
          //地址逆解析插件
          this.geoCoder = new AMap.Geocoder({
            city: "010", //城市设为北京，默认：“全国”
            radius: 1000, //范围，默认：500
          });
          // 搜索提示插件
          this.AutoComplete = new AMap.AutoComplete({ city: "全国" });

          this.map.addControl(new AMap.ToolBar({
            position:'RT'
          }));
          this.map.addControl(new AMap.Scale());
          this.map.addControl(new AMap.MapType());

          //点击获取经纬度;
          this.map.on("click", (e) => {
            // 获取经纬度
            this.form.lng = e.lnglat.lng;
            this.form.lat = e.lnglat.lat;
            // 清除点
            this.removeMarker();
            // 标记点
            this.setMapMarker(this.form.lng,this.form.lat);
          });
        })
        .catch((err) => {
          // 错误
          console.log(err);
        });
        // setTimeout(() => {
        //   this.drawBounds();
        // }, 200);
        
    },
    // 标记点
    setMapMarker(lng,lat) {
      // 自动适应显示想显示的范围区域
      this.map.setFitView();
      this.marker = new AMap.Marker({
        map: this.map,
        position: [lng,lat],
      });
      // 逆解析地址
      this.toGeoCoder();
      this.map.setFitView();
      this.map.add(this.marker);
    },
    // 清除点
    removeMarker() {
      if (this.marker) {
        this.map.remove(this.marker);
      }
    },
    // 逆解析地址
    toGeoCoder() {
      let lnglat = [this.form.lng, this.form.lat];
      this.geoCoder.getAddress(lnglat, (status, result) => {
        if (status === "complete" && result.regeocode) {
          this.form.address = result.regeocode.formattedAddress;
        }
      });
    },
    // 搜索
    remoteMethod(query) {
      console.log(query);
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.AutoComplete.search(query, (status, result) => {
            this.options = result.tips;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    // 选中提示
    currentSelect(val) {
      // 清空时不执行后面代码
      if (!val) {
        return;
      }
      this.form = {
        lng: val.location.lng,
        lat: val.location.lat,
        address: val.district + val.address,
        adcode: val.adcode,
      };
      // 清除点
      this.removeMarker();
      // 标记点
      this.setMapMarker(this.form.lng,this.form.lat);
    },
    getPoints(){
      var title = ["湖北华电武昌热电有限公司","污染厂2"]
      var type = ["排污企业","排污企业"]
      var waterQuality = ["IV","III"]
      var around = [[114.316725,30.577965],[114.40,30]];
      var p = [3.4,4.5]
      var ph=[8.04,]
      for(var i=0;i<around.length;i++){
        var mker = new AMap.Marker({
          map: this.map,
          position: [around[i][0], around[i][1]]
          });

        this.markerList.push(mker)
        var curposition = new AMap.LngLat(around[i][0],around[i][1]);
        mker.content=[];
        mker.content.push(
          ""+"<div>"+"站点名称："+title[i]+
          "<div>水质："+"<span style='background-color:#00CCFF'>"+"IV"+"</span>"+"</div>"+
          "</div>"+"<div>"+"经度"+around[i][0]+"</div>"+
          "<div>"+"纬度"+around[i][1]+"</div>"+
          "<div>"+"磷含量："+"<span style='color: #66A0FF'>"+p[i]+"</span>"+"</div>"+
          "<div>"+"</div>"
        )

        this.map.add(mker);  //在地图上显示标记的点
        mker.on("click",this.markerClick);

      }
    },
    removePoints(){
      for(var i = 0;i<this.markerList.length;i++){
        this.map.remove(this.markerList[i])
        // this.windowList[i].close();
      }
      this.markerList.clear();
    },
    markerClick(e) {
      //offset用来偏移，第一个参数是左右，第一个参数是上下。左和上是负的，右和下是正的
      var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
      infoWindow.setContent(e.target.content);
      infoWindow.open(this.map, e.target.getPosition());
      // this.windowList.push(infoWindow)
      this.map.setFitView()
    },
    //绘制遮罩，显示某个省
    drawBounds() {
      // alert('coming')
      //加载行政区划插件
      let opts = {
          subdistrict: 0,   //获取边界不需要返回下级行政区
          extensions: 'all',  //返回行政区边界坐标组等具体信息
          // level: 'district'  //查询行政级别为 市
          levrl:'city'
      }
      let district = new AMap.DistrictSearch(opts)
      let polygons=[]
      district.setLevel('湖北省')
      district.search("湖北省", (status, result)=> {
          this.map.remove(polygons)//清除上次结果
          polygons = [];
          let bounds = result.districtList[0].boundaries;
          if (bounds) {
              for (let i = 0, l = bounds.length; i < l; i++) {
                  //生成行政区划polygon
                  let polygon = new AMap.Polygon({
                      strokeWeight: 1,
                      path: bounds[i],
                      fillOpacity: 0.4,
                      fillColor: '#ffffff',
                      strokeColor: '#0A1A29'
                  });
                  polygons.push(polygon);
              }
          }
          this.map.add(polygons)
          this.map.setFitView(polygons);//视口自适应
          //那遥远的四个点在这
          let outer = [
              new AMap.LngLat(-360,90,true),
              new AMap.LngLat(-360,-90,true),
              new AMap.LngLat(360,-90,true),
              new AMap.LngLat(360,90,true),
          ]
          let holes = result.districtList[0].boundaries

          let pathArray = [
              outer
          ]
          pathArray.push.apply(pathArray,holes)
          let polygon = new AMap.Polygon( {
              pathL:pathArray,
              //线条颜色，使用16进制颜色代码赋值。默认值为#006600
              // strokeColor: 'rgb(20,164,173)',
              strokeColor:"#001826",
              strokeWeight: 1,
              //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
              strokeOpacity:0.5,
              //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
              fillColor: '#ffffff',
              //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
              fillOpacity: 1,
              //轮廓线样式，实线:solid，虚线:dashed
              strokeStyle:'dashed',
              /*勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在
                ie9+浏览器有效 取值：
                实线：[0,0,0]
                虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
                点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实
                线和10个像素的空白 （如此反复）组成的虚线*/
              strokeDasharray:[10,2,10]
          });
          polygon.setPath(pathArray)
          this.map.add(polygon)
          this.map.setZoom(10)
          this.map.setCenter([114.364908, 30.545242])
      })
    }
  },
  mounted() {
    this.initMap();
    // this.getPoints();
  },
};
</script>

<style>
.container {
  width: 100%;
  height: 600px;
}
.sp_wt{
  display:block;
  border-radius:5px;
  color:#000;
  width:40px;
  height:19px;
  line-height: 21px;
  margin:auto;
  background-color: #34c3f6;
}
</style>
