<template>
  <div id="app">
    <h1>YouBike 臺北市公共自行車即時資訊</h1>
    <bike-search v-model="searchName"></bike-search>
    <bike-list
      :slicedStops="slicedStops"
      v-model:sortedVal="sortedVal"
      v-model:sortedType="sortedType"
    ></bike-list>
    <bike-pagination
      v-model:totalPage="totalPage"
      v-model:currPage="currPage"
    ></bike-pagination>
  </div>
</template>

<script>
import BikeSearch from './components/BikeSearch.vue'
import BikeList from './components/BikeList.vue'
import BikePagination from './components/BikePagination.vue'

export default {
  name: 'App',
  components: {
    BikeSearch,
    BikeList,
    BikePagination,
  },
  data() {
    return {
      uBikeStops: [],
      searchName: "",
      sortedVal: "",
      sortedType: "",
      currPage: 1,
      perPage: 20
    }
  },
  created() {
    // 欄位說明請參照:
    // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

    // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
    // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
    // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
    // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態
    fetch("https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz")
      .then((res) => res.json())
      .then((json) => {
        // 將 json 轉陣列後存入 this.ubikeStops
        const stops = Object.keys(json.retVal).map((key) => json.retVal[key]);
        this.uBikeStops = stops;
      });
  },
  computed: {
    filteredStops: function () {
      const defaultStops = this.uBikeStops.filter((stop) =>
        stop.sna.includes(this.searchName)
      );
      const sortedStops = [...defaultStops];
      if (this.sortedType === "asc") {
        return sortedStops.sort(
          (a, b) => a[this.sortedVal] - b[this.sortedVal]
        );
      } else if (this.sortedType === "desc") {
        return sortedStops.sort(
          (a, b) => b[this.sortedVal] - a[this.sortedVal]
        );
      } else {
        return sortedStops;
      }
    },
    slicedStops: function () {
      return this.filteredStops.slice(
        (this.currPage - 1) * this.perPage,
        this.perPage + (this.currPage - 1) * this.perPage
      ); 
    },
    totalPage: function() {
      return Math.ceil(this.filteredStops.length / this.perPage);
    },
  },
  watch: {
    filteredStops: function() {
      this.currPage = 1;
    }
  },
}
</script>

<style>
@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css";
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
body {
  padding: 1em;
}

.fa {
  cursor: pointer;
}

.fa:hover {
  color: red;
}
</style>
