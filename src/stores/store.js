import { writable, readable, derived, get, set } from 'svelte/store';
import { getRandomItems } from './item-manager';

/* Items data */

/* Art Items*/
import armor_type from '../data/armor_type';
import art_item from '../data/art_item';
import art_item_carving from '../data/art_item_carving';
import art_item_ceramics from '../data/art_item_ceramics';
import art_item_craft from '../data/art_item_craft';
import art_item_desc_age from '../data/art_item_desc_age.js';
import art_item_desc_condition from '../data/art_item_desc_condition.js';
import art_item_desc_quality_material from '../data/art_item_desc_quality_material.js';
import art_item_desc_quality_work from '../data/art_item_desc_quality_work.js';
import art_item_desc_renown from '../data/art_item_desc_renown.js';
import art_item_desc_size from '../data/art_item_desc_size.js';
import art_item_desc_value from '../data/art_item_desc_value.js';
import art_item_fabric_art from '../data/art_item_fabric_art';
import art_item_glassworks from '../data/art_item_glassworks';
import art_item_metalworks from '../data/art_item_metalworks';
import art_item_paintings from '../data/art_item_paintings';
import art_item_paper_art from '../data/art_item_paper_art';
import art_item_stoneworks from '../data/art_item_stoneworks';
import common_armor from '../data/common_armor';
import common_item from '../data/common_item';
import feature_armor_shield from '../data/feature_armor_shield';
import feature_weapon_melee from '../data/feature_weapon_melee';
import feature_weapon_projectile from '../data/feature_weapon_projectile';
import magic_item from '../data/magic_item';
import magic_item_armor from '../data/magic_item_armor';
import magic_item_boots from '../data/magic_item_boots';
import magic_item_low_level from '../data/magic_item_low_level';
import magic_item_melee from '../data/magic_item_melee';
import magic_item_miscellaneous from '../data/magic_item_miscellaneous';
import magic_item_potion from '../data/magic_item_potion';
import magic_item_potion_unconventional from '../data/magic_item_potion_unconventional';
import magic_item_ranged from '../data/magic_item_ranged';
import magic_item_ring from '../data/magic_item_ring';
import magic_item_scroll from '../data/magic_item_scroll';
import magic_item_wand_staff_rod from '../data/magic_item_wand_staff_rod';
import material_common from '../data/material_common';
import material_exotic from '../data/material_exotic';
import material_rare from '../data/material_rare';
import weapon from '../data/weapon';
import weapon_category from '../data/weapon_category';

export const config = writable({
  base_coins: 30,
  base_jewels_small: 5,
  base_jewels_medium: 30,
  units: "gp",
  include_cursed: true,
  xpsum: 0,
  num_players: 4,
  xp_per_player: 0,
  cart_sum: 0,
  highlighted: {
		units: false,
		coins: false,
		jewel_small: false,
		jewel_smedium: false
	},
  dummyFunction() {
    console.log('dummy');
  }
});
enableAllCells()

export const catalog = writable({
  armor_type,
  art_item_carving,
  art_item_ceramics,
  art_item_craft,
  art_item_desc_age,
  art_item_desc_condition,
  art_item_desc_quality_material,
  art_item_desc_quality_work,
  art_item_desc_renown,
  art_item_desc_size,
  art_item_desc_value,
  art_item_fabric_art,
  art_item_glassworks,
  art_item_metalworks,
  art_item_paintings,
  art_item_paper_art,
  art_item_stoneworks,
  art_item,
  common_armor,
  common_item,
  feature_armor_shield,
  feature_weapon_melee,
  feature_weapon_projectile,
  magic_item_armor,
  magic_item_boots,
  magic_item_low_level,
  magic_item_melee,
  magic_item_miscellaneous,
  magic_item_potion_unconventional,
  magic_item_potion,
  magic_item_ranged,
  magic_item_ring,
  magic_item_scroll,
  magic_item_wand_staff_rod,
  magic_item,
  material_common,
  material_exotic,
  material_rare,
  weapon_category,
  weapon
});
// console.log('catalog:', get(catalog));

const common_item_obj = {
  name: '$$common_item$$', label: 'Common item'
};
const weapon_common_obj = {
  name: '$$weapon_common$$', label: 'Common weapon'
};
const common_armor_obj = {
  name: '$$common_armor$$', label: 'Common armor'
};
const art_item_obj = {
  name: '$$art_item$$', label: 'Art item'
};
const material_common_obj = {
  name: '$$material_common$$', label: 'Common material'
};
const material_rare_obj = {
  name: '$$material_rare$$', label: 'Rare material'
};
const material_exotic_obj = {
  name: '$$material_exotic$$', label: 'Exotic material'
};
const magic_item_potion_obj = {
  name: '$$magic_item_potion$$', label: 'Magic potion'
};
const magic_item_scroll_obj = {
  name: '$$magic_item_scroll$$', label: 'Magic scroll'
};
const magic_item_low_level_obj = {
  name: '$$magic_item_low_level$$', label: 'Low level magic item'
};
const magic_item_obj = {
  name: '$$magic_item$$', label: 'Magic item'
};

