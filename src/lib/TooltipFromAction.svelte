<script>
	export let title;
	export let x;
	export let y;
</script>
<div class="tooltip" style="
		top: {y + 30}px;
		left: {x -140}px;">{title}</div>

<style>
	/* div {
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		background: white;
		border-radius: 4px;
		padding: 4px;
		position: absolute;
	} */
</style>