const API_URL = 'https://fioconxhujqsiwkjymme.supabase.co/rest/v1/article';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb2NvbnhodWpxc2l3a2p5bW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTk3NjcsImV4cCI6MjA2MzIzNTc2N30.2FuTk3izW5jrUr7Tvfszd6SkUitIkJ6tjKD6M2YXNGI';

const fetchArticles = async (order = 'created_at.desc') => {
  try {
    const response = await fetch(`${API_URL}?order=${order}`, {
      headers: { apikey: API_KEY }
    });
    const data = await response.json();
    displayArticles(data);
  } catch (error) {
    console.error('Błąd podczas pobierania:', error);
  }
};

const displayArticles = (articles) => {
  const list = document.getElementById('article-list');
  list.innerHTML = '';
  articles.forEach(article => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${article.title}</h3>
      <h4>${article.subtitle || ''}</h4>
      <p><strong>Autor:</strong> ${article.author || 'Brak autora'}</p>
      <p>${article.content || ''}</p>
      <small>Data: ${article.created_at || 'Brak daty'}</small>
      <hr>
    `;
    list.appendChild(div);
  });
};

const createNewArticle = async (articleData) => {
  console.log('Wysyłam artykuł:', articleData);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        apikey: API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleData)
    });

    if (response.ok) {
      console.log('Artykuł dodany');
      fetchArticles();
    } else {
      const errorText = await response.text();
      console.error('Błąd dodawania:', response.status, errorText);
    }
  } catch (error) {
    console.error('Błąd sieci:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchArticles();

  document.getElementById('sort-select').addEventListener('change', (e) => {
    fetchArticles(e.target.value);
  });

  document.getElementById('add-article-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const newArticle = {
      title: form.title.value,
      subtitle: form.subtitle.value,
      author: form.author.value,
      content: form.content.value,
      created_at: form.created_at.value 
  ? new Date(form.created_at.value).toISOString() 
  : new Date().toISOString()
    };
    createNewArticle(newArticle);
    form.reset();
  });
});