export const matrix_base = writable([
  [
    { items: [common_item_obj] },
    { items: [common_item_obj, common_item_obj] },
    { items: [common_item_obj, common_item_obj, common_item_obj] },
    { items: [weapon_common_obj] },
    { items: [common_armor_obj] },
    { items: [art_item_obj] },
  ],[
    { items: [material_common_obj] },
    { items: [material_common_obj, material_common_obj] },
    { items: [material_common_obj, material_common_obj, material_common_obj] },
    { items: [material_rare_obj] },
    { items: [material_rare_obj, material_rare_obj] },
    { items: [material_exotic_obj] },
  ],[
    { items: [magic_item_potion_obj] },
    { items: [magic_item_scroll_obj] },
    { items: [magic_item_scroll_obj, magic_item_potion_obj] },
    { items: [magic_item_low_level_obj] },
    { items: [magic_item_obj] },
    { items: [magic_item_obj] },
  ]
]);

export const matrix = derived([config, matrix_base], ([$config, $matrix_base]) => {

  let line_coins = [];
  let line_jewels_small = [];
  let line_jewels_medium = [];

  let last_coin = $config.base_coins;
  let last_jewel_small = $config.base_jewels_small;
  let last_jewel_medium = $config.base_jewels_medium;

  for (let i = 0; i < 6; i++) {
    line_coins.push({
      items:
        [
          { name: '',
            label: 'Coins',
            type: 'coin',
            price: last_coin
          }
        ]
    });
    last_coin *= 2;
    line_jewels_small.push({
      items: [
        {
          name: 'jewel_small',
          label: 'Jewels <i>(small)</i>',
          type: 'jewel_small',
          price: last_jewel_small
        }
      ]
    });
    last_jewel_small *= 2;
    line_jewels_medium.push({
      items: [
        {
          name: 'jewel_medium',
          label: 'Jewels <i>(medium)</i>',
          type: 'jewel_medium',
          price: last_jewel_medium
        }
      ]
    });
    last_jewel_medium *= 2;
  }

  return [line_coins, line_jewels_small, line_jewels_medium, ...$matrix_base];
});

// ------------------------
// SHOPPING CART ----------
// ------------------------

export const shopping_cart = writable([]);


export const addToShoppingCart = (item) => {
  shopping_cart.set([item, ...get(shopping_cart)]);
  updateXpSum();
}


export const updateXpSum = () => {
  let sc = get(shopping_cart);
  let c = get(config);
  c.xpsum = 0;
  for (let i = 0; i < sc.length; i++) {
    if (sc[i].price) {
      c.xpsum += sc[i].price;
    }
  }
  c.xpsum = parseInt(c.xpsum, 10);
  c.xp_per_player = parseInt(Math.ceil(c.xpsum / c.num_players), 10);
  config.set(c);
}


const getCellIdsInRow = (row) => {
  return Array.from(Array(6), (_,i)=> i+(row*6));
}


export const updateRowStatus = (row, cell_id) => {
  let c = get(config);
  const row_cell_ids = getCellIdsInRow(row);
  let result = true;
  for (let i = 0; i < row_cell_ids.length; i++) {
    const id = row_cell_ids[i];
    if (!c.status.cells[id].enabled) {
      result = false;
      break;
    }
  }
  c.status.rows[row] = result;
  c.status.all_cells = c.status.rows.every(v => v === true);
  config.set(c);
}


export const enableDisableRowCells = (row) => {
  let c = get(config);
  c.status.rows[row] = !c.status.rows[row];
  const row_cell_ids = getCellIdsInRow(row);

  for (let i = 0; i < row_cell_ids.length; i++) {
    c.status.cells[row_cell_ids[i]].selected = false;
    c.status.cells[row_cell_ids[i]].enabled = c.status.rows[row];
  }
  c.status.all_cells = c.status.rows.every(v => v === true);
  config.set(c);
}


export const updateAllCellsStatus = () => {
  let c = get(config);
  let result = true;
  for (let i = 0; i < c.status.rows; i++) {
    if (!c.status.rows[i]) {
      result = false;
      break;
    }
  }
  console.log('updateAllCellsStatus()', result);
  c.status.all_cells = result;
  config.set(c);
}


