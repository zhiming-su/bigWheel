<template>
  <!--地图-->
  <div style="width: 100%; height: 700px">
    <div id="container"></div>
    <div id="allmap-right" class="drawing-panel" style="z-index: 99; top: 100px; height: 300px">
      <h4 style="text-align: center; color: red">飞行时相关数据</h4>
      <div style="display: flex">
        <div style="margin-right: 200px">属性</div>
        <div>数据</div>
      </div>
      <div style="display: flex">
        <div style="margin-right: 200px">速度</div>
        <div style="color: blue">{{ speed }}</div>
      </div>
      <div style="display: flex">
        <div style="margin-right: 200px">高度</div>
        <div style="color: chocolate">{{ height }}</div>
      </div>
      <div style="display: flex">
        <div style="margin-right: 170px">主板电压</div>
        <div style="color: cyan">{{ voltage }}</div>
      </div>
      <div style="display: flex">
        <div style="margin-right: 150px">Dist to Home</div>
        <div style="color: mediumorchid">{{ dist }}</div>
      </div>
      <div style="display: flex">
        <div style="margin-right: 200px">磁场</div>
        <div style="color: yellowgreen">{{ field }}</div>
      </div>
      <div style="display: flex">
        <div style="margin-right: 200px">迎角</div>
        <div style="color: blueviolet">{{ angle }}</div>
      </div>
    </div>
    <!--    <ul class="drawing-panel" style="z-index: 99">
      <li class="btn" @click="pauseAni">暂停</li>
      <li class="btn" @click="continueAni">继续</li>
    </ul>-->
  </div>
</template>
<script>
  import { loadBaiDuDrawMap } from './bmpgl.js';
  import { getUavTask } from '../getInfo.api';
  import { ref } from 'vue';

  export default {
    name: 'Show',
    data() {
      return {
        path: [
          {
            //起点和终点的经纬度
            lng: 116.29931131508742,
            lat: 40.04733690347144,
          },
          {
            lng: 116.2974669981613,
            lat: 40.048650892845274,
          },
          {
            lng: 116.29886238119673,
            lat: 40.04987620639946,
          },
        ],
        interval: null, // 定时器
        timesRun: 0, // 循环次数
        localSearch: null, // 自动搜索
        loading: false,
        transportmanageList: [],
        trackAni: null,
        maps: '', // 存放地图
        pls: '',
        speed: 500,
        height: 2300,
        voltage: 5000,
        dist: 0.03,
        field: 511.36,
        angle: 3.51,
      };
    },
    async mounted() {
      let subInfo = { uavTaskId: this.$route.query.aid };
      let getInfo = await getUavTask(subInfo);
      let myPath = [];
      getInfo.coordList.map((item, idx) => {
        let bean = { lng: '', lat: '' };
        bean.lng = item.longitude;
        bean.lat = item.latitude;
        myPath.push(bean);
      });
      this.path = myPath;
      //console.log(this.$route.query.aid)
      //console.log(getInfo)
      this.init(); // 初始化轨迹路线
      /*setInterval(this.updateData(), 1000);*/
    },
    created() {},
    methods: {
      updateData() {
        this.speed = (Math.floor(Math.random() * (550 - 450)) + 450).toFixed(2);
        this.height = (Math.floor(Math.random() * (3000 - 2500)) + 2500).toFixed(2);
        this.voltage = (Math.floor(Math.random() * (5005 - 4995)) + 4995).toFixed(2);
        this.dist = (Math.floor(Math.random() * (0.5 - 0.1)) + 0.1).toFixed(2);
        this.field = (Math.floor(Math.random() * (510 - 495)) + 495).toFixed(2);
        this.angle = (Math.floor(Math.random() * (6 - 2)) + 2).toFixed(2);
      },
      init() {
        setInterval(() => {
          this.speed = (Math.floor(Math.random() * (550 - 450)) + 450).toFixed(2);
          this.height = (Math.floor(Math.random() * (3000 - 2500)) + 2500).toFixed(2);
          this.voltage = (Math.floor(Math.random() * (5005 - 4995)) + 4995).toFixed(2);
          this.dist = (Math.floor(Math.random() * (0.5 - 0.1)) + 0.1).toFixed(2);
          this.field = (Math.floor(Math.random() * (510 - 495)) + 495).toFixed(2);
          this.angle = (Math.floor(Math.random() * (6 - 2)) + 2).toFixed(2);
        }, 1000);
        // 初始化地图
        loadBaiDuDrawMap().then((BMapGL) => {
          let that = this;
          // 创建地图实例
          let bmap = new BMapGL.Map('container');
          /*bmap.centerAndZoom(new BMapGL.Point(116.404, 39.915), 14) // 初始化地图,设置中心点坐标和地图级别
        bmap.enableScrollWheelZoom(true)  //开启鼠标滚轮缩放*/
          bmap.centerAndZoom(new BMapGL.Point(116.29931131508742, 40.04733690347144), 18); // 初始化地图,设置中心点坐标和地图级别
          bmap.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
          //bmap.setMapType(BMAP_EARTH_MAP);

          // 添加比例尺控件
          bmap.addControl(
            new BMapGL.ScaleControl({
              anchor: BMAP_ANCHOR_BOTTOM_LEFT,
              offset: new BMapGL.Size(10, 10),
            })
          );
          // 添加缩放控件
          bmap.addControl(
            new BMapGL.ZoomControl({
              anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
              offset: new BMapGL.Size(10, 10),
            })
          );

          let point = [];
          for (var i = 0; i < this.path.length; i++) {
            let poi = new BMapGL.Point(this.path[i].lng, this.path[i].lat);
            point.push(poi);
            let marker = new BMapGL.Marker(poi); //创建标注
            bmap.addOverlay(marker); //将标注添加到地图中
          }
          let pl = new BMapGL.Polyline(point, { strokeColor: 'blue', strokeWeight: 6, strokeOpacity: 0.5 });
          // 保存地图
          this.maps = bmap;
          this.pls = pl;

          setTimeout(this.start(), 3000);
          bmap.setHeading(64.5);
          bmap.setTilt(73);
        });
      },
      // 创建个轨迹动画对象，并配置参数
      start() {
        this.trackAni = new BMapGLLib.TrackAnimation(this.maps, this.pls, {
          overallView: true, // 动画完成后自动调整视野到总览
          tilt: 30, // 轨迹播放的角度，默认为55
          duration: 20000, // 动画持续时长，默认为10000，单位ms
          delay: 3000, // 动画开始的延迟，默认0，单位ms
        });
        this.trackAni.start();
      },
      pauseAni() {
        this.trackAni.pause();
      },
      continueAni() {
        this.trackAni.continue();
      },
    },
  };
</script>
<style scoped>
  #result {
    position: fixed;
    top: 10px;
    left: 20px;
    width: 300px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
    border-radius: 7px;
    z-index: 99;
  }

  #container {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: '微软雅黑';
  }
  ul li {
    list-style: none;
  }
  .drawing-panel {
    z-index: 999;
    position: fixed;
    bottom: 3.5rem;
    margin-left: 3rem;
    padding: 1rem 1rem;
    border-radius: 0.25rem;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
  }
  .btn {
    width: 90px;
    height: 30px;
    float: left;
    background-color: #fff;
    color: rgba(27, 142, 236, 1);
    font-size: 14px;
    border: 1px solid rgba(27, 142, 236, 1);
    border-radius: 5px;
    margin: 0 5px;
    text-align: center;
    line-height: 30px;
  }
  .btn:hover {
    color: #fff;
  }
</style>
