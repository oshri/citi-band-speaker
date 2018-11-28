// IMPORT PACKAGE REFERENCES

import React, {Component} from 'react';
// import { NavLink } from 'react-router-dom';
import Highcharts from 'highcharts';
import citiBandLogo from '../../images/citiBandLogo.png';

const chart = {
    type: 'solidgauge',
    width: 120,
    height: 160,
    spacingTop: 0,
    marginBottom: '50'
};
const title = {
    floating: true,
    align: 'center',
    x: 0,
    verticalAlign: 'bottom',
    y: -20,
    style: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#434345'
    }
};
const pane = {
    startAngle: 0,
    endAngle: 360,
    background: [
      {
        outerRadius: '105%',
        innerRadius: '100%',
        backgroundColor: Highcharts.Color('#EBEBEB')
          .setOpacity(1)
          .get(),
        borderWidth: 0
      }
    ]
};
const yAxis = {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: []
};
const plotOptions = {
    solidgauge: {
      borderWidth: '4px',
      dataLabels: {
        enabled: true,
        y: -25,
        borderWidth: 0,
        backgroundColor: 'none',
        useHTML: true,
        shadow: false,
        style: {
          fontSize: '10px'
        }
      },
      linecap: 'round',
      stickyTracking: true,
      rounded: true
    }
};

export class Header extends Component {
    constructor(props) {
        super(props);
        this.initCharts();
    }

    initCharts = () => {
        this.gaugeChartObj1 = new Highcharts.Chart("container1", {
            credits: false,
            chart: {...chart},
            title: {
              ...title,
              text: "BPM"
            },
            exporting: {
              enabled: false
            },
            tooltip: {
              enabled: false
            },
            pane: {...pane},
            yAxis: {...yAxis},
            plotOptions: {
              solidgauge: {
                  ...plotOptions.solidgauge,
                  dataLabels: {
                    ...plotOptions.solidgauge.dataLabels,
                    formatter: function() {
                        return (
                          '<div style="width:100%;text-align:center; color:#434345;"><span style="font-family:Montserrat;font-size:32px;font-weight:bold;">' +
                          this.y +
                          "</span>"
                        );
                    }
                  }
              }
            },
            series: [
              {
                borderColor: "#FE6869",
                data: [
                  {
                    radius: "100%",
                    innerRadius: "100%",
                    y: 120
                  }
                ]
              }
            ]
        });
        this.gaugeChartObj2 = new Highcharts.Chart("container2", {
        credits: false,
        chart: {
            ...chart
        },
        title: {
            ...title,
            text: "Signature"
        },
        exporting: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        pane: {...pane},
        yAxis: {...yAxis},
        plotOptions: {
            solidgauge: {
            ...plotOptions.solidgauge,
                dataLabels: {
                    ...plotOptions.solidgauge.dataLabels,
                    formatter: function() {
                        return (
                            '<div style="width:100%;text-align:center; color:#434345;"><span style="font-family:Montserrat;font-size:32px;font-weight:bold;">' +
                            this.y/100 + '/' + this.y/100 +
                            "</span>"
                        );
                    }
                }
            }
        },
        series: [
            {
            borderColor: "#FFEB3B",
            data: [
                {
                radius: "100%",
                innerRadius: "100%",
                y: 4 * 100
                }
            ]
            }
        ]
        });
        this.gaugeChartObj3 = new Highcharts.Chart("container3", {
        credits: false,
        chart: {
            ...chart    
        },
        title: {
            text: "Bar",
            ...title,
        },
        exporting: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        pane: {...pane},
        yAxis: {...yAxis},
        plotOptions: {
            solidgauge: {
            ...plotOptions.solidgauge,
            dataLabels: {
                ...plotOptions.solidgauge.dataLabels,
                formatter: function() {
                    return (
                        '<div style="width:100%;text-align:center; color:#434345;"><span style="font-family:Montserrat;font-size:32px;font-weight:bold;">' +
                        this.y / 6.25+
                        "</span>"
                    );
                }
            }
            }
        },
        series: [
            {
            borderColor: "#86ADDB",
            data: [
                {
                radius: "100%",
                innerRadius: "100%",
                y: 15 * 6.25 
                }
            ]
            }
        ]
        });
    };

    render() {
        return (
            <div>
                <div className="header">
                    <div className="logo">
                        Header <img className='m-3' height='72' src={citiBandLogo} alt='Citi Band Logo' />
                    </div>  
                    <div className="stats">
                        <div id="container1" className='container-size'>
                        </div>
                        <div id="container2" className='container-size'>
                        </div>
                        <div id="container3" className='container-size'>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
