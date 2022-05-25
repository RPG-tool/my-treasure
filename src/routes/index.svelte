<script>
  // import init from "../js/init.js";
  import {config, catalog, shopping_cart, matrix, enableDisableRowCells, enableAllCells, pickRandomItem, rowClicked} from '../stores/store';
  import {getRandomItemFromCategory} from '../stores/item-manager';
  import { tooltip } from '../js/tooltip';
	// import Cell from '$lib/Cell.svelte';
	//import ShoppingCart from '$lib/ShoppingCart.svelte';
	//import XpSum from '$lib/XpSum.svelte';
	import {onMount, onDestroy} from 'svelte';

  onMount(async () => {
    console.log('Svelte mounted!');
    // console.log($catalog);
  });


</script>

<h1 class="my-title">Index</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<style>

</style>
