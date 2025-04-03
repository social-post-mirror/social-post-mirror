import { useState } from 'react';

export default function Submit() {
  const [screenshot, setScreenshot] = useState(null);
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!screenshot || !category) {
      alert('Please select a screenshot and a category before submitting.');
      return;
    }

    setUploading(true);

    try {
      const file = screenshot;
      const filename = file.name;
      const type = file.type;

      const res = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, type })
      });

      const { url } = await res.json();

      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': type },
        body: file
      });

      const submitRes = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, category })
      });

      if (submitRes.ok) {
        setSubmitted(true);
      } else {
        alert('Upload failed. Try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center font-serif text-lg text-black">
        <p>🪞 Thank you. Your post has been submitted to the mirror.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 border border-black bg-white text-black font-serif space-y-6"
    >
      <div>
        <label className="block mb-2 text-lg font-semibold uppercase">
          Screenshot:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full border border-black p-2 bg-white"
        />
        <p className="mt-2 text-sm">
          <a
            href="/screenshot-help"
            className="underline text-blue-700 hover:text-black"
          >
            How to take a screenshot
          </a>
        </p>
      </div>

      <div>
        <label className="block mb-2 text-lg font-semibold uppercase">
          Select Category:
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border border-black p-2 bg-white"
        >
          <option value="">--Choose a category--</option>
          <option value="Contradiction Exposed">Contradiction Exposed</option>
          <option value="Hypocrisy Revealed">Hypocrisy Revealed</option>
          <option value="Cultural Snapshot">Cultural Snapshot</option>
          <option value="Unexpected Honesty">Unexpected Honesty</option>
          <option value="Unintended Irony">Unintended Irony</option>
          <option value="Public Accountability">Public Accountability</option>
          <option value="Beautiful or Poetic">Beautiful or Poetic</option>
          <option value="Too Absurd to Ignore">Too Absurd to Ignore</option>
          <option value="Historically Relevant">Historically Relevant</option>
          <option value="Deleted but Documented">Deleted but Documented</option>
        </select>
      </div>

      <div className="text-right">
        <button
          type="submit"
          disabled={uploading}
          className="border border-black bg-black text-white px-6 py-2 uppercase text-sm tracking-wide hover:bg-white hover:text-black transition"
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
