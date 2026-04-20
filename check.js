const fs = require('fs');

function checkHTML(filename) {
    const html = fs.readFileSync(filename, 'utf8');
    const lines = html.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let tagMatches = line.match(/<[^>]*$/);
        if (tagMatches && !line.includes('//') && !line.includes('/*')) {
             console.log('Possible unclosed bracket < at line ' + (i+1) + ': ' + line.trim());
        }
        
        let doubleQuotes = (line.match(/"/g) || []).length;
        if (doubleQuotes % 2 !== 0 && !line.includes('//') && !line.includes('/*') && !line.includes('`') && !line.includes('import')) {
            console.log('Unclosed double quote at line ' + (i+1) + ': ' + line.trim());
        }
    }
}

function checkCSS(filename) {
    const css = fs.readFileSync(filename, 'utf8');
    const lines = css.split('\n');
    let braces = 0;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        for (let j = 0; j < line.length; j++) {
            if (line[j] === '{') braces++;
            if (line[j] === '}') braces--;
        }
        if (braces < 0) {
            console.log('Extra } at line ' + (i+1));
            braces = 0;
        }
    }
    if (braces > 0) {
        console.log('Missing ' + braces + ' } braces');
    }
}

console.log("Checking HTML...");
checkHTML('airpaste.html');
console.log("Checking CSS...");
checkCSS('airpaste.css');
