const fs = require('fs');
const {
    exec
} = require('child_process');
const glob = require("glob");

const appdata = process.env.LOCALAPPDATA == null ? `${(__dirname.split(":")[0])}:/Users/${(__dirname.split("\\")[2])}/AppData/Local` : process.env.LOCALAPPDATA;

let _ = fs.readdirSync(appdata)

_.forEach(a => {
    if (a.includes('iscord') || a.includes('cord')) {
        glob.sync(`${appdata}\\${a}\\app-*\\modules\\discord_desktop_core-*\\discord_desktop_core`).map(async a => {

            if (!fs.readdirSync(a).includes('index.js')) return
            let index = fs.readFileSync(a + '\\index.js', 'utf-8')
            let filename = (a + "\\index.js")
            exec('tasklist', (e, t, r) => {

                if (t.includes(a.split('/')[5] + '.exe')) {
                    exec(`taskkill /IM ${a.split('/')[5]}.exe /F`)
                    setTimeout(() => {
                        if (fs.existsSync(appdata + `\\${a.split('/')[5]}\\Update.exe`)) exec(`${appdata + `\\${a.split('/')[5]}\\Update.exe`} --processStart ${a.split('/')[5]}.exe`)
                    }, 2000)
                }
            })

            if (index.toString() !== "module.exports = require('./core.asar');") {
                console.info(`\x1b[31mYou have been token grabbed in ${a.split('/')[5]} !\x1b[0m`)
                fs.writeFile(filename, "module.exports = require('./core.asar');", (err) => {
                    if (err) throw err

                    fs.readFile(filename, "utf8", function (err, data) {
                        if (err) throw err
                        if (data.toString() !== "module.exports = require('./core.asar');") return console.error("\x1b[31mDiscord not installed\x1b[0m")
                        console.info("\x1b[33m\nGrabber delete avec succès!\nVeuillez changer votre mot de passe.\x1b[0m")
                    })

                })
            } else console.log(`\x1b[32minstance ${a.split('/')[5]} is cleaned by Medusa\x1b[0m`)
        })
    }
})

setTimeout(() => process.exit(), 30000)