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
      </label>
      <br /><br />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
}
