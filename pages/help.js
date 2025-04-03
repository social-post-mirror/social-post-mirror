export default function Help() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Need help taking a screenshot?</h1>
      <p>Here are instructions for taking screenshots on common devices and platforms:</p>

      <h2>Mac</h2>
      <ul>
        <li><strong>Whole screen:</strong> Press <code>Command (⌘) + Shift + 3</code></li>
        <li><strong>Selected area:</strong> Press <code>Command (⌘) + Shift + 4</code></li>
        <li><strong>Window:</strong> Press <code>Command (⌘) + Shift + 4</code>, then <code>Spacebar</code></li>
      </ul>

      <h2>Windows</h2>
      <ul>
        <li><strong>Whole screen:</strong> Press <code>PrtScn</code> (copies to clipboard)</li>
        <li><strong>Active window:</strong> Press <code>Alt + PrtScn</code></li>
        <li><strong>Custom area:</strong> Press <code>Windows + Shift + S</code> to use Snip & Sketch</li>
      </ul>

      <h2>iPhone</h2>
      <ul>
        <li><strong>With Face ID:</strong> Press <code>Side Button + Volume Up</code></li>
        <li><strong>With Home Button:</strong> Press <code>Home Button + Side (or Top) Button</code></li>
      </ul>

      <h2>Android</h2>
      <ul>
        <li><strong>Most phones:</strong> Press <code>Power Button + Volume Down</code></li>
        <li><strong>Some models:</strong> Swipe with three fingers or use Assistant</li>
      </ul>

      <h2>Chrome Extensions (Desktop)</h2>
      <ul>
        <li>Use extensions like <strong>GoFullPage</strong> or <strong>Awesome Screenshot</strong></li>
      </ul>

      <p>
        Once you have your screenshot, head back to the <a href="/submit">submission page</a> to upload it.
      </p>
    </div>
  );
}
