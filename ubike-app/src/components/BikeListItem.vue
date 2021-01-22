<template>
	<!-- <tr v-if="isPin === true" class="table-warning">
		<td>
			<i class="fa fa-thumb-tack active" aria-hidden="true" @click="pinStop"></i>
		</td>
		<td>{{ stopNo }}</td>
		<td>{{ stopName }}</td>
		<td>{{ stopArea }}</td>
		<td>{{ stopSbi }}</td>
		<td>{{ stopTotal }}</td>
		<td>{{ stopTime }}</td>		
	</tr> -->
	<tr :class="{ 'table-warning': isPin === true }">
		<td>
			<i class="fa fa-thumb-tack" aria-hidden="true" @click="pinStop(stopName)"></i>
		</td>
		<td>{{ stopNo }}</td>
		<td>{{ stopName }}</td>
		<td>{{ stopArea }}</td>
		<td>{{ stopSbi }}</td>
		<td>{{ stopTotal }}</td>
		<td>{{ stopTime }}</td>
	</tr>
</template>

<script>
export default {
	props: ['stopNo', 'stopName', 'stopArea', 'stopSbi', 'stopTotal', 'stopTime'],
	data() {
		return {
			isPin: false,
			Arr: []
		}
	},
	methods: {
		pinStop(pinnedName) {
			const test = this.pinnedStops.forEach((stop) => {
				stop.sna === '市民廣場';
			});
			console.log(pinnedName);
			console.log(test);
			// this.$emit('update:pin', pinnedName);
			// console.log(this.pin);
			// this.isPin = !this.Pin;
			console.log(this.Arr)
		}
	},
}
</script>

<style scoped>
.pinned {
	background-color: #0dcaf0;
}
</style>