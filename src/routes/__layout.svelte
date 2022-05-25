<script>
	// export let name;
	// import init from "./js/init.js";
	import Cell from '$lib/Cell.svelte';
	import ShoppingCart from '$lib/ShoppingCart.svelte';
	import XpSum from '$lib/XpSum.svelte';
	import {config, catalog, shopping_cart, matrix, enableDisableRowCells, enableAllCells, pickRandomItem, rowClicked} from '../stores/store';
	import {getRandomItemFromCategory} from '../stores/item-manager';
	import {onMount, onDestroy} from 'svelte';

	onMount(() => {
		console.log('Svelte mounted!');
		// console.log($catalog);
 	});

   /* CSS */
  import '../scss/app.scss';
</script>

<header>
  Header
</header>

<slot></slot>

<footer>
  Footer
</footer>

<style type="scss">
  $my-var: #ee0000;
  footer {
    background-color: $my-var;
  }
</style>