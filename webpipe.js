const nrc = require('node-run-cmd');
const fs = require('fs')

function runcode() {
    console.log('called')
    let code = document.getElementById('cod').value
    fs.writeFile('arch.un', code, (err) => {
        if (err) throw err;
        nrc.run('node index.js arch.un', { onData: output })
    })
    function output (data) {
        if (document.getElementById('output').value === "") {
            document.getElementById('output').value = data
        } else {
            let mock = document.getElementById('output').value
            mock += '\n'+data
            document.getElementById('output').value = mock
        }
    }
}