<script>
	import {shopping_cart, config, updateXpSum} from '../stores/store';
  import { tooltip } from './js/tooltip';
	// export let data;
	// export let idx;

  export const clearAll = () => {
    $shopping_cart = [];
    updateXpSum();
  }

  const deleteItem = (idx) => {
    $shopping_cart = $shopping_cart.filter((item, index) => index !== idx);
    updateXpSum();
  }

</script>


<div class="g-shopping-cart mt-16" id="g-shopping-cart">
  {#if $shopping_cart.length}

    <table class="shopping-cart">
      <thead>
        <tr>
          <th class="sc-name tal">Item <i>( {$shopping_cart.length} )</i></th>
          <th class="sc-desc">Desc.</th>
          <th class="sc-price tar">{$config.units}</th>
          <th class="sc-delete"></th>
        </tr>
      </thead>
      <tbody>
        {#each $shopping_cart as item, idx}
          <tr class="line-item" data-idx={idx}>
            <td>
              {@html item.label}
              {#if item.limited_to}
                [<span use:tooltip title="Use limited to a certain class: (F)ighter, (C)leric, (M)age or (T)hief" class="limited help">{#each item.limited_to as character_class, idx}{#if idx > 0},{/if}{character_class}{/each}</span>]
              {/if}
              {#if item.cursed}
                <span use:tooltip title="Item is cursed" class="is-highlighted"> †</span>
              {/if}

            </td>
            <td class="p-0">
              {#if item.desc}
                <span class="line-item-desc" use:tooltip title={item.desc}></span>
              {/if}
            </td>
            <td class="tar">
              {#if item.price}
                {item.price}
              {:else}
                —
              {/if}
            </td>
            <td class="p-0">
              <button title="Delete item" class="line-item-delete" data-idx={idx} on:click={()=>deleteItem(idx)}></button>
            </td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td>Total ({$config.units})</td>
          <td class="tar" colspan="2">{$config.xpsum}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>

  {:else}

    <div class="treasure-empty">
      <b>Treasure is empty…</b><br>
      Click on the <i><b>Pick random item!</b></i> button or directly over any of the cells.
    </div>

  {/if}
</div>