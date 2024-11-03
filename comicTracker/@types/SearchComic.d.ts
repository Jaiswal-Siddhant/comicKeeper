export interface SearchComicResponse {
	endDate?: string;
	members?: string;
	nbChapters?: string;
	score?: string;
	shortDescription?: string;
	startDate?: string;
	thumbnail?: string;
	title?: string;
	type?: Type;
	url?: string;
	video?: null;
	vols?: string;
}

export enum Type {
	Doujinshi = 'Doujinshi',
	LightNovel = 'Light Novel',
	Manga = 'Manga',
	Manhua = 'Manhua',
	Manhwa = 'Manhwa',
	OneShot = 'One-shot',
}
