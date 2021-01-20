<template>
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
			<bike-list-item
				v-for="s in slicedStops"
				:key="s.id"
				:id="s.id"
				:stop-no="s.sno"
				:stop-name="s.sna"
				:stop-area="s.sarea"
				:stop-sbi="s.sbi"
				:stop-total="s.tot"
				:stop-time="timeFormat(s.mday)"
			></bike-list-item>
		</tbody>
	</table>
</template>

<script>
import BikeListItem from './BikeListItem.vue'
export default {
  components: { BikeListItem },
	props: ['slicedStops','sortedVal','sortedType'],
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
			this.$emit('update:sortedType', sortType);
			this.$emit('update:sortedVal', sortVal);
    },
	},
}
</script>