<template>
	<div>
		站點名稱搜尋: 
		<!-- <input
			type="text"
			v-model="val"
			@input="onInput"
		> -->
		<input
			type="text"
			:value="searchKeyword"
			@input="$emit('update:searchKeyword', $event.target.value)"
		>
		{{ searchName }}
	</div>
</template>

<script>
export default {
	props: ["searchKeyword"],
	data(){
		return {
			val: "123"
		}
	},
	methods: {
		onInput() {
			console.log(this.val);
			this.$emit('change', this.val)
		}
	}
}
</script>