

events.listen('ftbquests.custom_reward', function (event) {
    let reward = event.getReward()
    let id = reward.quest.getCodeString()

    let runCommand = (cmd) => {
        event.server.schedule(10, event.server, function (callback) {
            callback.data.runCommandSilent(cmd)
        })
    }

    if (reward.hasTag('reset'))
        runCommand('/ftbquests change_progress ' + event.player.name + ' reset ' + id)

    if (reward.hasTag('bad_omen'))
        runCommand('/effect clear ' + event.player.name + ' minecraft:bad_omen')

    if (reward.hasTag('fortress'))
        event.server.schedule(10, event.server, function (callback) {
            callback.data.runCommand('/execute as ' + event.player.name + ' in minecraft:the_nether run locate fortress')
        })

})