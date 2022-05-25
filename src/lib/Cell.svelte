<script>
	import { config, matrix, matrix_base, updateRowStatus, cellClicked } from '../stores/store';

	export let data;
	export let idx;
	export let row;
	export let col;

  const clickHandler = () => {
    if ($config.status.cells[idx].enabled) {
      cellClicked(data, idx);
    }
  }

  const toggleDisabled = (ev) => {
    ev.stopPropagation();
    $config.status.cells[idx].enabled = !$config.status.cells[idx].enabled;
    $config.status.cells.map(v => v.selected = false);

    if ($config.status.cells[idx].enabled) {
      // We are Enabling a cell
      updateRowStatus(row, idx);
    } else {
      // Disabling a cell
      // We disabled the row
      $config.status.rows[row] = false;
      $config.status.all_cells = false;
    }
  }

  function uniq(arr) {
    return arr.filter((a, i) => arr.findIndex((s) => a.name === s.name) === i);
  }

</script>

<td {row} {col} class="{!$config.status.cells[idx].enabled ? 'is-disabled' : ''}{$config.status.cells[idx].selected ? ' is-selected' : ''}" data={JSON.stringify(data)} data-idx={idx} on:click={clickHandler}>
  <ul>
    {#each uniq(data.items) as item}
      <li>
        {#if item.type === 'coin'}
          <i class="price {$config.highlighted.coins ? 'is-highlighted' : ''}">{item.price}<span class="units {$config.highlighted.units ? 'is-highlighted' : ''}">{$config.units}</span></i>
        {:else if ['jewel_small', 'jewel_medium'].includes(item.type) }
          <span class="{$config.highlighted[item.type] ? 'is-highlighted' : ''}">Jewel (<i class="price">{item.price}<span class="units {$config.highlighted.units ? 'is-highlighted' : ''}">{$config.units}</span></i>)</span>
        {:else}
          {item.label}
        {/if}
      </li>
    {/each}
  </ul>
  {#if  data.items.length > uniq(data.items).length}
    <span class="count">
      ×{data.items.length}
    </span>
  {/if}
  <label class="switch" for="chk-{idx}">
    <input id="chk-{idx}" class="cell-activation" data-idx={idx} type="checkbox" on:click={toggleDisabled} bind:checked={$config.status.cells[idx].enabled}>
  </label>
</td>

<style>
  /* .is-disabled {
    background-color: grey;
  } */
</style>