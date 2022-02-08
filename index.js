const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");











const main = async() => {
    
    const busqueda = new Busquedas();
    let opt = '';
    
    do {
        
        opt = await inquirerMenu()
        
        switch (opt) {
            case 1:
                    // mostrar mensaje
                    const termino = await leerInput('Ciudad: ');                  
    
                    // buscar los lugares
                    /* Mediante un llamado a la appi, debo crear un metodo que reccora los datos de la appi, busque las coincidencias y las retorne */
    
                    const lugares = await busqueda.ciudad(termino)
                    // seleccionar el lugar
                    /* crear un sub-menu con los resultados que nos arroje la busqueda utilizando el require */
    
                    const id = await listarLugares(lugares);  
                    if(id === '0') continue;
                    const lugarSelec = lugares.find( l => l.id === id);
                    busqueda.agregarHistorial( lugarSelec.nombre );

                    //  clima 
                    /* medianto otra appi que se le mande las coordenadas buscar el clima de esa ciudad */
                    const climaLugar =await busqueda.clima(lugarSelec.lat , lugarSelec.lng)
                    
                    //mostrar resultados
                    /*  mostrar en consola los resultados */
                    console.clear();
                    console.log('\nInformacion de la ciudad\n'.green);
                    console.log('Ciudad: ', lugarSelec.nombre.green);
                    console.log('lat: ', lugarSelec.lat);
                    console.log('Lng: ',lugarSelec.lng);
                    console.log('Descipcion: ', climaLugar.desc.green);
                    console.log('Temperatura: ',climaLugar.temp);
                    console.log('Minima: ',climaLugar.min);
                    console.log('Maxima:',climaLugar.max);
                    
                   
                break;
               
            case 2:

                    busqueda.historialCapitalizado.forEach((lugar,i ) => {
                        const idx = `${i + 1}.`.green;
                        console.log(`${idx} ${lugar} `);
                    });
                    


                break;

            
            case 3:
                console.log(opt); 
                break;
        }


        
        await pausa();

    } while (opt !== 0);
    

}






main();



