<template>
  <div id="app">
    <div id="container"></div>
  </div>
</template>

<script>

import HeYuan from "./HeYuan.json"
/**
 * 发起一个 JSONP 请求
 * @param {string} url - 请求的 URL
 * @param {Object} params - 请求的参数
 * @param {function} callback - 请求成功后的回调函数
 */
function jsonp(url, params, callback) {
  // 创建一个唯一的回调函数名称，以避免潜在的命名冲突
  const callbackName = `jsonp_callback_${Date.now()}_${Math.round(Math.random() * 1e9)}`;
  window[callbackName] = function(data) {
    // 清理全局变量，避免内存泄漏
    delete window[callbackName];
    // 调用用户提供的回调函数
    callback(data);
  };

  // 将回调函数名称添加到请求参数中
  params.callback = callbackName;

  // 将参数转换为URL查询字符串
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  // 发起JSONP请求
  const script = document.createElement('script');
  script.src = `${url}?${queryString}`;
  document.body.appendChild(script);

  // 为了处理可能的脚本加载错误，可以监听脚本的error事件
  // 但是请注意，JSONP的错误处理并不总是可靠的
  script.onerror = function() {
    delete window[callbackName];
    callback({ error: 'Failed to load JSONP resource' });
  };
}
const styleMap={
  441602: "style1",
  441621: "style2",
  441622: "style3",
  441623: "style4",
  441624: "style5",
  441625: "style6",

}

