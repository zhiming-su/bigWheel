<template>
  <div class="content">
    <div id="allmap"></div>
    <div id="allmap-right" class="right-div">
      <h4 style="text-align: center; color: red">飞行时相关数据</h4>
      <table border="2" cellpadding="50" style="text-align: center; width: 500px">
        <th>属性</th>
        <th>数据</th>
        <tr>
          <td>速度</td>
          <td style="color: blue">{{ speed }}</td>
        </tr>
        <tr>
          <td>高度</td>
          <td style="color: chocolate">{{ height }}</td>
        </tr>
        <tr>
          <td>主板电压</td>
          <td style="color: cyan">{{ voltage }}</td>
        </tr>
        <tr>
          <td>Dist to Home</td>
          <td style="color: mediumorchid">{{ dist }}</td>
        </tr>
        <tr>
          <td>磁场</td>
          <td style="color: yellowgreen">{{ field }}</td>
        </tr>
        <tr>
          <td>迎角</td>
          <td style="color: blueviolet">{{ angle }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import { ref, onMounted } from 'vue';
  //import BMapGL from 'BMapGL';
  import { BMPGL } from './bmp.js';
  import { BMPGLLib } from './bmpLib.js';
  //import BMapGLLib from 'BMapGLLib';

  export default {
    name: 'BaiduMap',
    setup() {
      const speed = ref(500);
      const height = ref(2300);
      const voltage = ref(5000);
      const dist = ref(0.03);
      const field = ref(511.36);
      const angle = ref(3.51);

      function updateData() {
        speed.value = (Math.floor(Math.random() * (550 - 450)) + 450).toFixed(2);
        height.value = (Math.floor(Math.random() * (3000 - 2500)) + 2500).toFixed(2);
        voltage.value = (Math.floor(Math.random() * (5005 - 4995)) + 4995).toFixed(2);
        dist.value = (Math.floor(Math.random() * (0.5 - 0.1)) + 0.1).toFixed(2);
        field.value = (Math.floor(Math.random() * (510 - 495)) + 495).toFixed(2);
        angle.value = (Math.floor(Math.random() * (6 - 2)) + 2).toFixed(2);
      }

      onMounted(() => {
        setInterval(updateData, 1000);

        // Initialize Baidu Map
        BMPGL()
          .then((BMapGL) => {
            const bmap = new BMapGL.Map('allmap');
            bmap.centerAndZoom(new BMapGL.Point(116.29931131508742, 40.04733690347144), 18);
            bmap.enableScrollWheelZoom(true);
            bmap.setMapType(BMAP_EARTH_MAP);

            const path = [
              { lng: 116.29931131508742, lat: 40.04733690347144 },
              { lng: 116.2974669981613, lat: 40.048650892845274 },
              { lng: 116.29886238119673, lat: 40.04987620639946 },
            ];
            const point = path.map((p) => new BMapGL.Point(p.lng, p.lat));
            const pl = new BMapGL.Polyline(point, { strokeColor: 'red', strokeWeight: 5 });
            setTimeout(() => {
              BMPGLLib()
                .then((BMapGLLib) => {
                  const trackAni = new BMapGLLib.TrackAnimation(bmap, pl, { overallView: true, tilt: 30, duration: 10000, delay: 100 });
                  trackAni.start();
                })
                .catch((err) => {
                  console.log(err);
                });
            }, 3000);
          })
          .catch((err) => {
            console.log(err);
          });

      });
      return { speed, height, voltage, dist, field, angle };
    },

  };
</script>
