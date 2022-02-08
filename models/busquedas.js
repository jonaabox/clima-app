const fs = require("fs");
const axios = require("axios");

class Busquedas{
     historial = [];
     dbPath = './db/database.js';
    constructor(){
        this.leerDb();
    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {
     
         let palabras = lugar.split(' ');
         palabras = palabras.map( p => p[0].toUpperCase()+ p.substring(1));
 
 
         return palabras.join(' ');
        })
     }



    async ciudad( lugar = ''){
   
        try {
            //PETICION AXIOS     
       const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json?language=es&  -----token-----`);
        
       return resp.data.features.map( lugar =>({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1],
       }));
         // retornar los lugares que coincida al que se ingreso

        } catch (error){
            console.log(error);
         // retornar los lugares que coincida al que se ingreso
        
        };
    }

    async clima ( lat, lng ){

        try {
            
            const respClima = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&-------token api =metric&lang=es`);         
            const { weather, main } = respClima.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max
             }

        } catch (err) {
           console.log(err);
          return err;
        }

    } 


    agregarHistorial( lugar = ''){
        //TODO: prevenir duplicar
       if (this.historial.includes( lugar.toLocaleLowerCase() )){
           return;
       }else{
           this.historial.unshift( lugar.toLocaleLowerCase());
           this.guardarDb()
       }
        
    }

    guardarDb(){

        const payLoad= {
            historial :this.historial
        }
            fs.writeFileSync(this.dbPath, JSON.stringify(payLoad));
    }

    leerDb(){

        if(!fs.existsSync(this.dbPath)){
            return null;
        } 
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;
    }


}


module.exports = Busquedas;






