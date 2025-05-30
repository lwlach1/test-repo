console.log("main.js załadowany!");
const apiUrl = 'https://fioconxhujqsiwkjymme.supabase.co/rest/v1/articles';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb2NvbnhodWpxc2l3a2p5bW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTk3NjcsImV4cCI6MjA2MzIzNTc2N30.2FuTk3izW5jrUr7Tvfszd6SkUitIkJ6tjKD6M2YXNGI';

const headers = {
  apikey: apiKey,
  Authorization: `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
};


const fetchAndDisplayArticles = async (sort = 'created_at.desc') => {
  const res = await fetch(`${apiUrl}?order=${sort}`, { headers });
  const articles = await res.json();
  const container = document.getElementById('article-list');
  container.innerHTML = articles.map(article => `
    <div>
      <h3>${article.title}</h3>
      <p>${article.subtitle || ''}</p>
      <small>${article.author || ''} - ${article.created_at}</small>
      <p>${article.content}</p>
    </div>
  `).join('');
};

document.getElementById('sort-select').addEventListener('change', (e) => {
  fetchAndDisplayArticles(e.target.value);
});

document.getElementById('add-article').addEventListener('click', async () => {
  const form = document.getElementById('add-article-form');
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(article),
  });

  if (response.ok) {
    alert('Dodano artykuł!');
    form.reset();
    fetchAndDisplayArticles(); 
  } else {
    alert('Błąd przy dodawaniu artykułu');
  }
});

fetchAndDisplayArticles();
