const fetchArticles = async () => {
 try {
 const response = await fetch(
 'https://fioconxhujqsiwkjymme.supabase.co/rest/v1/articles', {
 headers: {
 apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb2NvbnhodWpxc2l3a2p5bW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTk3NjcsImV4cCI6MjA2MzIzNTc2N30.2FuTk3izW5jrUr7Tvfszd6SkUitIkJ6tjKD6M2YXNGI',
 },
 });
 const data = await response.json();
 console.log(data);
 return data;
 } catch (error) {
 console.error('Fetch error:', error);
 }
};

const createNewArticle = async (title) => {
 try {
 const response = await fetch('https://fioconxhujqsiwkjymme.supabase.co/rest/v1/articles', {
 method: 'POST',
 headers: {
 apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb2NvbnhodWpxc2l3a2p5bW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTk3NjcsImV4cCI6MjA2MzIzNTc2N30.2FuTk3izW5jrUr7Tvfszd6SkUitIkJ6tjKD6M2YXNGI',
 'Content-Type' : 'application/json' ,
 },
 body: JSON.stringify({ title }),
 });

 if (response.status !== 201) {
 throw new Error(`Status: ${response.status}`);
 }
 } catch (error) {
 console.error('Fetch error:' , error);
 }
};
