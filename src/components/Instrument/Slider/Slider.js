import React, { Component } from 'react';
import RangeSlider from './Rangeslider';
import './Slider.scss';
import './Rangeslider/index.css';

class Slider extends Component {
    render() {
        return (
            <div className="slider-vertical">
                <RangeSlider
                    min={-1}
                    max={88}
                    tooltip={false}
                    value={this.props.value || -1}
                    handleLabel={(this.props.value || -1) + ''}
                    orientation="vertical"
                />
            </div>
        );
    }
}

export default Slider;
