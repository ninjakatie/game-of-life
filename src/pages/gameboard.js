import styles from '@/styles/gameboard.module.css';
import Head from 'next/head';
import BoardFields from '@/components/boardFields';
import { useState } from 'react';
import BoardGrid from '@/components/boardGrid';

export default function Gameboard() {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  return (
    <>
      <Head>
        <title>Board Game</title>
      </Head>
      <div className={styles.root}>
        <h1 className={styles.header}>Welcome to the Game of Life</h1>

        {height !== null && width !== null ? (
          <BoardGrid
            height={height}
            width={width}
            setHeight={setHeight}
            setWidth={setWidth}
          />
        ) : (
          <BoardFields setHeight={setHeight} setWidth={setWidth} />
        )}
      </div>
      <div id='modal-root'></div>
    </>
  );
}
