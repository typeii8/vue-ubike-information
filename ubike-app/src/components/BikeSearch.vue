<template>
	<div>
		站點名稱搜尋: 
		<input
			type="text"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		>
	</div>
</template>

<script>
export default {
	props: ["modelValue"],
}
</script>