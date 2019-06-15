
// uNlang v0.1

const fs = require('fs');
const file = process.argv[2] //Dev vrs arg
global.outfile = 'module.exports.main = () => {'

var cmds = {
    defina: (spaceIndex, cont) => {
        let tr = cont.indexOf(';');
        let slcd = cont.slice(0, tr);
        if (slcd.includes('=')){
            let splttn = slcd.split('=');
            if (splttn[1].indexOf('+') != -1 || splttn[1].indexOf('-') != -1 || splttn[1].indexOf('*') != -1 || splttn[1].indexOf('/') != -1) {
                outfile += "\nlet"+splttn[0]+"="+splttn[1];
                return tr;
            } else {
                outfile += "\nlet"+splttn[0]+"="+splttn[1];
                return tr;
            }
        } else {
            outfile += `\nlet${slcd}`
        }
        
    },
    fale: (spaceIndex, cont) => {
        if (cont[1] != '"' || cont[1] != "'") {
            let outputted = cont.slice(1, cont.indexOf(';'));
            outfile += '\nconsole.log('+outputted+')';
            return cont.indexOf(';');
        } else {
            let outputted = cont.slice(1, cont.indexOf(';'));
            outfile += '\nconsole.log("'+outputted+'")';
            return cont.indexOf(';');
        }
    },
    importe: (spaceIndex, cont) => {
        let thing = './modulos/'+cont.slice(cont.indexOf('<') + 1, cont.indexOf('>'));
        let imported = require(thing);
        let fnKeys = Object.keys(imported.complement.functions);
        for (let a = 0; a < fnKeys.length; a++) {
            cmds[fnKeys[a]] = imported.complement.functions[fnKeys[a]];
        }
        let newKeys = imported.complement.keys
        for (let b = 0; b < newKeys.length; b++) {
            cmdKeys.push(newKeys[b]);
        }
        if (imported.complement.tmpAdd) {
            outfile += imported.complement.tmpAdd;
        }
        return cont.indexOf(';');
    },
    se: (a , cont) => {
        let tr
        if (cont.includes('senao')) {
            let count = 0
            for (let z = 0; z < cont.length; z++) {
                if (cont[z] == '}') {
                    if(count == 1) {
                       tr = z 
                    } else {
                        count++
                    }
                }
            }
            cont = cont.split('{')
            let cond = cont[0].slice(cont[0].indexOf('(') + 1, cont[0].indexOf(')'))
            outfile += `\nif (${cond}) {`
            stat1 = cont[1].slice(0, cont[1].indexOf('}'))
            lexer(stat1)
            outfile += '\n} else {\n'
            let stat2 = cont[2].slice(0, cont[2].indexOf('}'))
            lexer(stat2)
            outfile += '\n}'
        } else {
            tr = cont.indexOf('}')
            cont = cont.split('}')[0]
            let conditionIdx1 = cont.indexOf('(')
            let conditionIdx2 = cont.indexOf(')')
            let condition = cont.slice(conditionIdx1 + 1,conditionIdx2)
            outfile += `\nif(${condition}) {`
            let action = cont.split('{')[1]
            lexer(action)
            outfile += `\n}`
        }
        return tr
    },
    enquanto: (a, cont) => {
        console.log('called')
        let tr = cont.indexOf('}')
        cont = cont.split('{')
        let cond = cont[0].slice(cont[0].indexOf('(') + 1, cont[0].indexOf(')'));
        outfile += `\nwhile(${cond}) {`
        let stat = cont[1].slice(0, cont[1].indexOf('}'))
        lexer(stat)
        outfile += '\n}'
        return tr
    },
    debug: (a, cont) => {
        console.log('DEBUG')
        let tr = cont.indexOf(';')
        cont = cont.slice(1, cont.indexOf(';') - 1)
        params = cont.split(',')
        console.log('>> DEBUG >> \n Parâmetros: '+params)
        return tr
    },
    sanitize: (a, cont) => {
    }
}


