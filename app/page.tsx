import dynamic from 'next/dynamic';

const Home = dynamic(() => import('./(blog)/components/home'), {
  ssr: false,
});

export default function Page() {
  return <Home />;
}
