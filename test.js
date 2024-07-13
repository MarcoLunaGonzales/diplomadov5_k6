import { sleep, group } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

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
        { target: 1, duration: '1s' },
        { target: 0, duration: '0s' },
        { target: 0, duration: '0s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  const vars = {}

  group('page_1 - https://www.demoblaze.com/index.html', function () {
    response = http.get('https://www.demoblaze.com/index.html', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1)

    response = http.options('https://api.demoblaze.com/check', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'POST',
        origin: 'https://www.demoblaze.com',
        'sec-fetch-mode': 'cors',
      },
    })

    response = http.post('https://api.demoblaze.com/check', '{"token":"bWx1bmExNzIxNDA3"}', {
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    vars['token1'] = jsonpath.query(response.json(), '$.Item.token')[0]

    response = http.get('https://api.demoblaze.com/entries', {
      headers: {
        accept: '*/*',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1.5)
  })

  group('page_2 - https://www.demoblaze.com/prod.html?idp_=1', function () {
    response = http.get('https://www.demoblaze.com/prod.html?idp_=1', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(0.7)

    response = http.post('https://api.demoblaze.com/check', `{"token":"${vars['token1']}"}`, {
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    vars['token2'] = jsonpath.query(response.json(), '$.Item.token')[0]

    response = http.options('https://api.demoblaze.com/view', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'POST',
        origin: 'https://www.demoblaze.com',
        'sec-fetch-mode': 'cors',
      },
    })

    response = http.post('https://api.demoblaze.com/view', '{"id":"1"}', {
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(1.8)

    response = http.post(
      'https://api.demoblaze.com/addtocart',
      `{"id":"b03d83a3-1f93-0068-08fd-322151ecf439","cookie":"${vars['token2']}","prod_id":1,"flag":true}`,
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/json',
          'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.options('https://api.demoblaze.com/addtocart', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'POST',
        origin: 'https://www.demoblaze.com',
        'sec-fetch-mode': 'cors',
      },
    })
    console.log('Cuerpo de la respuesta: ', response.body);
    sleep(5.2)
  })

  group('page_3 - https://www.demoblaze.com/cart.html', function () {
    response = http.get('https://www.demoblaze.com/cart.html', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    console.log('Cuerpo de la respuesta: ', response.body);
    sleep(0.8)

    response = http.options('https://api.demoblaze.com/check', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'POST',
        origin: 'https://www.demoblaze.com',
        'sec-fetch-mode': 'cors',
      },
    })

    response = http.post('https://api.demoblaze.com/check', `{"token":"${vars['token2']}"}`, {
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    console.log('Cuerpo de la respuesta: ', response.body);


    response = http.post(
      'https://api.demoblaze.com/viewcart',
      `{"cookie":"${vars['token2']}","flag":true}`,
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/json',
          'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )
    console.log('Cuerpo de la respuesta: ', response.body);


    response = http.options('https://api.demoblaze.com/viewcart', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'POST',
        origin: 'https://www.demoblaze.com',
        'sec-fetch-mode': 'cors',
      },
    })
    console.log('Cuerpo de la respuesta: ', response.body);
    sleep(0.6)

    response = http.post('https://api.demoblaze.com/view', '{"id":1}', {
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    console.log('Cuerpo de la respuesta: ', response.body);


    response = http.options('https://api.demoblaze.com/view', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'POST',
        origin: 'https://www.demoblaze.com',
        'sec-fetch-mode': 'cors',
      },
    })
    console.log('Cuerpo de la respuesta: ', response.body);

    sleep(13.7)

    response = http.post('https://api.demoblaze.com/deletecart', '{"cookie":"mluna"}', {
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    console.log('Cuerpo de la respuesta: ', response.body);


    response = http.options('https://api.demoblaze.com/deletecart', null, {
      headers: {
        accept: '*/*',
        'access-control-request-headers': 'content-type',
        'access-control-request-method': 'POST',
        origin: 'https://www.demoblaze.com',
        'sec-fetch-mode': 'cors',
      },
    })
    console.log('Cuerpo de la respuesta: ', response.body);

  })
}
