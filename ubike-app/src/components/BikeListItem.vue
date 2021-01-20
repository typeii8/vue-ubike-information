<template>
	<tr>
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
}
</script>