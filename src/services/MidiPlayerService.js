import Instruments from './Instruments.json';

class MidiPlayerService {
	globalLoop = null;
	serverUrl = 'http://ec2-18-191-23-1.us-east-2.compute.amazonaws.com:5000';
	family_numbers = {};

	constructor() {

		this.family_numbers = {
			'drums': 118,
			'piano': 0,
			'guitar': 25
		};
	}

	async fetchParts() {
		try {
			const res = await fetch(`${this.serverUrl}/part`);
			const parts = await res.json();

			this.globalLoop = this.convertPartsToLoop(parts);
			return parts;
		} catch (e) {
			console.log(e);
		}
	}

	async fetchInstruments() {
		return await new Promise((resolve) => {
			resolve(Instruments);
		});
	}

	convertPartsToLoop(parts) {
		if (parts && parts !== '') {
			const loop = {
				bpm: 120,
				notes_per_measure: 16,
				parts: []
			};

			Object.keys(parts)
				.filter(part_key => parts[part_key] != null)
				.map(part_key => {
					let part = parts[part_key];
					part.velocity = 127;
					return loop.parts.push(part);
				});
			
			return loop;
		}
	}

	getMockLoop() {
		return {
			bpm: 60,
			notes_per_measure: 16,
			parts: [
				{
					instrument: 'rock_organ',
					notes: [85, null, 2, 68,
						8, 66, 6, 75,
						10, null, null, 3,
						80, 7, 69, 45],
					velocity: 20,
				},
				{
					instrument: 'acoustic_guitar_steel',
					notes: [null, 17, 31, 52,
						45, 5, 74, 56,
						4, 28, null, null,
						83, 57, 67, null],
					velocity: 127,
				},
				{
					instrument: 'drums',
					notes: [32, 50, null, null,
						41, 36, null, 78,
						61, null, 54, 18,
						null, 43, 14, null],
					velocity: 127,
				},]
		};
	}

	normalizeInstrumentName(instrument_name) {
		return instrument_name.toLowerCase()
			.replace(new RegExp(' ', 'g'), '_')
			.replace('(', '')
			.replace(')', '');
	}

}

export default MidiPlayerService;
