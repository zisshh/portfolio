let isAuthenticated = false;
let authPassword = "";

async function fetchDocs() {
  const res = await fetch('/api/docs');
  const docs = await res.json();
  const list = document.getElementById('docs-list');
  list.innerHTML = '';
  docs.forEach(doc => {
    const wrapper = document.createElement('div');
    wrapper.className = 'doc fade';
    wrapper.setAttribute('data-id', doc.id);
    wrapper.innerHTML = `
      <h3>${doc.title}</h3>
      <small>${doc.date}</small>
      <div class="content">${doc.content}</div>
      <button class="edit-btn">Edit</button>
    `;
    list.appendChild(wrapper);
  });
  attachDocEvents();
  observeFades();
}

function observeFades() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'home') {
          const fills = document.querySelectorAll('.fill');
          fills.forEach((el, idx) => {
            const widths = ['90%', '80%', '70%'];
            el.style.width = widths[idx] || '60%';
          });
        }
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade').forEach(el => observer.observe(el));
}

function attachDocEvents() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    if (isAuthenticated) btn.style.display = 'block';
    btn.addEventListener('click', async (e) => {
      const docEl = e.target.closest('.doc');
      const id = docEl.dataset.id;
      if (!isAuthenticated) {
        const password = prompt('Enter edit password');
        if (!password) return;
        const authRes = await fetch('/api/auth', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ password })
        });
        if (authRes.ok) {
          isAuthenticated = true;
          authPassword = password;
          document.querySelectorAll('.edit-btn').forEach(b => b.style.display = 'block');
        } else {
          alert('Wrong password');
          return;
        }
      }
      if (!docEl.classList.contains('editing')) {
        const contentDiv = docEl.querySelector('.content');
        const text = contentDiv.innerText;
        contentDiv.innerHTML = `<textarea>${text}</textarea>`;
        e.target.textContent = 'Save';
        docEl.classList.add('editing');
      } else {
        const text = docEl.querySelector('textarea').value;
        const title = docEl.querySelector('h3').innerText;
        const date = new Date().toISOString().split('T')[0];
        const saveRes = await fetch(`/api/docs/${id}`, {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ password: authPassword, content: text, title, date })
        });
        if (saveRes.ok) {
          docEl.querySelector('.content').innerHTML = text;
          docEl.querySelector('small').innerText = date;
          e.target.textContent = 'Edit';
          docEl.classList.remove('editing');
        } else {
          alert('Failed to save');
        }
      }
    });
  });
}

document.getElementById('search').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#docs-list .doc').forEach(doc => {
    const title = doc.querySelector('h3').innerText.toLowerCase();
    doc.style.display = title.includes(term) ? 'block' : 'none';
  });
});

window.addEventListener('DOMContentLoaded', () => {
  fetchDocs();
  observeFades();
});

setInterval(fetchDocs, 5000);
