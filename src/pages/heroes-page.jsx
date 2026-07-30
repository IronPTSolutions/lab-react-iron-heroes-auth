import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '../components/layouts';
import { HeroesFinder, HeroesList } from '../components/heroes';
import { listHeroes } from '../services/heroes-service';

function HeroesPage() {
  const [heroes, setHeroes] = useState([]);
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';

  useEffect(() => {
    listHeroes({ name }).then(setHeroes);
  }, [name]);

  return (
    <PageLayout jumbotron={{ title: 'Heroes', subtitle: 'Busca tu heroe favorito' }}>
      <HeroesFinder />
      <HeroesList heroes={heroes} />
    </PageLayout>
  );
}

export default HeroesPage;
