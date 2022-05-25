<script>
	import {config, updateXpSum} from '../stores/store';
  import {tooltip} from '../js/tooltip';
	// export let data;
	// export let idx;
</script>

<div class="g-xp-sum mt-16">
  <details open>
    <summary>Experience points <span use:tooltip title="Experience is calculated from items that have a price / value." class="help ml-8">Info</span></summary>

    <fieldset class="mt-12">
      <label>Total XP<br>
        <input readonly type="text" id="xp-total" value="{$config.xpsum}">
      </label>
      <label>Players
        <select bind:value={$config.num_players} name="num_players" on:change={updateXpSum}>
          {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as num}
            <option selected={num == $config.num_players} value={num}>{num}</option>
          {/each}
        </select>
      </label>
      <label>XP / Player
        <input readonly type="text" id="xp-total" value="{$config.xp_per_player}">
      </label>
    </fieldset>
  </details>
</div>