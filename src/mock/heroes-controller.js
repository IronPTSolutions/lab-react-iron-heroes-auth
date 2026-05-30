import { http, HttpResponse } from 'msw';
import { baseMockDomain } from './config';
import heroes from './heroes.json';

// GET /heroes?name= -> list with case-insensitive contains filter
export const handleListHeroes = http.get(`${baseMockDomain}/heroes`, ({ request }) => {
  const url = new URL(request.url);
  const name = (url.searchParams.get('name') ?? '').toLowerCase().trim();

  const result = name
    ? heroes.filter(
        (hero) =>
          hero.name.toLowerCase().includes(name) ||
          hero.alias.toLowerCase().includes(name)
      )
    : heroes;

  return HttpResponse.json(result, { status: 200 });
});

// GET /heroes/:id -> single hero or 404
export const handleGetHero = http.get(`${baseMockDomain}/heroes/:id`, ({ params }) => {
  const hero = heroes.find((hero) => hero.id === params.id);

  if (!hero) {
    return HttpResponse.json({ message: 'Hero not found' }, { status: 404 });
  }

  return HttpResponse.json(hero, { status: 200 });
});
