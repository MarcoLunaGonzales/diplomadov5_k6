import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 60 },
        { duration: '30s', target: 80 },
        { duration: '30s', target: 100 },
    ],
};

export default function() {
    let res = http.get('https://jsonplaceholder.typicode.com/posts/');

    // console.log('Cuerpo de la respuesta: ', res.body);
    // console.log('Headers: ', JSON.stringify(res.headers));
    // console.log('Tiempos de respuesta: ', res.timings.duration,'ms');
    sleep(1);
}
