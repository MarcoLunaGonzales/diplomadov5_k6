import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 20,
  // A string specifying the total duration of the test run.
  duration: '31s',
};

export default function() {
  http.get('https://test.k6.io');
  sleep(1);
}
