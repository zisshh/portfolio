"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DocsPage() {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');

  const fetchDocs = async () => {
    const res = await fetch('/api/docs');
    if (res.ok) {
      setDocs(await res.json());
    }
  };

  useEffect(() => {
    fetchDocs();
    const id = setInterval(fetchDocs, 5000);
    return () => clearInterval(id);
  }, []);

  // Auth button (from enhance-portfolio-website-features)
  const authenticate = async () => {
    const pw = prompt('Enter edit password');
    if (!pw) return;
    const auth = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    if (!auth.ok) {
      alert('Wrong password');
      return;
    }
    setIsAuth(true);
    setPassword(pw);
  };

  // Unified handleEdit logic (prompt if not authed, otherwise use password)
  const handleEdit = async (id) => {
    const idx = docs.findIndex(d => d.id === id);
    const current = docs[idx];
    if (!isAuth) {
      await authenticate();
      if (!isAuth) return;
    }
    const newContent = prompt('Edit content', current.content);
    if (newContent == null) return;
    const date = new Date().toISOString().split('T')[0];
    const res = await fetch(`/api/docs/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, content: newContent, title: current.title, date })
    });
    if (res.ok) {
      fetchDocs();
    } else {
      alert('Failed to save');
    }
  };

  const filtered = docs.filter(d => d.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl mb-4">Documentation</h1>
      {/* Auth button visible only when NOT authed */}
      {!isAuth && (
        <button
          className="mb-4 px-3 py-1 bg-blue-600 rounded"
          onClick={authenticate}
        >
          Authenticate
        </button>
      )}
      <input
        className="mb-4 p-2 w-full text-black"
        placeholder="Search docs"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="space-y-6">
        {filtered.map(doc => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 border border-gray-700 rounded"
          >
            <h2 className="text-xl font-bold">{doc.title}</h2>
            <small className="text-gray-400">{doc.date}</small>
            <p className="my-2 whitespace-pre-wrap">{doc.content}</p>
            {/* Show Edit button only if authed */}
            {isAuth && (
              <button
                className="mt-2 px-3 py-1 bg-blue-600 rounded"
                onClick={() => handleEdit(doc.id)}
              >
                Edit
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}