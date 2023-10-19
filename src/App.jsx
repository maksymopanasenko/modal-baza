import { useState } from 'react';
import { createPortal } from 'react-dom';
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    if (isCopied) return;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);

    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };


  return (
    <div>
      {isOpen && createPortal(
        <div className='overlay'>
          <div className="modal">
            <div className='links'>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}>Facebook Link</a>
              <a href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`}>Telegram Link</a>
              <a href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}>WhatsApp Link</a>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Support%20out%20Armed%20Forces!&body=Hey,%20I%20found%20this%20interesting%20link:%20${encodeURIComponent(currentUrl)}`}>Gmail Link</a>
            </div>
            <button onClick={copyToClipboard}>Скопіювати посилання</button>
            {isCopied && <div>Link copied to clipboard!</div>}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default App
