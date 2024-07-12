import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        constant_request_rate:{
            executor: 'constant-vus',
            vus: 20, //usuarios concurrentes
            duration: '30s',
        },
    },
};

export default function() {
    let res = http.get('https://jsonplaceholder.typicode.com/posts/100');

    // console.log('Cuerpo de la respuesta: ', res.body);
    // console.log('Headers: ', JSON.stringify(res.headers));
    // console.log('Tiempos de respuesta: ', res.timings.duration,'ms');
  
    sleep(1);
}
