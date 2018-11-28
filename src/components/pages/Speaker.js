import React from 'react';
import MidiPlayerService from '../../services/MidiPlayerService';
import Instrument from "../Instrument/Instrument";

const midiPlayerService = new MidiPlayerService();
class SpeakerPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			parts: {}
		};
	}

	async loadParts() {
        const parts = await midiPlayerService.fetchParts();

        this.setState({
            parts: parts
        });
    }

	async componentDidMount() {
		try {
            await midiPlayerService.fetchInstruments();
            await this.startFetchTimmer();
            
            await midiPlayerService.loadMidiPluginAndPlay().then((status) => {
                if(status) {
                    midiPlayerService.startPlaying();
                }
            }).catch(err => console.log('Faild to Start play', err));
            
			
		} catch (err) {
			console.log('Faild to load assets errr', err);
		}
    }
    
    async startFetchTimmer() {
        try {
            await this.loadParts();
            setInterval(async () => {
                await this.loadParts();
              }, 1000);

			
		} catch (err) {
			console.log('errr', err);
		}
    }

    deleteAllPlayers() {
        midiPlayerService.deleteAllParts();
    }

    renderParts() {
	    return Object.keys(this.state.parts)
            .filter(id => !!this.state.parts[id])
            .map(id => this.state.parts[id])
            .map((part, i) => (<div key={i} style={{display: 'flex', alignItems: 'center'}}>
                <div style={{marginRight: '10px', textAlign: 'center'}}>
                    <div>{part.name}</div>
                    <div style={{fontStyle: 'italic'}}>{part.instrument}</div>
                </div>
                <Instrument
                            instrument={part.instrument}
                            notes={part.notes}/>
            </div>));
    }

	render() {
	    console.log('parts', this.state.parts);
		return (<div>
            <button type="button" onClick={this.deleteAllPlayers.bind(this)}>Delete All Players</button>
            {this.renderParts()}
        </div>);
	}
}

export { SpeakerPage };
