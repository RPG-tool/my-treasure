# My treasure RPG / OSR treasure / loot generator

<a href="https://my-treasure.vercel.app/" target="_blank"><img src="https://raw.githubusercontent.com/RPG-tool/my-treasure/master/repository-open-graph.png"></a>

Tired of endless treasure tables that occupy dozens of pages in the DM manual, difficult to handle, not very random and difficult to balance? Tired of stopping the flow of your RPG play to reward your group with some treasure?

I present to you **«My treasure, RPG treasure / loot generator».**

Some of its main features:

- Ease to use / config / adjust
- Lots of categories (common items, gold & jewels, magic items...)
- Weighted probability (in most of the categories)

You can try-it online at:  
<a href="https://my-treasure.vercel.app/" target="_blank">https://my-treasure.vercel.app/</a>


## Help and how to use

- Click on «Pick randon item» button to get a random cell of the table
- Click on the row number to pick a random item from that row 
- Click directly over a cell to pick a item from that category
- Enable / disable rows and cells clicking on the _switch_ control on the top left corner of each cell

## TO-DO / Pending things / Help needed

I need some help with several pending issues realted to testing and completion of descripctions of some items...

- Review and complete [magic boots' titles](src/data/magic_item_boots.js)
- Add [common weapons prices](src/data/weapon.js)
  - Add more weapons?
- Take a look at: <http://www.d20srd.org/indexes/magicItems.htm>
- Adjust the art items probability / value (it seems that are not well balanced with the rest of items)

## Sources / «bibliography»

I've used several sources / reddit's threads / blog post for coding my reasure / loot app. If i've forgotten any, please forgive me and let me now and I'll add it in the reference below 😎

- [Initial calculations on weapon probability (my own)](https://docs.google.com/spreadsheets/d/1MCwEoXqDlg7NuFSGCfFv1ndQb3PUfzMkN2o2-cX8ilA/edit?usp=sharing)
- [«Treassure» by By Courtney Campbell](http://angband.oook.cz/steamband/Treasure.pdf)
- [Some questions about XP-for-coin in Knave](https://www.reddit.com/r/osr/comments/f78kh7/some_questions_about_xpforcoin_in_knave/)
- [Exotic materials](https://docs.google.com/document/d/1cYnk8AbBwlQ__ISAl1jYsD59Oc5rnafUCASPu2dh7Dk/edit)
- [Common materials](https://olddungeonmaster.com/2016/12/02/dd-5e-metals/)
- [Magic rare mterials D&D 5e](https://www.reddit.com/r/DnD/comments/4s1z2u/price_list_of_material_spell_components_for_your/)
- [OSR Gromoire](https://osrgrimoire.blogspot.com/2021/01/holmes-expanded-magic-items.html)
- [Goblin punch 1d100 magical items](https://goblinpunch.blogspot.com/2015/01/d100-minor-magical-items.html)

... and probably several more that I did not wrote down 😞

## SvelteKit

This is made with [SvelteKit](https://kit.svelte.dev/), the fastest way to build Svelte apps.

## Authors and copyright

Thos app is made by Carlos Cabo (@putuko) with the always invaluable help of @vortizhe (love ya :-*)
