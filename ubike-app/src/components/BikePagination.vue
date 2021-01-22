<template>
	<ul class="pagination pagination-sm">
		<li class="page-item">
			<a href="#" class="page-link" @click.prevent="gotoPage(currPage - 1)">
				<i class="fa fa-arrow-left" aria-hidden="true"></i>
			</a>
		</li>
		<li class="page-item" :class="{'active': currPage === page}" v-for="page in totalPage" :key="page">
			<a href="#" class="page-link" @click.prevent="gotoPage(page)">{{ page }}</a>
		</li>
		<li class="page-item">
			<a href="#" class="page-link" @click.prevent="gotoPage(currPage + 1)">
				<i class="fa fa-arrow-right" aria-hidden="true"></i>
			</a>
		</li>
	</ul>
</template>

<script>
export default {
	props: ['totalPage', 'currPage'],
	// emit: ['update:currPage'],
	methods: {
    gotoPage(p) {
        if (p < 1 || p > this.totalPage) {
          return;
				}
				this.$emit('update:currPage', p);
				// this.currPage = p;
    }
	},
}
</script>