"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function DocDetail({ params }) {
  const { id } = params;
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/docs/${id}`);
      if (res.ok) {
        setDoc(await res.json());
      }
    }
    load();
  }, [id]);

  if (!doc) {
    return (
      <main className="flex min-h-screen flex-col bg-[#121212] text-white">
        <Navbar />
        <div className="container mt-24 mx-auto p-4">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#121212] text-white">
      <Navbar />
      <div className="container mt-24 mx-auto p-4">
        <h1 className="text-3xl mb-4">{doc.title}</h1>
        <small className="text-gray-400">{doc.date}</small>
        <div
          className="prose prose-invert mt-6"
          dangerouslySetInnerHTML={{ __html: doc.content }}
        />
      </div>
    </main>
  );
}
