'use strict'

// lcp --proxyUrl https://haveibeenpwned.com (npm install -g local-cors-proxy)
var API_URL = 'http://localhost:8010/proxy/api/v3/breachedaccount/';
// var API_URL = 'https://cors-anywhere.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/';
var API_KEY = "58a376db1fcb42fca86874f233289e5b";

var input = document.getElementById('password-boxs');
var resBox = document.getElementById('response');
var resText = document.getElementById('response-text');
var breachesBox = document.getElementById('breaches');
var carousel = document.getElementById('carousel'); 
var piePass = document.getElementById('pie-pass');

input.addEventListener('keypress', getData);
input.addEventListener('input', cleanScreen);

var headers = {
  'hibp-api-key': API_KEY,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}
var options = {
  method: 'GET',
  headers: headers
};

function getData(key) {
  if (key.code == 'Enter') {
    let email = input.value;
    // email = email.replace('@', '%40');

    console.log(email);
    fetchData(email);
  }

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

  var list = [];
  breaches.forEach(b => {
      text += b == breaches[0] ? `${b.Title}` : `, ${b.Title}`;
      var item = `
      <div class="card">
        <div class="row left">
            <div class="image">
              <img style="width: 128px; margin-right: 20px;" src="${b.LogoPath}" alt="">
            </div>
            <div class="header">
              <h3 class="title">${b.Title}</h3>
              <hr />
              <p class="date">${b.BreachDate}</p>
            </div>
        </div>
        <div class="row">
            <ul>
              ${b.DataClasses.map(data => {
                console.log(data);
                return `<li>${data}</li>`
              }).join('')}
            </ul>
        </div>                    
      </div>
      `;
      list.push(item);
  });
  
  // breachesBox.innerHTML = `<div><h3>${text}</h3></div>`;
  var level;
  if (breaches.length == 0) {
    level = 'ok';
  } else if (breaches.length > 0 && breaches.length < 3) {
    level = 'good';
  } else if (breaches.length >= 3) {
    level = 'bad';
  }
  changeContent(level, list);
}

  function changeContent(msg, list) {
    document.getElementById("cabeza-pass").setAttribute("class", "contenedor-1--" + msg);
    document.getElementById("meme").setAttribute("class", "nvl-" + msg);

    if (input.value == ""){
      document.getElementById("cabeza-pass").classList.remove("contenedor-1--bad");
      document.getElementById("cabeza-pass").classList.add("contenedor-1");
      document.getElementById("conteclave").classList.remove("mt-content");
      document.getElementById("pie-pass").style.display = "none";
    }
    else {
      document.getElementById("conteclave").classList.add("mt-content");
      document.getElementById("pie-pass").style.display = "block";
    }

    $('#carousel').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnFocus: false,
      pauseOnHover: false
    });

    list.forEach(b => {
      $('#carousel').slick('slickAdd', b);
    });
}

function cleanScreen() {
  console.log('clean', input.value);
  if (input.value == "") {
    document.getElementById("cabeza-pass").classList.remove("contenedor-1--bad");
    document.getElementById("cabeza-pass").classList.add("contenedor-1");
    document.getElementById("conteclave").classList.remove("mt-content");
    document.getElementById("pie-pass").style.display = "none";
  }
}