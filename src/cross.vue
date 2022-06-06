<template>
	<div class="rules__cross">


		<svg class="svgIcon" width="13" height="13" viewBox="0 0 13 13" fill="#66196C" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.902787 0.902778C1.40138 0.404188 2.20975 0.404188 2.70834 0.902778L12.0972 10.2917C12.5958 10.7903 12.5958 11.5986 12.0972 12.0972C11.5986 12.5958 10.7903 12.5958 10.2917 12.0972L0.902787 2.70833C0.404198 2.20974 0.404198 1.40137 0.902787 0.902778Z"/>
			<path d="M12.0972 0.90278C12.5958 1.40137 12.5958 2.20974 12.0972 2.70833L2.70833 12.0972C2.20974 12.5958 1.40137 12.5958 0.902776 12.0972C0.404187 11.5986 0.404186 10.7903 0.902776 10.2917L10.2917 0.90278C10.7902 0.40419 11.5986 0.40419 12.0972 0.90278Z"/>
		</svg>


	</div>
</template>

<script>
export default {
	name: "cross-vue"
}
</script>

<style scoped>
.rules__cross{
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(50%, -50%);

	width: 40px;
	height: 40px;

	background-color: white;
	border-radius: 50%;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
	cursor: pointer;
}
.rules__cross .svgIcon{
	width: 50%;
	height: 50%;
}
@media (orientation: portrait) {
	.rules__cross{
		transform: translateY(-30%);
	}
}
@media (min-width: 1000px) {
	.rules__cross{
		width: 50px;
		height: 50px;
	}
}
</style>