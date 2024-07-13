import http from 'k6/http';
import { sleep, check} from 'k6';

export const options = {
    stages: [
        { duration: '60s', target: 300 },
        { duration: '60s', target: 500 },
        { duration: '60s', target: 1000 },
    ],
    gracefulStop: '5m',
};

export default function() {
    let res = http.get('https://jsonplaceholder.typicode.com/posts/');

    // console.log('Cuerpo de la respuesta: ', res.body);
    // console.log('Headers: ', JSON.stringify(res.headers));
    // console.log('Tiempos de respuesta: ', res.timings.duration,'ms');
    check(res,{
        'estado correcto': (r) => r.status === 200,
   });
    sleep(1);
}
