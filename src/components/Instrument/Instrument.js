import React, { Component } from 'react';
import Slider from './Slider/Slider';
import './Instrument.scss';

export class Instrument extends Component {

    renderSliders() {
        return this.props.notes.map((note, i) => (
            <div key={i} className="Instrument__slider">
                <Slider index={i} value={note} />
            </div>
        ));
    }

    render() {
        return (
            <div className="Instrument__container">
                {/* <h2>Instrument: {this.state.instrument}</h2> */}
                <div className="Instrument__sliders-container">{this.renderSliders()}</div>
            </div>
        );
    }
}

export default Instrument;
