const fs = require('fs');
const readline = require('readline');
const path = require('path');


const DEPS_DIR = path.join(process.cwd(), 'node_modules');

if (!process.argv[2]) { // los dos primeros argumentos son "node" y la ruta del script
  return console.log('\x1b[31m', 'Error: nombre de paquete inválido');
}

checkModule(process.argv[2].toLowerCase())
  .then(files => {
    console.log('\n[+] Packages found:\n');
    files.forEach(file => {

      let packageInfo = `${DEPS_DIR}/${file}/package.json`;
      let reader = readline.createInterface({
        input: fs.createReadStream(packageInfo)
      });

      reader.on('line', line => {
        if (line.includes('version')) {
          let version = line.split(':')[1].replace(/\s/g, '').replace(/"/g, '');
          console.log('\x1b[32m', `${file}@${version}`);
        }
      });
    });
  })
  .catch(err => {
    console.log(err.message);
  });


function checkModule(input) {
  return new Promise((resolve, reject) => {
    fs.readdir(DEPS_DIR, (err, files) => {
      if (err) {
        reject(
          new Error('No existe node_modules en este directorio')
        );
      } else {
        resolve(
          files
            .filter(file => file.toLowerCase().includes(input))
        );
      }
    });
  });
}