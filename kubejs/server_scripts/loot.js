let metal_ores_drop_dust = (id, dust_id) => ({
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:match_tool",
                                    "predicate": {
                                        "enchantments": [
                                            {
                                                "enchantment": "minecraft:silk_touch",
                                                "levels": {
                                                    "min": 1
                                                }
                                            }
                                        ]
                                    }
                                }
                            ],
                            "name": id
                        },
                        {
                            "type": "minecraft:item",
                            "name": dust_id,
                            "functions": [
                                {
                                    "function": "minecraft:explosion_decay"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "conditions": [
                        {
                            "condition": "minecraft:table_bonus",
                            "enchantment": "minecraft:fortune",
                            "chances": [
                                0.0,
                                0.125,
                                0.25,
                                0.35,
                                0.5
                            ]
                        }
                    ],
                    "name": dust_id
                }
            ]
        }
    ]
})

let mystery_leaves_but_no_gapples =
{
    "type": "minecraft:block",
    "pools": [
        {
            "name": "forbidden_arcanus:mysterywood_leaves",
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:alternative",
                                    "terms": [
                                        {
                                            "condition": "minecraft:match_tool",
                                            "predicate": {
                                                "tag": "forge:shears"
                                            }
                                        },
                                        {
                                            "condition": "minecraft:match_tool",
                                            "predicate": {
                                                "enchantments": [
                                                    {
                                                        "enchantment": "minecraft:silk_touch",
                                                        "levels": {
                                                            "min": 1
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ],
                            "name": "forbidden_arcanus:mysterywood_leaves"
                        },
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:survives_explosion"
                                },
                                {
                                    "condition": "minecraft:table_bonus",
                                    "enchantment": "minecraft:fortune",
                                    "chances": [
                                        0.05,
                                        0.0625,
                                        0.083333336,
                                        0.1
                                    ]
                                }
                            ],
                            "name": "forbidden_arcanus:mysterywood_sapling"
                        }
                    ]
                }
            ]
        },
        {
            "name": "forbidden_arcanus:mysterywood_leaves",
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "conditions": [
                        {
                            "condition": "minecraft:table_bonus",
                            "enchantment": "minecraft:fortune",
                            "chances": [
                                0.02,
                                0.022222223,
                                0.025,
                                0.033333335,
                                0.1
                            ]
                        }
                    ],
                    "functions": [
                        {
                            "function": "minecraft:set_count",
                            "count": {
                                "min": 1.0,
                                "max": 2.0,
                                "type": "minecraft:uniform"
                            }
                        },
                        {
                            "function": "minecraft:explosion_decay"
                        }
                    ],
                    "name": "minecraft:stick"
                }
            ],
            "conditions": [
                {
                    "condition": "minecraft:inverted",
                    "term": {
                        "condition": "minecraft:alternative",
                        "terms": [
                            {
                                "condition": "minecraft:match_tool",
                                "predicate": {
                                    "tag": "forge:shears"
                                }
                            },
                            {
                                "condition": "minecraft:match_tool",
                                "predicate": {
                                    "enchantments": [
                                        {
                                            "enchantment": "minecraft:silk_touch",
                                            "levels": {
                                                "min": 1
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        },
        {
            "name": "forbidden_arcanus:mysterywood_leaves",
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "conditions": [
                        {
                            "condition": "minecraft:survives_explosion"
                        },
                        {
                            "condition": "minecraft:table_bonus",
                            "enchantment": "minecraft:fortune",
                            "chances": [
                                0.005,
                                0.0055555557,
                                0.00625,
                                0.008333334,
                                0.025
                            ]
                        }
                    ],
                    "name": "minecraft:gold_nugget"
                }
            ],
            "conditions": [
                {
                    "condition": "minecraft:inverted",
                    "term": {
                        "condition": "minecraft:alternative",
                        "terms": [
                            {
                                "condition": "minecraft:match_tool",
                                "predicate": {
                                    "tag": "forge:shears"
                                }
                            },
                            {
                                "condition": "minecraft:match_tool",
                                "predicate": {
                                    "enchantments": [
                                        {
                                            "enchantment": "minecraft:silk_touch",
                                            "levels": {
                                                "min": 1
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ]
}

let slabs = (id) => ({
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "functions": [
                        {
                            "function": "minecraft:set_count",
                            "conditions": [
                                {
                                    "condition": "minecraft:block_state_property",
                                    "block": id,
                                    "properties": {
                                        "type": "double"
                                    }
                                }
                            ],
                            "count": 2
                        },
                        {
                            "function": "minecraft:explosion_decay"
                        }
                    ],
                    "name": id
                }
            ]
        }
    ]
})

let cobble = (id, cobbleId) => ({
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:match_tool",
                                    "predicate": {
                                        "enchantments": [
                                            {
                                                "enchantment": "minecraft:silk_touch",
                                                "levels": {
                                                    "min": 1
                                                }
                                            }
                                        ]
                                    }
                                }
                            ],
                            "name": id
                        },
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:survives_explosion"
                                }
                            ],
                            "name": cobbleId
                        }
                    ]
                }
            ]
        }
    ]
})

onEvent('block.loot_tables', event => {

    // Vanilla stone variants drop as cobble
    event.addJson(MC('andesite'), cobble(MC('andesite'), CR('andesite_cobblestone')))
    event.addJson(MC('diorite'), cobble(MC('diorite'), CR('diorite_cobblestone')))
    event.addJson(MC('granite'), cobble(MC('granite'), CR('granite_cobblestone')))
    event.addSimpleBlock('chisel:basalt/raw', 'extcaves:lavastone')

    event.addSimpleBlock('minecraft:twisting_vines', 'minecraft:twisting_vines')
    event.addSimpleBlock('minecraft:weeping_vines', 'minecraft:weeping_vines')
    event.addSimpleBlock('advancedrocketry:moonturf', 'advancedrocketry:moonturf')

    // 1.17-esque Ores
    let extra_ores = ['minecraft:', 'darkerdepths:aridrock_', 'darkerdepths:limestone_']

    extra_ores.forEach(e => {
        let iron = e + "iron_ore"
        event.addJson(iron, metal_ores_drop_dust(iron, CR('crushed_iron_ore')))
        let gold = e + "gold_ore"
        event.addJson(gold, metal_ores_drop_dust(gold, CR('crushed_gold_ore')))
    })
    event.addJson(CR('copper_ore'), metal_ores_drop_dust(CR('copper_ore'), CR('crushed_copper_ore')))
    event.addJson(CR('zinc_ore'), metal_ores_drop_dust(CR('zinc_ore'), CR('crushed_zinc_ore')))
    event.addJson(TE('nickel_ore'), metal_ores_drop_dust(TE('nickel_ore'), CR('crushed_nickel_ore')))
    event.addJson(TE('lead_ore'), metal_ores_drop_dust(TE('lead_ore'), CR('crushed_lead_ore')))

    event.addJson("forbidden_arcanus:mysterywood_leaves", mystery_leaves_but_no_gapples)

})