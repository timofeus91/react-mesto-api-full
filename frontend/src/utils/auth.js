const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }

    return Promise.reject(`Сервер недоступен. Ошибка: ${res.status}.`);
}
//В версии которая задеплоина указывается url https://api.frontend.timofeus91.nomoredomains.icu . При работе на локальном сервере сменить на http://localhost:3005
export const BASE_URL = 'https://api.frontend.timofeus91.nomoredomains.icu';

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {email: data.email, password: data.password}
          )
      }).then(checkResponse)
}

export const authorize  = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {email: data.email, password: data.password}
          )
      }).then(checkResponse)
}

export const checkToken = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      }
    })
      .then(res => checkResponse(res))
  }