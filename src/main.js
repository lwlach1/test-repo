const API_URL = 'https://fioconxhujqsiwkjymme.supabase.co/rest/v1/articles';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb2NvbnhodWpxc2l3a2p5bW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTk3NjcsImV4cCI6MjA2MzIzNTc2N30.2FuTk3izW5jrUr7Tvfszd6SkUitIkJ6tjKD6M2YXNGI'; 

const fetchArticles = async (field = 'created_at', direction = 'desc') => {
  try {
    const response = await fetch(`${API_URL}?select=*&order=${field}.${direction}`, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`
      }
    });
    const data = await response.json();
    renderArticles(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const renderArticles = (articles) => {
  const container = document.getElementById('article-list');
  container.innerHTML = '';
  articles.forEach(article => {
    const div = document.createElement('div');
    const date = new Date(article.created_at);
    const formatted = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth()+1).padStart(2, '0')}-${date.getFullYear()}`;
    div.innerHTML = `
      <h2>${article.title}</h2>
      <h4>${article.subtitle}</h4>
      <p><strong>${article.author}</strong>, ${formatted}</p>
      <p>${article.content}</p>
      <hr/>
    `;
    container.appendChild(div);
  });
};

document.getElementById('sort-select').addEventListener('change', (e) => {
  const [field, direction] = e.target.value.split('.');
  fetchArticles(field, direction);
});

document.getElementById('add-article-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    title: form.title.value,
    subtitle: form.subtitle.value,
    author: form.author.value,
    content: form.content.value,
    created_at: form.created_at.value || new Date().toISOString()
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status !== 201) {
      throw new Error(`Status: ${response.status}`);
    }

    form.reset();
    fetchArticles();
  } catch (error) {
    console.error('Fetch error:', error);
  }
});

fetchArticles();
