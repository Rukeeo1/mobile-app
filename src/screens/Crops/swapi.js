const SWAPI_API = 'https://swapi.dev/api/films/';

export class Movie {
    constructor({ title, episode_id, director, opening_crawl }) {
        this.title = title;
        this.director = director;
        this.id = episode_id;
        this.openingCrawl = opening_crawl;
    }

    compareTitle(title) {
        return this.title.toLowerCase() === title.toLowerCase().trim();
    }

    get episode() {
        return (
            ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][this.id] ||
            this.id.toString()
        );
    }
}

export class Movies extends Array {
    query(query) {
        if (!this.length || query === '') {
            return [];
        }

        const regex = new RegExp(`${query.trim()}`, 'i');
        return new Movies(
            ...this.filter((movie) => movie.title.search(regex) >= 0)
        );
    }
}

export const SWAPI = {
    async fetchMovies() {
        const { results } = await fetch(SWAPI_API).then((res) => res.json());
        return new Movies(...results.map((movie) => new Movie(movie)));
    },
};
