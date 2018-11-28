import React, { Component } from 'react';
import RangeSlider from './Rangeslider';
import './Slider.scss';
import './Rangeslider/index.css';
import * as debounce from 'lodash.debounce';

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || -1,
            index: this.props.index
        };
    }

    handleChange(value) {
        this.setState({
            value: value
        });
    }

    render() {
        return (
            <div className="slider-vertical">
                <RangeSlider
                    min={-1}
                    max={88}
                    tooltip={false}
                    value={this.state.value}
                    handleLabel={this.state.value + ''}
                    orientation="vertical"
                />
            </div>
        );
    }
}

export default Slider;
