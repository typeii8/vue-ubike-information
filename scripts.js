const vm = Vue.createApp({
  data() {
    return {
      uBikeStops: [],
      searchName: "",
      sortedVal: "",
      sortedType: "",
      // 把升冪降冪改成isAsc，用true/false控制改寫
      // 每頁要有幾筆資料，在computed內算出要分幾頁，總資料/頁資料，也需要有currPage
      currPage: 1,
      perPage: 20,
    };
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
      this.totalPage = Math.ceil(this.filteredStops.length / this.perPage);
      return this.filteredStops.slice(
        (this.currPage - 1) * this.perPage,
        this.perPage + (this.currPage - 1) * this.perPage
      );
      
    }
  },
  methods: {
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
      if (this.currPage === 0 || p === this.totalPage) {
        return;
      }
        if (p === "next") {
          this.currPage = this.currPage;
          +1;
        } else if (p === "prev") {
          this.currPage = this.currPage - 1;
        } else {
          this.currPage = p;
        }
      console.log(`this.currPage ${this.currPage} ${p}`)
    }
  },
}).mount("#app");