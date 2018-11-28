import React from 'react';
import MidiPlayerService from '../../services/MidiPlayerService';

const midiPlayerService = new MidiPlayerService();
class SpeakerPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			parts: []
		};
	}

	async componentDidMount() {
		try {
            await midiPlayerService.fetchInstruments();
            await this.startFetchTimmer();
			
		} catch (err) {
			console.log('Faild to load assets errr', err);
		}
    }
    
    async startFetchTimmer() {
        try {
            setInterval(async () => {
                const parts = await midiPlayerService.fetchParts();
                
                this.setState({
                    parts: parts
                });

              }, 10000);

			
		} catch (err) {
			console.log('errr', err);
		}
    }

	render() {
		return <div>Speaker Page</div>;
	}
}

export { SpeakerPage };