export default {
  name: 'App',
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      if (typeof TMap === 'undefined') {
        console.error('TMap is not defined');
        return;
      }
      const map = new TMap.Map('container', {
        center: new TMap.LatLng(23.7468, 114.6934),
        zoom: 9,
        // mapStyleId: 'style7',
        baseMap: {
          type: 'vector',
          features: ['base', 'point'],
        },
      });

      this.fetchDistrictData(map);
    },

    fetchDistrictData(map) {
      const result = this.parseGeojsonData(HeYuan);

      var area = new TMap.visualization.Area({
        styles: { //设置区域图样式
          style1: {
            strokeWidth: 2,
            fillColor: `#7DF4FF`, //设置区域填充颜色
            strokeColor: '#6799EA',
          },
          style2: {
            strokeWidth: 2,
            fillColor: '#0EB2E7', //设置区域填充颜色
            strokeColor: '#6799EA',
          },
          style3: {
            strokeWidth: 2,
            fillColor: '#17D5DC', //设置区域填充颜色
            strokeColor: '#6799EA',
          },
          style4: {
            strokeWidth: 2,
            fillColor: '#0EB2E7', //设置区域填充颜色
            strokeColor: '#6799EA',
          },
          style5: {
            strokeWidth: 2,
            fillColor: '#0896EF', //设置区域填充颜色
            strokeColor: '#6799EA',
          },
          style6: {
            strokeWidth: 2,
            fillColor: '#017CF7', //设置区域填充颜色
            strokeColor: '#6799EA',
          }
        },
        selectOptions: { //设置拾取配置
          action: 'hover',
          style: {
            fillColor: 'rgba(28,73,255,0.8)', //设置区域填充颜色
            strokeColor: '#fff', //设置区域边线颜色
            strokeWidth: 1, //区域边线宽度
            strokeDashArray: [0, 0] //边线虚线展示方式
          },
          enableHighlight: true,


        },
        enableBloom:true,

      }).setData(result).addTo(map);


    },
    /**
     * 解析 GeoJSON 数据并提取区域信息
     * @param {Object} geoJSONObject - GeoJSON 对象
     * @returns {Array} - 包含区域数据的数组
     */
    parseGeojsonData(geoJSONObject) {
      let areaData = [];
      let geoJSONFeature = null;
      // 判断传入的 geoJSONObject 是否为 FeatureCollection 类型
      if ('FeatureCollection' === geoJSONObject['type']) {
        // 获取 FeatureCollection 中的 features 数组
        const geoJSONFeatureCollection = geoJSONObject;
        const geoJSONFeatures = geoJSONFeatureCollection['features'];
        // 遍历 features 数组
        for (let i = 0, ii = geoJSONFeatures.length; i < ii; ++i) {
          // 获取当前遍历到的 feature
          geoJSONFeature = geoJSONFeatures[i];
          // 从 feature 中读取几何信息
          const result = this.readGeometryFromFeature(geoJSONFeature);
          // 如果读取失败，则跳过当前循环
          if (!result) {
            continue;
          }
          // 将读取到的几何信息添加到 areaData 数组中
          areaData = areaData.concat(result);
        }
      } else {
        // 如果传入的 geoJSONObject 不是 FeatureCollection 类型，则直接将其作为 feature 处理
        geoJSONFeature = geoJSONObject;
        // 从 feature 中读取几何信息
        const result = this.readGeometryFromFeature(geoJSONFeature);
        // 如果读取失败，则直接返回
        if (!result) {
          return;
        }
        // 将读取到的几何信息添加到 areaData 数组中
        areaData = areaData.concat(result);
      }

      return areaData;
    },

    /**
     * 从 GeoJSON 特征中读取几何信息
     * @param {Object} geoJSONFeature - GeoJSON 特征
     * @returns {Array} - 包含几何信息的数组
     */
    readGeometryFromFeature(geoJSONFeature) {
      // 从 feature 中读取几何信息
      const result = this.readGeometry(geoJSONFeature['geometry']);
      // 如果读取失败，则返回 null
      if (!result) {
        return null;
      }
      // 遍历读取到的几何信息数组
      result.map(geom => {
        // 将 feature 的属性复制到几何信息中
        geom['properties'] = geoJSONFeature['properties'];
        // 根据 adcode 从 styleMap 中获取样式 ID
        const styleId = styleMap[geom.properties.adcode];
        // 如果获取到样式 ID，则将其设置到几何信息中
        if (styleId) {
          geom['styleId'] = styleId;
        } else {
          // 如果没有获取到样式 ID，则设置默认样式 ID
          geom['styleId'] = 'style1';
        }
      });
      // 返回处理后的几何信息数组
      return result;
    },

    /**
     * 从 GeoJSON 几何对象中读取几何信息
     * @param {Object} geoJSONGeometry - GeoJSON 几何对象
     * @returns {Array} - 包含几何信息的数组
     */
    readGeometry(geoJSONGeometry) {
      // 如果传入的 geoJSONGeometry 为空，则返回 null
      if (!geoJSONGeometry) {
        return null;
      }
      // 创建一个几何对象
      const geometry = this.createGeometry(geoJSONGeometry);
      // 返回创建的几何对象
      return geometry;
    },

    /**
     * 根据 GeoJSON 几何对象创建几何图形
     * @param {Object} geometry - GeoJSON 几何对象
     * @returns {Array} - 包含几何图形的数组
     */
    createGeometry(geometry) {
      const geoms = [];
      // 遍历几何对象的坐标数组
      geometry['coordinates'].forEach(coord => {
        // 将坐标转换为经纬度坐标
        const position = this.convertCoordsToLatLngs(coord);
        // 创建一个几何图形对象，包含路径和样式 ID
        let geom = { path: position };
        // 将几何图形对象添加到 geoms 数组中
        geoms.push(geom);
      });
      // 返回创建的几何图形数组
      return geoms;
    },

    /**
     * 将坐标数组转换为经纬度坐标数组
     * @param {Array} coords - 坐标数组
     * @returns {Array} - 经纬度坐标数组
     */
    convertCoordsToLatLngs(coords) {
      let latLngs = null;
      // 判断坐标数组是否为二维数组，且每个元素都是数字
      if (coords.length > 0 && Array.isArray(coords[0]) && typeof coords[0][0] === 'number') {
        // 如果是二维数组，则将其转换为一维数组，并将每个元素的顺序颠倒（经度在前，纬度在后）
        latLngs = [].concat(...coords.map(coord => [coord[1], coord[0]]));
      } else {
        // 如果不是二维数组，则创建一个空数组
        latLngs = [];
        // 遍历坐标数组中的每个元素
        coords.forEach(item => {
          // 递归调用 convertCoordsToLatLngs 方法，将每个元素转换为经纬度坐标数组
          latLngs.push(this.convertCoordsToLatLngs(item));
        });
      }
      // 返回转换后的经纬度坐标数组
      return latLngs;
    }
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
}

#container {
  width: 100%;
  height: 100%;
}
</style>
