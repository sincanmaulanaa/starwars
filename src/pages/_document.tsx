import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='Starwars pedia, here you can find information about the movies.'
        />
        <link rel='icon' href='/starwars.svg' />
        <title>Starwars Pedia</title>
      </Head>
      <body className='antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
