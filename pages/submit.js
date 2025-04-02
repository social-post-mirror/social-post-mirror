import { useState } from 'react';

const categories = [
  'Disinformation',
  'Hate Speech',
  'Harassment',
  'Spam or Scams',
  'Election Interference',
  'Public Misinformation',
  'Corporate Manipulation',
  'Violence or Threats',
  'Extremist Content',
  'Other'
];

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
      alert('Please select a screenshot and a category.');
      return;
    }

    setUploading(true);

    try {
      const file = screenshot;
      const filename = file.name;
      const type = file.type;

      // Step 1: Get a signed upload URL
      const res = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, type })
      });

      const { url } = await res.json();

      // Step 2: Upload to S3
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': type },
        body: file
      });

      // Step 3: Record metadata (optional)
      const submitRes = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, category })
      });

      if (submitRes.ok) {
        setSubmitted(true);
      } else {
        alert('Upload failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return <p>Thanks for your submission!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Screenshot:
        <input type="file" accept="image/*" onChange={handleFileChange} required />
      </label>
      <br /><br />
      <label>
        Select category:
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">--Choose a category--</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>
      <br /><br />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
}
