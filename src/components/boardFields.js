import styles from '@/styles/boardFields.module.css';
import { useState } from 'react';
import Modal from '@/components/modal';

/**
 * @name validateFormFields - validation function that ensures only numeric values between 5 and 99 are passed in.
 * @param {number} field - form input field value
 * @returns {boolean}
 */
const validateFormField = field => {
  if (typeof field !== 'number') {
    return false;
  }

  if (field < 5 || field > 99) {
    return false;
  }

  return true;
};

/**
 * @name BoardFields - lets the user set the height and width of the game board
 * @param {function} setHeight - callback funnction to set the height of the board
 * @param {function} setWidth - callback function to set the width of the board
 * @returns {JSX.Element}
 */
export default function BoardFields({ setHeight, setWidth }) {
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    const rows = e.target.rows?.value;
    const cols = e.target.cols?.value;

    // check for whole numbers
    const validHeight = validateFormField(parseInt(rows, 10));
    const validWidth = validateFormField(parseInt(cols, 10));

    if (validHeight && validWidth) {
      setHeight(rows);
      setWidth(cols);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <div className={styles.root}>
      <div>Select a board size to start the game:</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor='cols'>Columns</label>
          <input
            className={styles.input}
            id='cols'
            type='number'
            step='1'
            required
          />
          <label htmlFor='rows'>Rows</label>
          <input
            className={styles.input}
            id='rows'
            type='number'
            step='1'
            required
          />
        </div>
        <button className={styles.start} type='submit'>
          Start
        </button>
      </form>
      <Modal
        open={openModal}
        title='Invalid Value'
        onClose={() => setOpenModal(false)}
      >
        <p>Please select a number between 5 and 99 for rows and columns.</p>
      </Modal>
    </div>
  );
}
