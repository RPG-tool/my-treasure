import { config, catalog, addToShoppingCart } from './store';
import { get } from 'svelte/store';

const regex = new RegExp(/%%(.*?)%%/gi);

export const getRandomItems = (data) => {
  // console.log('getRandomItems():data.items.length', data.items.length);
  for (let i = 0; i < data.items.length; i++) {
    parseItem(data.items[i]);
  }
}


const parseItem = (item) => {
  const clog = get(catalog);

  if (item.name.includes('$$')) {
    // Is category
    // We get a arandom item from it
    // console.log('Category:', item);

    let new_item = JSON.parse(JSON.stringify(getRandomItemFromCategory
      (item.name.replaceAll('$$','').trim())));
    if (item._category_tree) {
      new_item._category_tree = [...item._category_tree];
    } else {
      new_item._category_tree = [];
    }
    new_item._category_tree.push(item.name);
    parseItem(new_item);

  } else {

    // console.log('Item:', item);
    // Especial case is Art Item
    if (!item.desc && item.hasOwnProperty('_category_tree') && item._category_tree.includes('$$art_item$$')) {
      // console.log('Is art item');
      item.desc = '%%art_item_desc_quality_work%% quality art piece (%%art_item_desc_age%% period) by %%art_item_desc_renown%% artist. %%art_item_desc_quality_material%% materials, and %%art_item_desc_condition%% condition. %%art_item_desc_size%% size.';
    }

    // Loop each key and loop for interpolation placeholders
    Object.keys(item).forEach((key, i) => {
      let val = item[key];
      if ( typeof val === 'string') {
        var matches = val.match(regex);
        if (matches) {
          for (let i = 0; i < matches.length; i++) {
            const m = matches[i];
            // console.log('Needs interpolation:match', m);
            item = interpolateString(item, key, m);
          }
        }
      }
    });

    if (!item.price && item._category_tree.includes('$$art_item$$')) {
      // console.log('Get value');
      let total_value = item._value.reduce((a, b) => a + b, 0);
      // console.log(item._value, total_value);
      item.price = clog['art_item_desc_value'][total_value];
      // item.price = clog[art_item_desc_value][];
    }

    // Is a simple cell content, add to treasure
    if (!item.label) {
      item.label = item.name;
    }

    addToShoppingCart(item);
  }
}


export function getRandomItemFromCategory(category) {
  // Pick random item from category
  const clog = get(catalog);
  const conf = get(config);

  // We do a copy to keep original prob
  console.log(category)
  let items = JSON.parse(JSON.stringify(clog[category]));

  // Filter cursed items
  if (!conf.include_cursed) {
    items = items.filter(el => !el.cursed);
  }

  updateProbabilitySum(items);
  const random_prob = Math.random() * getMaxProb(items);
  const idx = items.findIndex((el) => el.prob > random_prob);
  const item = items[idx];

  //console.log(item.desc, item.value);
  return item;
}


function interpolateString(item, key, match) {
  // console.log(item, match);

  const random_item = getRandomItemFromCategory(match.replaceAll('%%','').trim());

  item[key] = item[key].replace(match, random_item[key]);

  if (random_item.value) {
    if (typeof item._value === 'undefined') {
      item._value = [];
    }
    item._value.push(random_item.value);
    // console.log(random_item.value);
  }

  return item;
}


function updateProbabilitySum(data) {
  var sum = 0;
  data = data.map((el) => {el.prob += sum; sum = el.prob});
}


function getMaxProb(data) {
  const max_prob = data.reduce((prev, next) => prev = prev > next.prob ? prev : next.prob, 0);
  return max_prob;
}