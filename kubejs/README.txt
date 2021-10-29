Find more info on the website: https://kubejs.com/

Directory information:

assets - Acts as a resource pack, you can put any client resources in here, like textures, models, etc. Example: assets/kubejs/textures/item/test_item.png
data - Acts as a datapack, you can put any server resources in here, like loot tables, functions, etc. Example: data/kubejs/loot_tables/blocks/test_block.json

startup_scripts - Scripts that get loaded once during game startup - Used for adding items and other things that can only happen while the game is loading (Can be reloaded with /kubejs reload_startup_scripts, but it may not work!)
server_scripts - Scripts that get loaded every time server resources reload - Used for modifying recipes, tags, loot tables, and handling server events (Can be reloaded with /reload)
client_scripts - Scripts that get loaded every time client resources reload - Used for JEI events, tooltips and other client side things (Can be reloaded with F3+T)

config - KubeJS config storage. This is also the only directory that scripts can access other than world directory
exported - Data dumps like texture atlases end up here

You can find type-specific logs in logs/kubejs/ directory
/ftbquests change_progress @s reset 2E7CFA2511C85DA0

/summon minecraft:villager ^ ^1 ^1 {CustomName:"Trader Joe",Offers:{Recipes:[{maxUses:9999999,buy:{id:"thermal:nickel_coin", Count:1},buyB:{id:"minecraft:air",Count:0},sell:{id:"minecraft:oak_planks",Count:16},rewardExp:false,xp:0},{maxUses:9999999,buy:{id:"thermal:nickel_coin", Count:1},buyB:{id:"minecraft:air",Count:0},sell:{id:"minecraft:spruce_planks",Count:16},rewardExp:false,xp:0}]},VillagerData:{profession:"minecraft:fisherman",level:3,type:"minecraft:swamp"}}

