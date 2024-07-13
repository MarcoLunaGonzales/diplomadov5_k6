import http, { head } from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const csvData = new SharedArray('CSV data', function(){
    return papaparse.parse(open('./datos_iconos.csv'), {header: true }).data;
});

function getRandomValue(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

export let options ={
    vus: 1,
    duration: '1s',
};


export default function () {

    let randomIcon = csvData[Math.floor(Math.random()*csvData.length-1)].id_icono;
    //let randomIcon = csvData[4].id_icono;

    // let url = 'https://api.iconfinder.com/v4/iconsets/${randomIcon}/icons';
    let url = 'https://api.iconfinder.com/v4/iconsets?count=10';

    console.log("URL enviada: " + url);

   let params = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1'
        }
   };

    let res = http.get(url, params);
    //console.log('Cuerpo Respuesta: ', res.body);
    
    let responseBody = JSON.parse(res.body);

    if(responseBody.iconsets){
        responseBody.iconsets.forEach(iconset => {
            let userId = iconset.author.user_id;
            console.log('Usuario ID: ',  userId);
            
            if(userId){
                let userURL = `https://api.iconfinder.com/v4/users/${userId}`;
                let userRes = http.get(userURL,params);

                check(userRes, {
                    'status usuario res' : (r) => r.status === 200,
                });

                console.log('Respuesta peticion User: ',userRes.body);
            }
        });
    }else{
        console.log('No existen iconos de respuesta.');
    }


    check(res,{
        'estado correcto': (r) => r.status === 200,
        'respuesta procesada correctamente': (r) => r.body.includes('total_count'),
    });
    sleep(1);
};
