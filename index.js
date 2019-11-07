'use strict'

// var API_URL = 'https://haveibeenpwned.com/unifiedsearch/';
// Eejcutar proxy lcp --proxyUrl https://haveibeenpwned.com (npm install -g local-cors-proxy)
// var API_URL = 'http://localhost:8010/proxy/unifiedsearch/';
var API_URL = 'https://haveibeenpwned.com/api/v3/breachedaccount/';
// var API_URL = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';
// var API_URL = 'http://localhost:8010/proxy/api/v3/breachedaccount/'
var API_KEY = "your-api-key";

var input = document.getElementById('password-boxs');
var resBox = document.getElementById('response');
var resText = document.getElementById('response-text');
var breachesBox = document.getElementById('breaches');


var headers = new Headers();
headers.append('hibp-api-key', API_KEY);
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');


var options = {
  method: 'GET',
  mode: 'no-cors',
  headers: headers
};

input.addEventListener('keypress', getData);

function getData(key) {
  if (key.code == 'Enter') {
    let email = input.value;
    // email = email.replace('@', '%40');

    console.log(email);
    fetchData(email);
    // ajax(email);

  }
}

function ajax(email) {
  $.ajax({
      url: `${API_URL + email}?truncateResponse=false&callback=?`,
      method: "GET",
      dataType: 'jsonp',
      headers: headers
  });
}

function fetchData(email) {
  let text;
  fetch(`${API_URL + email}?truncateResponse=false`, options)
    .then((response) => {
      console.log('response', response);
      resBox.style.display = "block";
      if (response.ok) {
        text = 'Oh no! has sido HACKEADO';
        return Promise.resolve(response.json())
      }
      else {
        text = 'Muy bien no has sido hackeado :)';
        breachesBox.innerHTML = '';
        return Promise.reject({
          status: response.status,
          statusText: response.statusText
        })
      }
    })
    .then(res => {
      console.log('ok', res);
      resText.innerHTML = text;
      createBreaches(res);
    })
    .catch(err => {
      console.log('err', err);
      resText.innerHTML = text;
    })
}

function createBreaches(breaches) {
  console.log('breaches', breaches);
  let text = '';

  breaches.forEach(b => {
      text += b == breaches[0] ? `${b.Title}` : `, ${b.Title}`;
  });
  
  breachesBox.innerHTML = `<div><h3>${text}</h3></div>`;
}