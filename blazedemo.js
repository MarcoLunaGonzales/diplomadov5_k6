import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
//   cloud: {
//     distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
//     apm: [],
//   },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 100, duration: '60s' },
        // { target: 50, duration: '60s' },
        // { target: 100, duration: '80s' },
      ],
        //   gracefulRampDown: '120s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group('page_2 - https://blazedemo.com/reserve.php', function () {
    response = http.post(
      'https://blazedemo.com/reserve.php',
      {
        fromPort: 'Boston',
        toPort: 'New York',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'https://blazedemo.com',
          'upgrade-insecure-requests': '1',
          'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get('https://blazedemo.com/assets/bootstrap.min.css', {
      headers: {
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://blazedemo.com/assets/bootstrap-table.css', {
      headers: {
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(0.5)

    response = http.get('https://blazedemo.com/favicon.ico', {
      headers: {
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(2)
  })

  group('page_3 - https://blazedemo.com/purchase.php', function () {
    response = http.post(
      'https://blazedemo.com/purchase.php',
      {
        flight: '9696',
        price: '200.98',
        airline: 'Aer Lingus',
        fromPort: 'Boston',
        toPort: 'New York',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'https://blazedemo.com',
          'upgrade-insecure-requests': '1',
          'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get('https://blazedemo.com/favicon.ico', {
      headers: {
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(26.3)
  })

  group('page_4 - https://blazedemo.com/confirmation.php', function () {
    response = http.post(
      'https://blazedemo.com/confirmation.php',
      {
        _token: '',
        inputName: 'Marco Antonio Luna Gonzales',
        address: 'Alvarez Plata Nro. 32',
        city: 'La Paz',
        state: 'KJHKJH',
        zipCode: '0591',
        cardType: 'visa',
        creditCardNumber: '65656756756756',
        creditCardMonth: '11',
        creditCardYear: '2017',
        nameOnCard: 'mARCO ',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'https://blazedemo.com',
          'upgrade-insecure-requests': '1',
          'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get('https://blazedemo.com/assets/bootstrap.min.js', {
      headers: {
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://blazedemo.com/assets/bootstrap-table.js', {
      headers: {
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://blazedemo.com/assets/bootstrap.min.css', {
      headers: {
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://blazedemo.com/assets/bootstrap-table.css', {
      headers: {
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://blazedemo.com/favicon.ico', {
      headers: {
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
  })
}
