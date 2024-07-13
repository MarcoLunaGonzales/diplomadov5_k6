import http, { head } from 'k6/http';
import { check, sleep } from 'k6';

function getRandomValue(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

export let options ={
    vus: 1,
    duration: '15s',
};


export default function () {

    let randomIcon = getRandomValue(1, 17700);

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
