// Block Placement

function opposite(face) {
	if (face.equals('down'))
		return 'up'
	if (face.equals('east'))
		return 'west'
	if (face.equals('west'))
		return 'east'
	if (face.equals('north'))
		return 'south'
	if (face.equals('south'))
		return 'north'
	return 'down'
}

onEvent('entity.spawned', event => {
	let entity = event.getEntity()
	if (entity.getType() == "appliedenergistics2:singularity") {
		let item = entity.getItem()
		if (item == null)
			return
		if (!item.getId().contains("quantum"))
			return
		entity.setMotionX(0)
		entity.setMotionY(0)
		entity.setMotionZ(0)
		return
	}
	if (entity.getType() != "minecraft:item")
		return
	let item = entity.getItem()
	if (item == null)
		return
	if (!item.getId().startsWith("tconstruct:"))
		return
	if (!item.getId().endsWith("slime_fern"))
		return
	let block = entity.getBlock()
	if (block.getId() != "occultism:spirit_fire" && block.getDown().getId() != "occultism:spirit_fire")
		return
	entity.setMotionX(entity.getMotionX() / 16)
	entity.setMotionY(0.35)
	entity.setMotionZ(entity.getMotionZ() / 16)
	entity.setX(Math.floor(entity.getX()) + .5)
	entity.setY(Math.floor(entity.getY()) - .5)
	entity.setZ(Math.floor(entity.getZ()) + .5)
})

onEvent('server.datapack.first', event => {

	// "Fixes" Extended Caves wiping its config contents
	let extcaves_conf = java("com.polyvalord.extcaves.config.Config")
	let suppl_conf = java("net.mehvahdjukaar.supplementaries.configs.ServerConfigs")
	let no_thankyou = suppl_conf.block.CAGE_ALL_MOBS

	extcaves_conf.gen_block_lavastone = no_thankyou
	extcaves_conf.gen_block_oldstone = no_thankyou
	extcaves_conf.gen_vines = no_thankyou
	extcaves_conf.gen_block_sedimentstone = no_thankyou
	extcaves_conf.gen_block_dirtstone = no_thankyou
	extcaves_conf.gen_block_marlstone = no_thankyou
	extcaves_conf.gen_block_packed_ice = no_thankyou
	extcaves_conf.gen_mushrooms = no_thankyou
	extcaves_conf.gen_mosses = no_thankyou
	extcaves_conf.gen_rock_flints = no_thankyou

})

/*
onEvent('player.tick', event => {

	// Fixes advanced rocketry not applying low gravity on the moon
	let player = event.getPlayer()

	if (player.minecraftPlayer.field_70173_aa % 10 != 0)
		return
	if (event.world.getDimension() != "custommoon:moon")
		return

	let effects = java("net.minecraft.potion.Effects")
	player.getPotionEffects().add(effects.field_204839_B, 20, 0, false, false) // slow fall
	player.getPotionEffects().add(effects.field_76430_j, 20, 4, false, false) // jump boost

})
*/

onEvent('player.tick', event => {

	// Fixes advanced rocketry not descending their rocket
	let player = event.getPlayer()
	if (player.getY() < 700)
		return

	let riding = player.getRidingEntity()
	if (!riding)
		return
	if (riding.getType() != "advancedrocketry:rocket")
		return

	let nbt = riding.getFullNBT()
	if (nbt["flight"] == 0) {
		nbt["flight"] = 1
		riding.setFullNBT(nbt)
	}

})