export const enableRow = (row) => {
  let c = get(config);
  getCellIdsInRow(row).forEach((id) => {
    c.status.cells[id].enabled = true
  });
  c.status.rows[row] = true;
  updateAllCellsStatus();
  config.set(c);
}


export function enableAllCells () {
  let c = get(config);
  c.status = {};
  c.status.cells = [...Array(36)].fill().map(u =>({enabled: true, selected: false}));
  c.status.rows = [...Array(6)].fill(true);
  c.status.all_cells = true;
  config.set(c);
}


export const cellClicked = (data, idx) => {
  let c = get(config);
  c.status.cells.map(v => v.selected = false);
  c.status.cells[idx].selected = true;
  config.set(c);
  getRandomItems(data);
}


export const rowClicked = (row_idx) => {
  let c = get(config);
  let m = get(matrix);
  let no_disabled_cells = [];

  for (let i = 0; i < 6; i++) {
    let cell = m[row_idx][i];
    cell.idx = row_idx * 6 + i;
    if (c.status.cells[cell.idx].enabled) {
      no_disabled_cells.push(cell);
    }
  }

  if (no_disabled_cells.length) {
    var data = no_disabled_cells[Math.floor(Math.random()*no_disabled_cells.length)];
    // console.log(data);
    cellClicked(data, data.idx);
  }
}


export const pickRandomItem = () => {
  let c = get(config);
  let m = get(matrix);
  let no_disabled_cells = [];
  for (let i = 0; i < c.status.cells.length; i++) {
    if (c.status.cells[i].enabled) {
      let row = Math.floor(i / 6);
      let col = i % 6;
      let temp = JSON.parse(JSON.stringify(m[row][col]));
      temp.idx = i;
      no_disabled_cells.push(temp);
    }
  }
  var data = no_disabled_cells[Math.floor(Math.random()*no_disabled_cells.length)];
  cellClicked(data, data.idx)
  // console.log(no_disabled_cells);
}




// ------------------------
// WEAPON TREE ------------
// ------------------------

/*
Caution from this point.
This section is used to populate the catalog store with all the weapong in every category, with its corresponding probability.

I know that are other more cool approaches than the one used here, but the recursion in recursion in recursion way it's very difficult to debug. I recommend more easy to understand approach

Please modify with care
*/

function populateWeaponTree() {

  /* Create flattened copy of `weapon_categories` */
  let clog = get(catalog);
  clog['weapon_category_flatten'] = flattenTree(clog['weapon_category'])
  catalog.set(clog);

  /* Create childrenless weapon categories */
  populateLastBranches();

  /* Create rest of weapong categories with its probability */
  populateRestWeapons();

  console.log('populateWeaponTree()', clog);
}
populateWeaponTree();

/*
  Creates a simple flatten version of the weapon_categories tree in the catalog, addin a `parent` key to ease traverse the tree up.
*/
function flattenTree(tree, parent = null, result = {}) {
  let current_name = tree.name;
  if (typeof result[current_name ] === 'undefined') {
    result[current_name] = JSON.parse(JSON.stringify(tree));
    delete result[current_name].name;
    result[current_name].parent  = parent;
    if (typeof tree.children !== 'undefined') {
      let children = [];
      for (let i = 0; i < tree.children.length; i++) {
        children.push(tree.children[i].name);
      }
      result[current_name].children = children;
      for (let i = 0; i < tree.children.length; i++) {
        result = flattenTree(tree.children[i], current_name, result );
      }
    }
    return result;
  }
  return result;
}
// let clog = get(catalog);
// clog['weapon_category_flatten'] = flattenTree(clog['weapon_category'])
// catalog.set(clog);
// console.log(get(catalog));

/*
  Creates the last categories of the weapon tree in the **catalog** store. Those that don't have any children... _sword_like_, _two_handed_weaapon_... and NORMALICES (0..1) its probability.
*/
function populateLastBranches() {
  let clog = get(catalog);
  let w = clog['weapon'];
  let w_cats = clog['weapon_category'];
  let last_cats = treeGetLastChildren(w_cats, 'name')

  // First we set the last branches
  for (let i = 0; i < last_cats.length; i++) {
    const cat = last_cats[i];
    const weapons_filtered = getWeaponsIncludingCategory(cat, 'category', w);
    const weapons_normalized = normalizeWeaponProb(weapons_filtered)
    clog[cat] = weapons_normalized;
  }
  catalog.set(clog);
}
// populateLastBranches();
// console.log(get(catalog));