let cmdKeys = Object.keys(cmds)

if (!file) {
    console.log("      ___           ___           ___       ___           ___           ___     ")
    console.log("     /\\__\\         /\\__\\         /\\__\\     /\\  \\         /\\__\\         /\\  \\    ")
    console.log("    /:/  /        /::|  |       /:/  /    /::\\  \\       /::|  |       /::\\  \\   ")
    console.log("   /:/  /        /:|:|  |      /:/  /    /:/\\:\\  \\     /:|:|  |      /:/\\:\\  \\  ")
    console.log("  /:/  /  ___   /:/|:|  |__   /:/  /    /::\\ \\:\\  \\   /:/|:|  |__   /:/  \\:\\  \\ ")
    console.log(" /:/__/  /\\__\\ /:/ |:| /\\__\\ /:/__/    /:/\\:\\ \\:\\__\\ /:/ |:| /\\__\\ /:/__/_\\:\\__\\")
    console.log(" \\:\\  \\ /:/  / \\/__|:|/:/  / \\:\\  \\    \\/__\\:\\/:/  / \\/__|:|/:/  / \\:\\  /\\ \\/__/")
    console.log("  \\:\\  /:/  /      |:/:/  /   \\:\\  \\        \\::/  /      |:/:/  /   \\:\\ \\:\\__\\  ")
    console.log("   \\:\\/:/  /       |::/  /     \\:\\  \\       /:/  /       |::/  /     \\:\\/:/  /  ")
    console.log("    \\::/  /        /:/  /       \\:\\__\\     /:/  /        /:/  /       \\::/  /   ")
    console.log("     \\/__/         \\/__/         \\/__/     \\/__/         \\/__/         \\/__/    ")
    console.log("============================================================================================")
    console.log("Versão 0.1.1 - conceito")
    console.log(" -- NEW THINGS >>")
    console.log("  - 'enquanto' - agora é possível realizar loops")
    console.log("  - 'se' - blocos condicionais agora são possíveis")
    console.log("============================================================================================")
    console.log("Para utilizar, digite "+process.argv[1].split("\\")[this.length - 1])
} else {
    let buff = fs.readFile(file, 'utf8', (err, cont) => {
        if (err) throw err;
        cont += '\n#'
        lexer(cont)
    })
}
function lexer(cont) {
    let len = cont.length;
    let tmp = ''
    for (let a = 0; a < len + 1; a++) {
        if (cont[a] === '#'){
            outfile += '\n}'
            fs.writeFile('tmp.js', outfile, (err) => {
                if (err) throw err;
                let file = require('./tmp')
                file.main()
            })
        }
        if (cont[a] !==  ' ') {
            if (cont[a] === "("){
                if (tmp.match(/\n/) !== null) {
                    tmp = tmp.slice(tmp.match(/\n/).index + 1, tmp.length)
                }
                if (tmp.match(/\t/) !== null) {
                    tmp = tmp.slice(tmp.match(/\t/).index + 1, tmp.length)
                }
                if (cmdKeys.indexOf(tmp) != -1) {
                    cont = cont.slice(a, cont.length)
                    len = cont.length
                    a = cmds[tmp](a, cont)
                }
                tmp = ''
            } else {
                tmp += cont[a]
            }
        } else {
            if (tmp.match(/\n/) !== null) {
                tmp = tmp.slice(tmp.match(/\n/).index + 1, tmp.length)
            }
            if (tmp.match(/\t/) !== null) {
                tmp = tmp.slice(tmp.match(/\t/).index + 1, tmp.length)
            }
            if (cmdKeys.indexOf(tmp) != -1) {
                cont = cont.slice(a, cont.length)
                len = cont.length
                a = cmds[tmp](a, cont)
                fs.appendFile('log', `#####\n${cont.split(a)[cont.split(a).length - 1]}\n\n###`, () => {

                })
            }
            tmp = ''
        }
    }
}


function output(data) {
    console.log(data)
}