onEvent('block.place', event => {

	// Auto-configure placed energy "pipez" to extract when near a dynamo
	let block = event.getBlock()
	if (block.getId().startsWith('pipez:energy_pipe')) {

		Direction.ALL.values().forEach(face => {
			let dynamo = block.offset(face)
			if (!dynamo.id.startsWith("thermal:dynamo"))
				return
			if (face.toString().toLowerCase() != opposite(dynamo.getProperties()['facing'].toString()))
				return

			let properties = block.getProperties()
			properties['has_data'] = true
			block.set(block.getId(), properties)
			let te = block.getEntity()
			if (!te)
				return
			let nbt = utils.newMap().toNBT()
			te.func_189515_b(nbt)
			let sides = nbt.func_150295_c("ExtractingSides", 1)
			sides.set(face.ordinal(), java("net.minecraft.nbt.ByteNBT").field_229670_c_)
			te.func_230337_a_(block.getBlockState(), nbt)
		})
		return
	}

	// Reverse placed Dynamos on Sneak 
	if (event.getEntity() == null)
		return
	if (block.getId().startsWith('thermal:dynamo')) {
		let properties = block.getProperties()
		if (event.getEntity().isCrouching()) {
			properties['facing'] = opposite(properties['facing'].toString())
			block.set(block.getId(), properties)
		}

		Direction.ALL.values().forEach(face => {
			if (face.toString().toLowerCase() != opposite(properties['facing'].toString()))
				return
			let pipe = block.offset(face.getOpposite())
			if (pipe.getId().startsWith('pipez:energy_pipe')) {
				let properties2 = pipe.getProperties()
				properties2['has_data'] = true
				pipe.set(pipe.getId(), properties2)
				let te = pipe.getEntity()
				if (!te)
					return
				let nbt = utils.newMap().toNBT()
				te.func_189515_b(nbt)
				let sides = nbt.func_150295_c("ExtractingSides", 1)
				sides.set(face.ordinal(), java("net.minecraft.nbt.ByteNBT").field_229670_c_)
				te.func_230337_a_(pipe.getBlockState(), nbt)
			}
		});
	}

})

const barrelTiers = [
	{block: 'metalbarrels:copper_barrel', upgrade: 'metalbarrels:wood_to_copper'},
	{block: 'metalbarrels:iron_barrel', upgrade: 'metalbarrels:wood_to_iron'},
	{block: 'metalbarrels:silver_barrel', upgrade: 'metalbarrels:wood_to_silver'},
	{block: 'metalbarrels:gold_barrel', upgrade: 'metalbarrels:wood_to_gold'}
]

const blockIdToBarrelTier = utils.newMap()
const upgradeIdToBarrelTier = utils.newMap()
barrelTiers.forEach((e, i) => {
	blockIdToBarrelTier.put(e.block, i)
	upgradeIdToBarrelTier.put(e.upgrade, i)
})

function convertBarrel(block, newType)
{
	if(block == null) return
	
	let nbt = block.getEntityData()
	if(nbt == null) return
	
	let customName = nbt.func_74779_i("CustomName")
	let items = block.getId().contains('metalbarrels:') ? nbt.func_74775_l("inv").func_150295_c("Items", 10) : nbt.func_150295_c("Items", 10)

	block.setEntityData(utils.newMap().toNBT())
	block.set(newType, block.getProperties())

	nbt = block.getEntityData()
	if(customName) nbt.func_74778_a("CustomName", customName)
	nbt.func_74775_l("inv").func_218657_a("Items", items)
	block.setEntityData(nbt)
}

onEvent('block.right_click', event => {
	let player = event.getPlayer()
	if(event.getItem())
	{
		let upgradeTier = upgradeIdToBarrelTier.get(event.getItem().getId())
		let block = event.getBlock()
		if(block && upgradeTier != undefined)
		{
			let barrelTier = blockIdToBarrelTier.get(block.getId())
			if(barrelTier != undefined)
			{
				if(barrelTier < upgradeTier)
				{
					convertBarrel(block, barrelTiers[upgradeTier].block)
					event.getItem().setCount(event.getItem().getCount() - 1)
					
					let item = event.getWorld().createEntity("minecraft:item")
					item.setPosition(player.getX(), player.getY(), player.getZ())
					item.setItem(Item.of(barrelTiers[barrelTier].upgrade))
					item.spawn()
					
					event.cancel()
				}
			}
			else if(block.getId().equals('minecraft:barrel'))
			{
				convertBarrel(block, barrelTiers[upgradeTier].block)
				event.getItem().setCount(event.getItem().getCount() - 1)
				event.cancel()
			}
		}
	}
})
