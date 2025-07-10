import '@/styles/globals.css'; // ou './styles/globals.css' se for relativo

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
