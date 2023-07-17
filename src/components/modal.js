import styles from '@/styles/modal.module.css';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

/**
 * @name Modal - generic modal component that displays a message to the user
 * @param {boolean} open - toggles the state of the modal
 * @param {string} title - The title displayed at the top of the modal
 * @param {function} onClose - callback function to toggle the modal to close
 * @param {React.reactNode} children - the content elements we want the modal to display
 * @returns {JSX.Element} - full screen modal
 */
export default function Modal({ open, title, onClose, children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = e => {
    e.preventDefault();
    onClose();
  };

  const modalContent = open ? (
    <div className={styles.root}>
      <div className={styles.content}>
        {title ? <div className={styles.title}>{title}</div> : null}
        <div className={styles.children}>{children}</div>
        <button className={styles.close} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  ) : null;

  // createPortal allows the modal to render outside of root DOM node in a Next.js app.
  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
}
