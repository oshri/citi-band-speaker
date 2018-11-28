// IMPORT PACKAGE REFERENCES

import React, {Component} from 'react';
// import { NavLink } from 'react-router-dom';
const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts');
require("highcharts/js/highcharts-more")(ReactHighcharts.Highcharts);
require("highcharts/js/modules/solid-gauge.js")(ReactHighcharts.Highcharts);
import citiBandLogo from '../../images/citiBandLogo.png';

const styles = {
    header: {
        display: 'inline-flex',
        width: '100%',
        justifyContent: 'space-between'
    },

    containerSize: {
        width: 120,
        height:160,
        float:'left'
    },
        
    card: {
        display: 'inline-flex',
        flexDirection: 'row',
        width: 402,
        boxSizing: 'border-box',
    }
};

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
        backgroundColor: Highcharts.Color('#aaa')
          .setOpacity(1)
          .get(),
        borderWidth: 4
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
        this.gaugeChartConfig = {
            credits: false,
            chart: {...chart, renderTo: 'container1'},
            title: {
              ...title,
              text: ""
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
                  borderWidth: "4px",
                  dataLabels: {
                    enabled: true,
                    y: -25,
                    borderWidth: 0,
                    backgroundColor: "none",
                    useHTML: true,
                    shadow: false,
                    style: {
                      fontSize: "10px"
                    },
                    formatter: function() {
                      return (
                        '<div style="width:100%;text-align:center; color:#434345;"><span style="font-family:Montserrat;font-size:28px;font-weight:bold;">' +
                        this.y +
                        "</span><div>BPM</div></div>"
                      );
                    }
                  },
                  linecap: "round",
                  stickyTracking: true,
                  rounded: true
                }
            },
            series: [
            {
                borderColor: "#FE6869",
                data: [
                {
                    radius: "100%",
                    innerRadius: "90%",
                    y: 120
                }
                ]
            }
              ]
           };
        this.gaugeChartConfig2 = {
        credits: false,
        chart: {
            ...chart
        },
        title: {
            ...title,
            text: ""
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
                            '<div style="width:100%;text-align:center; color:#434345;"><span style="font-family:Montserrat;font-size:28px;font-weight:bold;">' +
                            this.y/100 + '/' + this.y/100 +
                            "</span><div>Signature</div></div>"
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
                innerRadius: "90%",
                y: 4 * 100
                }
            ]
            }
        ]
        };
        this.gaugeChartConfig3 = {
        credits: false,
        chart: {
            ...chart    
        },
        title: {
            text: "",
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
                        '<div style="width:100%;text-align:center; color:#434345;"><span style="font-family:Montserrat;font-size:28px;font-weight:bold;">' +
                        this.y / 6.25+
                        "</span><div>Bars</div></div>"
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
                        innerRadius: "90%",
                        y: 15 * 6.25 
                    }
                ]
            }
        ]
        };
    };

    render() {
        return (
            <div>
                <div style={styles.header}>
                    <div className="logo">
                        <img className='m-3' height='72' src={citiBandLogo} alt='Citi Band Logo' />
                    </div>  
                    
                    <div style={styles.card}>
                        <div style={styles.containerSize}><ReactHighcharts config = {this.gaugeChartConfig}></ReactHighcharts></div>
                        <div style={styles.containerSize}><ReactHighcharts config = {this.gaugeChartConfig2}></ReactHighcharts></div>
                        <div style={styles.containerSize}><ReactHighcharts config = {this.gaugeChartConfig3}></ReactHighcharts></div>
                    </div>
                </div>
            </div>
        );
    }
}
