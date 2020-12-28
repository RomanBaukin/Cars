'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('cars'),
    output = document.getElementById('output');

  const getData = () =>
    new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', './cars.json');
      request.send();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          const data = JSON.parse(request.responseText);
          resolve(data);
        } else {
          reject(request.status);
        }
      });
    });

  const outputData = (data) => {
    data.cars.forEach((item) => {
      if (item.brand === select.value) {
        const { brand, model, price } = item;
        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
      }
    });
  };

  select.addEventListener('change', () => {
    getData()
      .then((data) => outputData(data))
      .catch((error) => console.error(error));
  });
});
