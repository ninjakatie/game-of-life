import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Conway`&lsquo;`s Game of Life</title>
        <meta name='description' content="Conway's Game of Life" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Link href='/gameboard'>
          <button>Enter Game</button>
        </Link>
      </main>
    </>
  );
}
