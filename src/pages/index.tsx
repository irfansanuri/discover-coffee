import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import Banner from '@/components/Banner'

const inter = Inter({ subsets: ['latin'] })

const Home = ()=>{
  function handleOnBannerBtnClick(){
    console.log("CLICK!")
  }

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Discover your local coffee shops!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner handleOnClick={handleOnBannerBtnClick} buttonText='View shops nearby'/>
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="hero image"
          />
        </div>

      </main>
    </>
  )
}

export default Home;