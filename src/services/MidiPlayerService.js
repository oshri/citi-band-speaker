import Instruments from './Instruments.json';

class MidiPlayerService {
	globalLoop = null;
	serverUrl = 'http://ec2-18-191-23-1.us-east-2.compute.amazonaws.com:5000';
	family_numbers = {};
	instrument_numbers = [];
	instruments = [];

	constructor() {
		this.family_numbers = {
			drums: 118,
			piano: 0,
			guitar: 25
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
			console.log('Fetch Instrument Success');
			this.instruments = Instruments;
			this.initializeInstrumentNumbers();
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
				.filter((part_key) => parts[part_key] != null)
				.map((part_key) => {
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
					notes: [
						85,
						null,
						2,
						68,
						8,
						66,
						6,
						75,
						10,
						null,
						null,
						3,
						80,
						7,
						69,
						45
					],
					velocity: 20
				},
				{
					instrument: 'acoustic_guitar_steel',
					notes: [
						null,
						17,
						31,
						52,
						45,
						5,
						74,
						56,
						4,
						28,
						null,
						null,
						83,
						57,
						67,
						null
					],
					velocity: 127
				},
				{
					instrument: 'drums',
					notes: [
						32,
						50,
						null,
						null,
						41,
						36,
						null,
						78,
						61,
						null,
						54,
						18,
						null,
						43,
						14,
						null
					],
					velocity: 127
				}
			]
		};
	}

	normalizeInstrumentName(instrument_name) {
		return instrument_name
			.toLowerCase()
			.replace(new RegExp(' ', 'g'), '_')
			.replace('(', '')
			.replace(')', '');
	}

	initializeInstrumentNumbers() {
		this.instrument_numbers = this.instruments.reduce((map, obj) => {
			map[this.normalizeInstrumentName(obj[2])] = obj[1];
			return map;
		}, {});
	}

	getInstrumentNumberByName(instrument_name) {
		return this.instrument_numbers[instrument_name] || this.family_numbers[instrument_name];
	}

	playBar() {
		const loop = this.getMockLoop();

		let parts = loop.parts;
		let bar_duration_sec = loop.notes_per_measure / 4 * (60 / loop.bpm);

		for (var part = 0; part < parts.length; part++) {
			let instrumentNumber = this.getInstrumentNumberByName(parts[part].instrument);
			
			MIDI.programChange(part, instrumentNumber);
			
			for (var i = 0; i < parts[part].notes.length; i++) {
				let bar_fraction = i / loop.notes_per_measure;
				
				if (parts[part].notes[i]) {
					
					MIDI.chordOn(
						part,
						[ parts[part].notes[i] ],
						parts[part].velocity,
						MIDI.getContext().currentTime +
							bar_fraction * bar_duration_sec
					);
				}
			}
		}
	}
	

	startPlaying() {
		console.log('start playing');

		const loop = this.getMockLoop();
		const bar = 0;
		let bar_duration_ms =
			1000 * (loop.notes_per_measure / 4) * (60 / loop.bpm);

		setInterval(() => this.playBar(bar), bar_duration_ms);
	}

	async loadMidiPluginAndPlay() {
		return await new Promise((resolve) => {
			window.MIDI.loadPlugin({
				soundfontUrl:
					'http://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/',
				// soundfontUrl: "./soundfont/",
				instruments: [
					'rock_organ',
					'acoustic_guitar_steel',
					'synth_drum'
				],
				onprogress: (state, progress) => {
					console.log(state, progress);
				},
				onsuccess: () => {
					console.log('Load MIDI pluginsSuccess');
					resolve({ load: true });
				}
			});
		});
	}
}

export default MidiPlayerService;
