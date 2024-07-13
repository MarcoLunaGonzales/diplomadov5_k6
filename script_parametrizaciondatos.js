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
    duration: '15s',
};


export default function () {

    let randomIcon = csvData[Math.floor(Math.random()*csvData.length-1)].id_icono;
    //let randomIcon = csvData[4].id_icono;

    // let url = 'https://api.iconfinder.com/v4/iconsets/${randomIcon}/icons';
    let url = 'https://api.iconfinder.com/v4/iconsets/'+randomIcon+'/icons';

    console.log("URL enviada: " + url);

   let params = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1'
        }
   };

   let res = http.get(url, params);
//    console.log('Cuerpo Respuesta: ', res.body);
   check(res,{
        'estado correcto': (r) => r.status === 200,
        'respuesta procesada correctamente': (r) => r.body.includes('total_count'),
   });
   sleep(1);
};
