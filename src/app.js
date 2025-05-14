const app = document.getElementById('app');

let count = 0;

const title = document.createElement('h1');
title.textContent = 'Moja strona';
title.className = 'text-2xl font-bold';

const button = document.createElement('button');
button.textContent = `count is ${count}`;
button.className = 'bg-blue-300 p-4 mt-4';
button.onclick = () => {
  count++;
  button.textContent = `count is ${count}`;
};

app.appendChild(title);
app.appendChild(button);
