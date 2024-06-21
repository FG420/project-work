import dynamic from 'next/dynamic';

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ElementType;
  pageProps: any;
}) {
  const Login = dynamic(() => import('./page'), {
    ssr: false,
  });

  return <Login />;
}