function populateRestWeapons() {
  let clog = get(catalog);
  let w = clog['weapon'];
  let w_cats = clog['weapon_category'];
  let not_last_cats = getWeaponCatNodesNotLast(w_cats);

  for ( let i = 0; i < not_last_cats.length; i++) {
    createWeaponTree(not_last_cats[i]);
  }
}
// populateRestWeapons();


/*
  Returns a bracnh from the weapon_categories tree
*/
function getTreeBranch(tree, value, key = 'name'){
  if (tree[key] == value){
    return tree;
  } else if (tree.children != null) {
    var i;
    var r = null;
    for ( i = 0; r == null && i < tree.children.length; i++) {
      r = getTreeBranch(tree.children[i], value, key);
    }
    return r;
  }
  return null;
}
// let test_tree = getTreeBranch(get(catalog)['weapon_category'], 'ranged_weapon', 'name');
// console.log('searchTree():', test_tree);


function treeGetLastChildren(tree, key = 'name', result = []){
  if (typeof tree.children === 'undefined') {
    result.push(tree[key]);
    return result;
  } else {
    for ( let i = 0; i < tree.children.length; i++) {
      treeGetLastChildren(tree.children[i], key, result);
    }
  }
  return result;
}
// let last_branches = treeGetLastChildren(get(catalog)['weapon_category']);
// console.log('treeGetLastChildren():', last_branches);


function getWeaponsIncludingCategory(cat_array, key, items) {
  if (typeof cat_array === 'string') {
    cat_array = [cat_array];
  }
  return items.filter((item) => item[key].some(r=> cat_array.includes(r)));
}
// let weapons_filtered = getWeaponsIncludingCategory(['no_sword_like'], 'category', get(catalog)['weapon']);
// console.log('getWeaponsIncludingCategory()', weapons_filtered);


function getWeaponCatNodesNotLast(tree, key = 'name', result = []) {
  if (typeof tree.children === 'undefined') {
    return result;
  } else {
    result.push(tree[key]);
    for ( let i = 0; i < tree.children.length; i++) {
      getWeaponCatNodesNotLast(tree.children[i], key, result);
    }
  }
  return result;
}
// let clog = get(catalog);
// let not_last_cats = getWeaponCatNodesNotLast(clog['weapon_category']);
// console.log('getWeaponCatNodesNotLast()', not_last_cats);


function normalizeWeaponProb(weapons) {
  weapons = JSON.parse(JSON.stringify(weapons));
  const sum = weapons.reduce((n, {prob}) => n + prob, 0);
  // console.log('Sum', sum);
  for (let j = 0; j < weapons.length; j++) {
    const w = weapons[j];
    w.prob = w.prob / sum;
  }
  return weapons;
}
// let test_weapons = getWeaponsIncludingCategory(['throwable_weapon'], 'category', get(catalog)['weapon']);
// console.log('normalizeWeaponProb()', normalizeWeaponProb(test_weapons));



function createWeaponTree(cat) {
  let clog = get(catalog);
  let w = clog['weapon'];
  let w_cats = clog['weapon_category'];

  // console.log(cat);
  let tree = getTreeBranch(w_cats, cat, 'name');
  // console.log(tree);

  let weapons = getWeaponsInBranch(tree);
  // console.log(weapons);
  // console.log('- - - - - - - -');

  clog[cat] = weapons;
  catalog.set(clog);
}


function getWeaponsInBranch(tree, prob = 1.0, result = []) {
  let level_prop = tree.prob * prob;

  if (typeof tree.children === 'undefined') {
    let clog = get(catalog);
    let w = JSON.parse(JSON.stringify(clog[tree.name]));

    w = w.map((item) => {
      item.prob *= level_prop;
      result.push(item);
      // return item;
    })
  } else {
    for ( let i = 0; i < tree.children.length; i++) {
      result = getWeaponsInBranch(tree.children[i], level_prop, result);
    }
  }
  return result;
}
// weaponTreeWalk(get(catalog)['weapon_category']);


/* NOT USED NOT USED NOT USED NOT USED NOT USED NOT USED */
/* NOT USED NOT USED NOT USED NOT USED NOT USED NOT USED */
/* NOT USED NOT USED NOT USED NOT USED NOT USED NOT USED */

function getAllWeaponCatNodes(tree, key, result = []) {
  if (typeof tree.children === 'undefined') {
    result.push(tree[key]);
    return result;
  } else {
    result.push(tree[key]);
    for ( let i = 0; i < tree.children.length; i++) {
      getAllWeaponCatNodes(tree.children[i], key, result);
    }
  }
  return result;
}
// let clog = get(catalog);
// let all_cats = getAllWeaponCatNodes(clog['weapon_category'], 'name');
// console.log('getAllWeaponCatNodes()', all_cats);