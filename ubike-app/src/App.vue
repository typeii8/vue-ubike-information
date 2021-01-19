<template>
  <div id="app">
    <h1>YouBike 臺北市公共自行車即時資訊</h1>
    <!-- <bike-search @change="onChange"></bike-search> -->

    <bike-search v-model:search-keyword="searchName"></bike-search>

    <bike-list></bike-list>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>場站名稱</th>
          <th>場站區域</th>
          <th>目前可用車輛
            <i class="fa fa-sort-asc" aria-hidden="true" @click="sorted('asc','sbi')"></i>
            <i class="fa fa-sort-desc" aria-hidden="true" @click="sorted('desc','sbi')"></i>
          </th>
          <th>總停車格
            <i class="fa fa-sort-asc" aria-hidden="true" @click="sorted('asc','tot')"></i>
            <i class="fa fa-sort-desc" aria-hidden="true" @click="sorted('desc','tot')"></i>
          </th>
          <th>資料更新時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in slicedStops" :key="s">
          <td>{{ s.sno }}</td>
          <td>{{ s.sna }}</td>
          <td>{{ s.sarea }}</td>
          <td>{{ s.sbi }}</td>
          <td>{{ s.tot }}</td>
          <td>{{ timeFormat(s.mday) }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <ul class="pagination pagination-sm">
      <li class="page-item">
        <a href="#" class="page-link" @click="gotoPage(currPage - 1)">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </a>
      </li>
      <li class="page-item" :class="{'active': currPage === page}" v-for="page in totalPage" :key="page">
        <a href="#" class="page-link" @click="gotoPage(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a href="#" class="page-link" @click="gotoPage(currPage + 1)">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
      </li>
    </ul> -->
    <bike-pagination></bike-pagination>
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
    BikePagination
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
      // this.currPage = 1;

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
  methods: {
    onChange(e) { console.log(`=> ${e}`); },
    timeFormat(t) {
      var date = [],
        time = [];

      date.push(t.substr(0, 4));
      date.push(t.substr(4, 2));
      date.push(t.substr(6, 2));
      time.push(t.substr(8, 2));
      time.push(t.substr(10, 2));
      time.push(t.substr(12, 2));

      return date.join("/") + " " + time.join(":");
    },
    sorted(sortType, sortVal) {
      this.sortedType = sortType;
      this.sortedVal = sortVal;
    },
    gotoPage(p) {
        if (p < 1 || p > this.totalPage) {
          return;
        }
        this.currPage = p;
      console.log(`this.currPage ${this.currPage} ${p}`)
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
