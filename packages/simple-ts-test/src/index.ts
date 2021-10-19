export interface Character {
	name: string;
	power: string;
	universe?: string;
}

export const spiderman: Character = {
	name: 'spiderman',
	power: 'spins a web like a spider can',
	universe: 'marvel',
};

export const nhs: Character = {
	name: 'NHS',
	power: 'caring for and healing others',
};

export const superman: Character = {
	name: 'superman',
	power: 'strength',
	universe: 'dc',
};

export const batman: Character = {
	name: 'batman',
	power: 'gadgets',
	universe: 'dc',
};
