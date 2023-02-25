<template>
  <div id = "container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
// import bus from '@bus/bus'
window._AmapSecurityConfig = {
  securityJsCode: 'cf8b1622ebc431cb5168645d381afde8'
}

export default{
  data(){
    return{
      map:null,
      autoOptions:{
        input:''
      },
      searchPlaceInput:'',
      auto:null,
      placeSearch:null,
      district:null,
      polygons:[],
      showHeatOrNot:false,
      heatmap:null,
      heatmapList:null

    }
  },
  methods:{
    initMap() {
      AMapLoader.load({
        key:"c45b8bff109f4651e2efe0793ca26521",
        version:"2.0",
        terrain:true,
        plugins:['AMap.ToolBar','AMap.Scale','AMap.HawkEye','Amap.MapType','Amap.Geolocation','Amap.AutoComplete'],
      }).then((Amap)=>{
        this.map = new Amap.Map("mapContainer",{
          viewMode:"3D",
          zoom:5,
          center:[105.602725,37.076636],
        });
      }).catch(e=>{
        console.log(e);
      })

    }
  }

}
</script>

<style scoped>

</style>
