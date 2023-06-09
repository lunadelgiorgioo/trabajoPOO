const fs = require('fs')
//Revisar si el archivo en el que vamos a escribir existe
function check(path){
    if (fs.existsSync(path)){
        console.log('existe');
        return true
    }
    else { console.log('no existe')
    return false }
}
function escribir(data, path){
   return fs.writeFileSync(path, JSON.stringify(data, null, 2))
}
function leer(path){
    try {
        if(check(path)){
            let result = JSON.parse(fs.readFileSync(path))
            console.log(result);
            return result
        }
    } catch (error) {
        console.log(error);
    }
}
function guardar(path, data) {
    if (check(path)){
        let dataToSave =  [...leer(path), data];
        console.log(leer(path), 'leyendo...')
        return escribir(dataToSave, path)
    } else {
        
        console.log('creando...');
        return escribir([data], path);
    }
}