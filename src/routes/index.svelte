<script>
  import init from "../js/init.js";
  import {config, catalog, shopping_cart, matrix, enableDisableRowCells, enableAllCells, pickRandomItem, rowClicked} from '$stores/store';
  import {getRandomItemFromCategory} from '$stores/item-manager';
  import Cell from '$lib/Cell.svelte';
	import ShoppingCart from '$lib/ShoppingCart.svelte';
	import XpSum from '$lib/XpSum.svelte';
	import {onMount, onDestroy} from 'svelte';

  onMount(async () => {
    console.log('Svelte mounted!');
  });

	const debugProbability = (ev) => {
		const cat = document.getElementById("debug-probability-category").value;
		const num = parseInt(document.getElementById("debug-probability-num").value, 10);
		let results = {};
		console.log('debugProbability()', cat, num);
		if (cat !== "-1") {
			for (let i = 0; i < num; i++) {
				const item = getRandomItemFromCategory(cat);
				if (results[item.name]) {
					results[item.name].count++;
				} else {
					results[item.name] = {};
					results[item.name].count = 1;
				}
			}

			// Object.keys(results).map((key) => { sum += results[key].count });
			Object.keys(results).map((key) => { results[key].percent = results[key].count / num * 100});
			const results_sorted = Object
				.entries(results)
				.sort((a, b) => b[1].percent - a[1].percent)
				.reduce((_sortedObj, [k,v]) => ({
					..._sortedObj,
					[k]: v
				}), {})
			console.table(results_sorted);
		} else {
			console.log('Please select category');
		}
	}

	let shoppingCartComponent;

	let count = 0;
	const increment = () => count++;

	const hl = (ev) => {
		$config.highlighted[ev.target.id] = !$config.highlighted[ev.target.id];
		// console.log(ev.target.id);
	};


</script>

<main class="grid-main">

  <div class="container-matrix pt-16">

    <div class="g-app-title-header">
      <div class="title">
        <h2 class="h1"><b>My treasure</b>, </h2><h1 class="h4"><i>RPG Treasure / loot generator </i></h1><span class="help ml-8">Help!</span>
      </div>
      <button class="caption-action" id="random-pick" disabled={$config.status.cells.every(v => v.enabled === false)} on:click={pickRandomItem}>Pick random item!</button>
    </div>

    <div class="g-table-container mt-16">
      <table id="table-matrix" class="table-matrix">
        <thead>
          <tr>
            <th class:is-disabled={$config.status.all_cells}>All
              <label class="switch" for="chk-all">
                <input id="chk-all" class="table-activation" type="checkbox" disabled={$config.status.all_cells} bind:checked={$config.status.all_cells} on:click={enableAllCells}>
              </label>
            </th>

            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
          </tr>
        </thead>
        <tbody>
          {#each $matrix as row, idx}
            <tr>
              <th class:is-disabled={!$config.status.rows[idx]} on:click|stopPropagation={() => {rowClicked(idx)}}>{idx+1}<label class="switch" for="chk-row-{idx}">
                  <input id="chk-row-{idx}" data-row-id={idx} class="row-activation" type="checkbox" bind:checked={$config.status.rows[idx]} on:click={() => {enableDisableRowCells(idx)}}>
                </label>
              </th>
              {#each row as cell, idy}
                <Cell row={idx} col={idy} data={cell} idx={increment()}/>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>


    <div class="g-settings mt-16">
      <details open>
        <summary>Settings</summary>
        <fieldset class="mt-12">
          <label>Base coins<br>
            <input type="number" id="coins" on:focus={hl} on:blur={hl} bind:value={$config.base_coins}>
          </label>
          <label>Jewels (row 2)<br>
            <input type="number" id="jewel_small" on:focus={hl} on:blur={hl} bind:value={$config.base_jewels_small}>
          </label>
          <label>Jewels (row 3)<br>
            <input type="number" id="jewel_medium" on:focus={hl} on:blur={hl} bind:value={$config.base_jewels_medium}>
          </label>
          <label>Units<br>
            <input type="text" id="units" on:focus={hl} on:blur={hl} bind:value={$config.units}>
          </label>
          <label class="wide" id="cursed-config">
            <input type="checkbox" id="cursed" bind:checked={$config.include_cursed}> Include <b>cursed</b> items ( † )
          </label>
        </fieldset>
      </details>
    </div>


  </div>

  <div class="container-treasure pt-16">

    <div class="g-treasure-title-header">
      <h2 class="h4 mt-4"><b>Resulting treasure </b></h2>
      <button disabled={$shopping_cart.length == 0} class="caption-action danger" id="clear-results" on:click={shoppingCartComponent.clearAll}>Clear treasure</button>
    </div>

    <XpSum/>

    <ShoppingCart bind:this={shoppingCartComponent}/>

  </div>

</main>

<details class="debug mt-32">
<summary>Debug: Stores</summary>
<div class="cols-3">
  <label>
    $config<br>
    <textarea class="debug">{JSON.stringify($config, (_key, value) => (value instanceof Set ? [...value] : value), 2).trim()}</textarea>
  </label>
  <label>
    $matrix
    <textarea class="debug">{JSON.stringify($matrix, null, 2).trim()}</textarea>
  </label>
  <label>
    $shopping_cart<br>
    <textarea class="debug">{JSON.stringify($shopping_cart, null, 2).trim()}</textarea>
  </label>
</div>
</details>

<details class="debug mt-8">
<summary>Debug: Probability (*Results are shown in the browser's console)</summary>
<fieldset class="mt-12">
  <label class="double">Category
    <select id="debug-probability-category" name="debug-probability-category">
      <option value="-1">Select a category</option>
      {#each Object.keys($catalog) as category}
        {#if !['weapon_category','weapon_category_flatten'].includes(category)}
          <option value={category}>{category}</option>
        {/if}
      {/each}
    </select>
  </label>
  <label>
    Num
    <input id="debug-probability-num" type="number" value="10000">
  </label>
  <label>
    <button id="debug-probability-button" on:click={debugProbability}>Generate</button>
  </label>
</fieldset>
</details>



<style>
/* h1 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 4em;
  font-weight: 100;
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
} */
</style>