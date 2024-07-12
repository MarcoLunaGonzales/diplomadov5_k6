import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    scenarios: {
      constant_arrival_rate_scenario: {
        executor: 'constant-arrival-rate',
        rate: 2, // 10 iteraciones por segundo
        timeUnit: '10s', // Por segundo
        duration: '31s', // Duración total de 1 minuto
        preAllocatedVUs: 1, // VUs preasignados
        maxVUs: 100, // Máximo de VUs
      },
    },
  };



export default function() {
  http.get('https://test.k6.io');
//   sleep(2);
}
