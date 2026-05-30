import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '../components/layouts';
import { HeroesFinder, HeroesList } from '../components/heroes';
import * as HeroesService from '../services/heroes-service';

function HeroesPage() {
  const [heroes, setHeroes] = useState([]);
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') ?? '';

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const heroes = await HeroesService.listHeroes({ name });
        setHeroes(heroes);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHeroes();
  }, [name]);

  return (
    <PageLayout jumbotron={{ title: 'Heroes', subtitle: 'Busca tu heroe favorito' }}>
      <HeroesFinder />
      <HeroesList heroes={heroes} />
    </PageLayout>
  );
}

export default HeroesPage;