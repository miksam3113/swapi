export type peopleProps = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: planetsProps['url'];
  films: filmsProps['url'][];
  species: speciesProps['url'][];
  vehicles: vehiclesProps['url'][];
  starships: starshipsProps['url'][];
  created: string;
  edited: string;
  url: string;
};

export type filmsProps = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: peopleProps['url'][];
  planets: planetsProps['url'][];
  starships: starshipsProps['url'][];
  vehicles: vehiclesProps['url'][];
  species: speciesProps['url'][];
  created: string;
  edited: string;
  url: string;
};

export type starshipsProps = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: peopleProps['url'][];
  films: filmsProps['url'][];
  created: string;
  edited: string;
  url: string;
};

export type vehiclesProps = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: peopleProps['url'][];
  films: filmsProps['url'][];
  created: string;
  edited: string;
  url: string;
};

export type speciesProps = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: planetsProps['url'];
  language: string;
  people: peopleProps['url'][];
  films: filmsProps['url'][];
  created: string;
  edited: string;
  url: string;
};

export type planetsProps = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: peopleProps['url'][];
  films: filmsProps['url'][];
  created: string;
  edited: string;
  url: string;
};
