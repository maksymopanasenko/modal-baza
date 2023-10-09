import { useState } from 'react';
import { createPortal } from 'react-dom';
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  function shareOnFacebook(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }

  function shareOnTelefram(url) {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`, '_blank');
  }
  function shareOnGmail(url) {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check%20out%20this%20link!&body=Hey,%20I%20found%20this%20interesting%20link:%20' + encodeURIComponent(url), '_blank');
  }
  function shareOnViber(url) {
    window.open("viber://forward?text=" + encodeURIComponent(url), '_blank');
  }

  const currentUrl = "https://chat.openai.com";
  // const currentUrl = window.location.href;

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
            <p onClick={() => shareOnViber(currentUrl)}>Some link VB</p>
            <p onClick={() => shareOnGmail(currentUrl)}>Some link GM</p>
            <p onClick={() => shareOnFacebook(currentUrl)}>Some link FB</p>
            <p onClick={() => shareOnTelefram(currentUrl)}>Some link TG</p>
            <p onClick={copyToClipboard}>Скопіювати посилання</p>
            {isCopied && <p>Link copied to clipboard!</p>}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default App
