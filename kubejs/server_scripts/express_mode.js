// onEvent('block.left_click', event => {
//     let block = event.getBlock()
//     let world = event.getWorld()

//     if (!event.getItem().getId().equals("minecraft:stick"))
//         return
//     if (!block.getId().equals("minecraft:barrel"))
//         return

//     let te = block.getEntity()
//     if (!te)
//         return
//     let nbt = utils.newMap().toNBT()
//     te.func_189515_b(nbt)

//     let parts = nbt.func_150295_c("Items", 10)
//     if (!parts)
//         return

//     let item = undefined
//     parts.forEach(part => {
//         if (item)
//             return
//         item = part
//     })

//     if (!item)
//         return


//     block.set("metalbarrels:iron_barrel", block.getProperties())

//     let id = item.func_74779_i("id")
//     let items = ""

//     for (i = 0; i < 54; i++) {
//         if (i > 0)
//             items += ","
//         items += `{Slot:${i},Count:64,id:"${id}"}`
//     }

//     world.server.runCommandSilent(`/data merge block ${block.x} ${block.y} ${block.z} {inv:{Items:[${items}]}}`)

// })