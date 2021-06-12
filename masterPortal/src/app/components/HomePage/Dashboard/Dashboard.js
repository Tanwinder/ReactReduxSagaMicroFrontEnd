import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactSVG from 'react-svg';
import {Alert, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import {selectDay, togglePOTrendType, toggleAllocTrendType, toggleUserLoadType} from "../../../actions/IMSDashboard-action";
import './Dashboard.scss';
import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";
import Select from "react-virtualized-select";
import RGL, { WidthProvider } from "react-grid-layout";
import { PulseLoader } from 'halogenium';
import { ThemeProvider } from "theming";
const ReactGridLayout = WidthProvider(RGL);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: [
                {"i": "aaa", "x": 0, "y": 0, "w": 4, "h": 1, "minW": 4, "minH": 1},
                {"i": "bbb", "x": 4, "y": 0, "w": 4, "h": 1, "minW": 4, "minH": 1},
                {"i": "ccc", "x": 8, "y": 0, "w": 4, "h": 1, "minW": 4, "minH": 1},
                {"i": "eee", "x": 0, "y": 1, "w": 6, "h": 3, "minW": 6, "minH": 3},
                {"i": "fff", "x": 6, "y": 1, "w": 6, "h": 3, "minW": 6, "minH": 3},
                {"i": "ggg", "x": 0, "y": 4, "w": 6, "h": 3, "minW": 6, "minH": 3},
                {"i": "hhh", "x": 6, "y": 4, "w": 6, "h": 3, "minW": 6, "minH": 3},
                {"i": "iii", "x": 0, "y": 7, "w": 12, "h": 3, "minW": 12, "minH": 3},
                {"i": "ddd", "x": 0, "y": 10, "w": 12, "h": 2, "minW": 12, "minH": 1}
            ]
        };
        this.gridLayoutRef = React.createRef();
    }

    getAvgProcurementLifecycle = () => {
        const {preferences} = this.props.homePage.userData;
        var option = {
            backgroundColor: (preferences.background_color === "dark" ? "#08263a" : "#FFF"),    
            title: {
                text: ''
            },
            tooltip: {
                show: false
            },
            grid: {
                left: '10px',
                top: '10px',
                right: '10px',
                bottom: '10px',
                containLabel: true
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    layout: 'none',
                    // symbolSize: [100, 100],
                    //roam: true,
                    
                    label: {
                        normal: {
                            show: true,
                        }
                    },
                    edgeSymbol: ['', ''],
                    //edgeSymbolSize: [1, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 10
                            }
                        }
                    },
                    data: [{
                        name: 'Order Creation',
                        x: 0,
                        y: 0,
                        symbolSize: 30,
                        itemStyle: {
                            normal: {
                                color: '#fa8072'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'bottom',
                                color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                            }
                        }
                    }, {
                        x: 0,
                        y: 0,
                        id: 'id1',
                        name: '',
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                color: 'green'
                            }
                        }
                    }, {
                        name: '61 d',
                        x: 10,
                        y: 0,
                        symbolSize: 100,
                        itemStyle: {
                            normal: {
                                color: '#fa8072'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                            }
                        }
                    }, {
                        name: 'DC Split',
                        x: 20,
                        y: 0,
                        symbolSize: 30,
                        itemStyle: {
                            normal: {
                                color: '#fa8072'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'bottom',
                                color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                            }
                        }
                    }, {
                        x: 20,
                        y: 0,
                        id: 'id2',
                        name: '',
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                color: 'green'
                            }
                        }
                    }, {
                        name: '23.3 d',
                        x: 30,
                        y: 0,
                        symbolSize: 100,
                        itemStyle: {
                            normal: {
                                color: '#fa8072'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                            }
                        }
                    }, {
                        name: 'Allocation',
                        x: 40,
                        y: 0,
                        symbolSize: 30,
                        itemStyle: {
                            normal: {
                                color: '#fa8072'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'bottom',
                                color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                            }
                        }
                    }, {
                        x: 40,
                        y: 0,
                        id: 'id3',
                        name: '',
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                color: 'green'
                            }
                        }
                    }, {
                        name: '14.5 d',
                        x: 50,
                        y: 0,
                        symbolSize: 100,
                        itemStyle: {
                            normal: {
                                color: '#fa8072'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                            }
                        }
                    }, {
                        name: 'Receipts',
                        x: 60,
                        y: 0,
                        symbolSize: 30,
                        itemStyle: {
                            normal: {
                                color: '#fa8072'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'bottom',
                                color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                            }
                        }
                    }, {
                        x: 60,
                        y: 0,
                        id: 'id5',
                        name: '',
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                color: 'green'
                            }
                        }
                    }],
                    // links: [],
                    links: [{
                        source: 'Order Creation',
                        target: '61 d'
                    }, {
                        source: '61 d',
                        target: 'DC Split'
                    }, {
                        source: 'DC Split',
                        target: '23.3 d'
                    },
                    {
                        source: '23.3 d',
                        target: 'Allocation'
                    }, {
                        source: 'Allocation',
                        target: '14.5 d'
                    }, {
                        source: '14.5 d',
                        target: 'Receipts'
                    }],
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 10,
                            curveness: 0
                        }
                    }
                }
            ]
        }; 

        return option;
    }

    getPOLineChartOptions = () => {
        const {preferences} = this.props.homePage.userData;
        const {POTrend, POYearTrend, POTrendType} = this.props;
        let xAxisData = [];
        let yAxisData = [];

        if (POTrendType === "Day"){
            xAxisData = POTrend.map(e => e.DATE_VALUE);
            yAxisData = POTrend.map(e => e.PO_COUNT);
        } else if (POTrendType === "Year"){
            xAxisData = POYearTrend.map(e => e.DATE_VALUE);
            yAxisData = POYearTrend.map(e => e.PO_COUNT);
        }
        
        var option = {
            backgroundColor: (preferences.background_color === "dark" ? "#08263a" : "#FFF"),
            tooltip: {},
            grid: {
                left: '0px',
                top: '10px',
                right: '0px',
                bottom: '10px',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e"),
                        margin: 15,
                    },
                },
                axisTick: {
                    show: false,
                },
                data: xAxisData,
            }],
            yAxis: [{
                type: 'value',
                min: 0,
                // max: 140,
                splitNumber: 7,
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#6f7985'
                    }
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e"),
        
                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [{
                name: '',
                type: 'line',
                // smooth: true,
                // symbol:'circle',
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 0,
                lineStyle: {
                    normal: {
                        color: "#28ffb3",
                    },
                    borderColor: '#f0f'
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e"),
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#28ffb3",
        
                    }
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0,154,120,1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(0,0,0, 0)'
                            }
                        ], false),
                        shadowColor: 'rgba(53,142,215, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: yAxisData
            }]
        };

        return option;
    }

    getAllocationLineChartOptions = () => {
        const {preferences} = this.props.homePage.userData;
        const {AllocTrend, AllocYearTrend, AllocTrendType} = this.props;
        let xAxisData = [];
        let yAxisData = [];

        if (AllocTrendType === "Day"){
            xAxisData = AllocTrend.map(e => e.DATE_VALUE);
            yAxisData = AllocTrend.map(e => e.ALLOCATION_COUNT);
        } else if (AllocTrendType === "Year"){
            xAxisData = AllocYearTrend.map(e => e.DATE_VALUE);
            yAxisData = AllocYearTrend.map(e => e.ALLOCATION_COUNT);
        }
        
        var option = {
            backgroundColor: (preferences.background_color === "dark" ? "#08263a" : "#FFF"),
            tooltip: {},
            grid: {
                left: '0px',
                top: '10px',
                right: '0px',
                bottom: '10px',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e"),
                        margin: 15,
                    },
                },
                axisTick: {
                    show: false,
                },
                data: xAxisData,
            }],
            yAxis: [{
                type: 'value',
                min: 0,
                // max: 140,
                splitNumber: 7,
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#6f7985'
                    }
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e"),
        
                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [{
                name: '',
                type: 'line',
                // smooth: true,
                // symbol:'circle',
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 0,
                lineStyle: {
                    normal: {
                        color: "#28ffb3",
                    },
                    borderColor: '#f0f'
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e"),
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#28ffb3",
        
                    }
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0,154,120,1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(0,0,0, 0)'
                            }
                        ], false),
                        shadowColor: 'rgba(53,142,215, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: yAxisData
            }]
        };

        return option;
    }

    getTopDeptByPO = () => {
        const {preferences} = this.props.homePage.userData;
        const {PODeptChart, departments} = this.props;
        const PODept = PODeptChart.map(e => e.DEPT);
        const DEPT = PODept.map(d => (departments.find(dep => dep.id == d) ? departments.find(dep => dep.id == d).displayDesc : d));
        const POCount = PODeptChart.map(e => e.PO_COUNT);
        const DollarAmount = PODeptChart.map(e => e.DOLLAR_AMOUNT);
        var option = {
            backgroundColor: (preferences.background_color === "dark" ? "#08263a" : "#FFF"),
            tooltip: {
                show: false,
                formatter: "{b}: {c}"
            },
            grid: {
                left: '0px',
                top: '0px',
                right: '20px',
                bottom: '0px',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                    }  
                },
                show:false,
                position: 'top',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e"),
                    }
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: [{
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                        }  
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: false,
                        length: 5,
        
                    },
                    "splitLine": {
                        "show": false
                    },
                    inverse: 'true',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#6f7985',
                            type: 'dashed'
                        }
                    },
                    data: DEPT
                }
        
            ],
            series: [{
                    name: '',
                    type: 'bar',
                        label: {
                        normal: {
                          show: true,
                          position: 'right',
                          formatter: '{c}',
                          textStyle: {
                            color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e") //color of value
                          }
                        }
                      },
                    itemStyle: {
                        normal: {
                            show: true,
                            color: function(params) {
                                var colorList = [{
                                        colorStops: [{
                                            offset: 0,
                                            color: '#FFD119'
                                        }, {
                                            offset: 1,
                                            color: '#FFAC4C'
                                        }]
                                    },
                                    {
                                        colorStops: [{
                                            offset: 0,
                                            color: '#00C0FA'
                                        }, {
                                            offset: 1,
                                            color: '#2F95FA'
                                        }]
                                    }
                                ];
                                return preferences.background_color === "dark" ? colorList[0] : colorList[1];
                            },
                            barBorderRadius: 70,
                            borderWidth: 0,
                            borderColor: '#333',
                        }
                    },
                    barGap: '0%',
                    barCategoryGap: '50%',
                    data: POCount
                }
        
            ]
        };

        return option;
    }

    getTopDeptByAllocation = () => {
        const {preferences} = this.props.homePage.userData;
        const {AllocDeptChart, departments} = this.props;
        const AllocDept = AllocDeptChart.map(e => e.DEPT);
        const DEPT = AllocDept.map(d => (departments.find(dep => dep.id == d) ? departments.find(dep => dep.id == d).displayDesc : d));
        const AllocationCount = AllocDeptChart.map(e => e.ALLOCATION_COUNT);
        
        var option = {
            backgroundColor: (preferences.background_color === "dark" ? "#08263a" : "#FFF"),
            tooltip: {
                show: false,
                formatter: "{b}: {c}"
            },
            grid: {
                left: '0px',
                top: '0px',
                right: '20px',
                bottom: '0px',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                    }  
                },
                show:false,
                position: 'top',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e"),
                    }
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: [{
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                        }  
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: false,
                        length: 5,
        
                    },
                    "splitLine": {
                        "show": false
                    },
                    inverse: 'true',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#6f7985',
                            type: 'dashed'
                        }
                    },
                    data: DEPT
                }
        
            ],
            series: [{
                    name: '',
                    type: 'bar',
                        label: {
                        normal: {
                          show: true,
                          position: 'right',
                          formatter: '{c}',
                          textStyle: {
                            color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                          }
                        }
                      },
                    itemStyle: {
                        normal: {
                            show: true,
                            color: function(params) {
                                var colorList = [{
                                        colorStops: [{
                                            offset: 0,
                                            color: '#FFD119'
                                        }, {
                                            offset: 1,
                                            color: '#FFAC4C'
                                        }]
                                    },
                                    {
                                        colorStops: [{
                                            offset: 0,
                                            color: '#00C0FA'
                                        }, {
                                            offset: 1,
                                            color: '#2F95FA'
                                        }]
                                    }
                                ];
                                return preferences.background_color === "dark" ? colorList[0] : colorList[1];
                            },
                            barBorderRadius: 70,
                            borderWidth: 0,
                            borderColor: '#333',
                        }
                    },
                    barGap: '0%',
                    barCategoryGap: '50%',
                    data: AllocationCount
                }
        
            ]
        };

        return option;
    }

    getUserLoginCount = () => {
        const {preferences} = this.props.homePage.userData;
        const {selectedDay, userLoadType, userLoadIMSHr, userLoadIMSDay, userLoadIMSMonth} = this.props;
        let xAxisData = [];
        let yAxisData = [];

        if (userLoadType === "Hour"){
            xAxisData = userLoadIMSHr.filter(e => e.date.dayweek === selectedDay.value).map(e => e.date.hour);
            yAxisData = userLoadIMSHr.filter(e => e.date.dayweek === selectedDay.value).map(e => e.avg_login);
        } else if (userLoadType === "Day"){
             xAxisData = userLoadIMSDay.map(e => e.date.year + " - " + e.date.month + " - " + e.date.day);
            yAxisData = userLoadIMSDay.map(e => e.count);
        } else if (userLoadType === "Month"){
            xAxisData = userLoadIMSMonth.map(e => e.date.year + " - " + e.date.month);
            yAxisData = userLoadIMSMonth.map(e => e.count);
        } 

        var option = {
            backgroundColor: (preferences.background_color === "dark" ? "#08263a" : "#FFF"),
            tooltip: {
                show: false,
                formatter: "{b}: {c}"
            },
            grid: {
                left: '0px',
                top: '10px',
                right: '0px',
                bottom: '10px',
                containLabel: true
            },
            xAxis: [{
                show: true,
                data: xAxisData,
                axisLabel: {
                    textStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                    }  
                }, 
            }, {
                show: false,
                data: xAxisData,
            }],
            visualMap: {
                show: false,
                min: 0,
                max: Math.max(...yAxisData),
                dimension: 0,
                inRange: {
                    color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
                }
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: (preferences.background_color === "dark" ? "#c8ced3" : "#151b1e")
                    }  
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#6f7985'
                    }
                },
                axisTick: {
                    show: false
                }
            },
            series: [{
                name: 'front',
                type: 'bar',
                data: yAxisData,
                xAxisIndex: 1,
                z: 3,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5
                    }
                }
            }],
            animationEasing: 'elasticOut',
            animationEasingUpdate: 'elasticOut',
            animationDelay: function (idx) {
                return idx * 20;
            },
            animationDelayUpdate: function (idx) {
                return idx * 20;
            }
        };

        return option;
    }

    render() {
        const {preferences} = this.props.homePage.userData;
        const {hourDropdownOptions, selectedDay, userLoadType, POCardDetails, AllocCardDetails, ReplenCardDetails, PODeptChart, AllocDeptChart, POTrend, POYearTrend, AllocTrend, AllocYearTrend, userLoadIMSHr, userLoadIMSDay, userLoadIMSMonth, POCardDetailsFS, AllocCardDetailsFS, ReplenCardDetailsFS, PODeptChartFS, AllocDeptChartFS, POTrendFS, AllocTrendFS, userLoadIMSHrFS, userLoadIMSDayFS, userLoadIMSMonthFS, POTrendType, AllocTrendType, AllocYearTrendFS, POYearTrendFS} = this.props;
        return (
            <div className="ims-dashboard">
                <ReactGridLayout ref={this.gridLayoutRef} className="layout" layout={this.state.layout} cols={12}>
                    <div key="aaa">
                        <div className="ims-dashboard-child">
                            <div id="imsd-header"><ReactSVG svgStyle={{width: '20px', height: 'auto'}} src={"../../../../public/svg/order.svg"} /><span style={{paddingLeft:'10px'}}>Purchase Order Status for Today</span></div>
                            <hr />
                            {!!POCardDetails.length ? <div className="status">
                                <div className="status-index">
                                    <span style={{paddingRight: '10px'}}>{"# " + POCardDetails[0].PO_COUNT}</span>
                                    <ReactSVG svgStyle={{width: '1em', height: 'auto', fill: (POCardDetails[0].PO_COUNT_FLAG?'green':'red')}} src={(POCardDetails[0].PO_COUNT_FLAG?"../../../../public/svg/arrow-up.svg":"../../../../public/svg/arrow-pointing-down.svg")} />
                                </div>
                                <div className="status-index">
                                    <span style={{paddingRight: '10px'}}>{"$ " + POCardDetails[0].DOLLAR_AMOUNT}</span>
                                    <ReactSVG svgStyle={{width: '1em', height: 'auto', fill: (POCardDetails[0].DOLLAR_AMOUNT_FLAG?'green':'red')}} src={(POCardDetails[0].DOLLAR_AMOUNT_FLAG?"../../../../public/svg/arrow-up.svg":"../../../../public/svg/arrow-pointing-down.svg")} />
                                </div>
                            </div> :null}
                            {POCardDetailsFS === "Loading" ? <PulseLoader id="IMSD-Pulse-Loader" color="rgb(32, 168, 216)" size="12px" margin="4px" /> :
                            POCardDetailsFS === "Error" ? <Alert color="danger"><i className="fa fa-exclamation-triangle" style={{marginRight: '10px'}}></i>{'Unable to load data at this time. Please try again later.'}</Alert> : null}
                        </div>
                    </div>
                    <div key="bbb">
                        <div className="ims-dashboard-child">
                        <div id="imsd-header"><ReactSVG svgStyle={{width: '20px', height: 'auto'}} src={"../../../../public/svg/alloc_maintenance.svg"} /><span style={{paddingLeft:'10px'}}>Allocation Status for Today</span></div>
                            <hr />
                            {!!AllocCardDetails.length ? <div className="status">
                                <div className="status-index">
                                    <span style={{paddingRight: '10px'}}>{"# " + AllocCardDetails[0].ALLOCATION_COUNT}</span>
                                    <ReactSVG svgStyle={{width: '1em', height: 'auto', fill: (AllocCardDetails[0].ALLOCATION_COUNT_FLAG?'green':'red')}} src={(AllocCardDetails[0].ALLOCATION_COUNT_FLAG?"../../../../public/svg/arrow-up.svg":"../../../../public/svg/arrow-pointing-down.svg")} />
                                </div>
                            </div> :null}
                            {AllocCardDetailsFS === "Loading" ? <PulseLoader id="IMSD-Pulse-Loader" color="rgb(32, 168, 216)" size="12px" margin="4px" /> :
                            AllocCardDetailsFS === "Error" ? <Alert color="danger"><i className="fa fa-exclamation-triangle" style={{marginRight: '10px'}}></i>{'Unable to load data at this time. Please try again later.'}</Alert> : null}
                        </div>
                    </div>
                    <div key="ccc">
                        <div className="ims-dashboard-child">
                            <div id="imsd-header"><ReactSVG svgStyle={{width: '20px', height: 'auto'}} src={"../../../../public/svg/replenish.svg"} /><span style={{paddingLeft:'10px'}}>Replenishment PO Status for Today</span></div>
                            <hr />
                            {!!ReplenCardDetails.length ? <div className="status">
                                <div className="status-index">
                                    <span style={{paddingRight: '10px'}}>{"# " + ReplenCardDetails[0].PO_COUNT}</span>
                                    <ReactSVG svgStyle={{width: '1em', height: 'auto', fill: (ReplenCardDetails[0].PO_COUNT_FLAG?'green':'red')}} src={(ReplenCardDetails[0].PO_COUNT_FLAG?"../../../../public/svg/arrow-up.svg":"../../../../public/svg/arrow-pointing-down.svg")} />
                                </div>
                                <div className="status-index">
                                    <span style={{paddingRight: '10px'}}>{"$ " + ReplenCardDetails[0].DOLLAR_AMOUNT}</span>
                                    <ReactSVG svgStyle={{width: '1em', height: 'auto', fill: (ReplenCardDetails[0].DOLLAR_AMOUNT_FLAG?'green':'red')}} src={(ReplenCardDetails[0].DOLLAR_AMOUNT_FLAG?"../../../../public/svg/arrow-up.svg":"../../../../public/svg/arrow-pointing-down.svg")} />
                                </div>
                            </div> :null}
                            {ReplenCardDetailsFS === "Loading" ? <PulseLoader id="IMSD-Pulse-Loader" color="rgb(32, 168, 216)" size="12px" margin="4px" /> :
                            ReplenCardDetailsFS === "Error" ? <Alert color="danger"><i className="fa fa-exclamation-triangle" style={{marginRight: '10px'}}></i>{'Unable to load data at this time. Please try again later.'}</Alert> : null}
                        </div>
                    </div>

                    <div key="ddd">
                        <div className="ims-dashboard-child">
                            <div id="imsd-header"><ReactSVG svgStyle={{width: '20px', height: 'auto'}} src={"../../../../public/svg/life_cycle.svg"} /><span style={{paddingLeft:'10px'}}>Average Procurement Lifecycle</span></div>
                            <hr />
                            <ReactEcharts option={this.getAvgProcurementLifecycle()} style={{height: 'calc(100% - 40px)', width: '100%'}} theme={preferences.background_color === "dark" ? "dark" :  ""} />
                        </div>
                    </div>

                    <div key="eee">
                        <div className="ims-dashboard-child">
                            <div id="imsd-header"><ReactSVG svgStyle={{width: '20px', height: 'auto'}} src={"../../../../public/svg/order.svg"} /><span style={{paddingLeft:'10px'}}>PO Creation Trend</span></div>
                            <ButtonGroup id="ULC-toggle">
                                <Button onClick={() => this.props.togglePOTrendType("Day")} active={POTrendType === 'Day'}>Week</Button>
                                <Button onClick={() => this.props.togglePOTrendType("Year")} active={POTrendType === 'Year'}>Year</Button>
                            </ButtonGroup>
                            <hr />
                            {((POTrendType === 'Day' && !!POTrend.length) || (POTrendType === 'Year' && !!POYearTrend.length)) && <ReactEcharts option={this.getPOLineChartOptions()} style={{height: 'calc(100% - 40px)', width: '100%'}} theme={preferences.background_color === "dark" ? "dark" :  ""} />}
                            {(POTrendType === 'Day' && POTrendFS === "Loading") || (POTrendType === 'Year' && POYearTrendFS === "Loading") ? <PulseLoader id="IMSD-Pulse-Loader" color="rgb(32, 168, 216)" size="12px" margin="4px" /> :
                            (POTrendType === 'Day' && POTrendFS === "Error") || (POTrendType === 'Year' && POYearTrendFS === "Error") ? <Alert color="danger"><i className="fa fa-exclamation-triangle" style={{marginRight: '10px'}}></i>{'Unable to load data at this time. Please try again later.'}</Alert> : null}
                        </div>
                    </div>
                    <div key="fff">
                        <div className="ims-dashboard-child">
                            <div id="imsd-header"><ReactSVG svgStyle={{width: '20px', height: 'auto'}} src={"../../../../public/svg/alloc_maintenance.svg"} /><span style={{paddingLeft:'10px'}}>Allocation Trend</span></div>
                            <ButtonGroup id="ULC-toggle">
                                <Button onClick={() => this.props.toggleAllocTrendType("Day")} active={AllocTrendType === 'Day'}>Week</Button>
                                <Button onClick={() => this.props.toggleAllocTrendType("Year")} active={AllocTrendType === 'Year'}>Year</Button>
                            </ButtonGroup>
                            <hr />
                            {((AllocTrendType === 'Day' && !!AllocTrend.length) || (AllocTrendType === 'Year' && !!AllocYearTrend.length)) && <ReactEcharts option={this.getAllocationLineChartOptions()} style={{height: 'calc(100% - 40px)', width: '100%'}} theme={preferences.background_color === "dark" ? "dark" :  ""} />}
                            {(AllocTrendType === 'Day' && AllocTrendFS === "Loading") || (AllocTrendType === 'Year' && AllocYearTrendFS === "Loading") ? <PulseLoader id="IMSD-Pulse-Loader" color="rgb(32, 168, 216)" size="12px" margin="4px" /> :
                            (AllocTrendType === 'Day' && AllocTrendFS === "Error") || (AllocTrendType === 'Year' && AllocYearTrendFS === "Error") ? <Alert color="danger"><i className="fa fa-exclamation-triangle" style={{marginRight: '10px'}}></i>{'Unable to load data at this time. Please try again later.'}</Alert> : null}
                        </div>
                    </div>

                    <div key="ggg">
                        <div className="ims-dashboard-child">
                            <div id="imsd-header"><ReactSVG svgStyle={{width: '20px', height: 'auto'}} src={"../../../../public/svg/order.svg"} /><span style={{paddingLeft:'10px'}}>Top 10 department by PO</span></div>
                            <hr />
                            {!!PODeptChart.length && <ReactEcharts option={this.getTopDeptByPO()} style={{height: 'calc(100% - 40px)', width: '100%'}} theme={preferences.background_color === "dark" ? "dark" :  ""} />}
                            {PODeptChartFS === "Loading" ? <PulseLoader id="IMSD-Pulse-Loader" color="rgb(32, 168, 216)" size="12px" margin="4px" /> :
                            PODeptChartFS === "Error" ? <Alert color="danger"><i className="fa fa-exclamation-triangle" style={{marginRight: '10px'}}></i>{'Unable to load data at this time. Please try again later.'}</Alert> : null}
                        </div>
                    </div>
                    <div key="hhh">
                        <div className="ims-dashboard-child">
                            <div id="imsd-header"><ReactSVG svgStyle={{width: '20px', height: 'auto'}} src={"../../../../public/svg/alloc_maintenance.svg"} /><span style={{paddingLeft:'10px'}}>Top 10 department by Allocation</span></div>
                            <hr />
                            {!!AllocDeptChart.length && <ReactEcharts option={this.getTopDeptByAllocation()} style={{height: 'calc(100% - 40px)', width: '100%'}} theme={preferences.background_color === "dark" ? "dark" :  ""} />}
                            {AllocDeptChartFS === "Loading" ? <PulseLoader id="IMSD-Pulse-Loader" color="rgb(32, 168, 216)" size="12px" margin="4px" /> :
                            AllocDeptChartFS === "Error" ? <Alert color="danger"><i className="fa fa-exclamation-triangle" style={{marginRight: '10px'}}></i>{'Unable to load data at this time. Please try again later.'}</Alert> : null}
                        </div>
                    </div>

                    <div key="iii">
                        <div className="ims-dashboard-child">
                            <div id="imsd-header"><ReactSVG svgStyle={{width: '20px', height: 'auto'}} src={"../../../../public/svg/login.svg"} /><span style={{paddingLeft:'10px'}}>User Login Count</span></div>
                            {userLoadType === "Hour" && <div id="ULC-Hour-select"><Select labelKey='label' valueKey='value' options={hourDropdownOptions} onChange={(selectedDay) => this.props.selectDay({ selectedDay })} value={selectedDay} clearable={false} /></div>}
                            <ButtonGroup id="ULC-toggle">
                                <Button onClick={() => this.props.toggleUserLoadType("Hour")} active={userLoadType === 'Hour'}>Hour</Button>
                                <Button onClick={() => this.props.toggleUserLoadType("Day")} active={userLoadType === 'Day'}>Day</Button>
                                <Button onClick={() => this.props.toggleUserLoadType("Month")} active={userLoadType === 'Month'}>Month</Button>
                            </ButtonGroup>
                            <hr />
                            {((userLoadType === 'Hour' && !!userLoadIMSHr.length) || (userLoadType === 'Day' && !!userLoadIMSDay.length) || (userLoadType === 'Month' && !!userLoadIMSMonth.length)) && <ReactEcharts option={this.getUserLoginCount()} style={{height: 'calc(100% - 40px)', width: '100%'}} theme={preferences.background_color === "dark" ? "dark" :  ""} />}
                            {(userLoadType === 'Hour' && userLoadIMSHrFS === "Loading") || (userLoadType === 'Day' && userLoadIMSDayFS === "Loading") || (userLoadType === 'Month' && userLoadIMSMonthFS === "Loading") ? <PulseLoader id="IMSD-Pulse-Loader" color="rgb(32, 168, 216)" size="12px" margin="4px" /> :
                            (userLoadType === 'Hour' && userLoadIMSHrFS === "Error") || (userLoadType === 'Day' && userLoadIMSDayFS === "Error") || (userLoadType === 'Month' && userLoadIMSMonthFS === "Error") ? <Alert color="danger"><i className="fa fa-exclamation-triangle" style={{marginRight: '10px'}}></i>{'Unable to load data at this time. Please try again later.'}</Alert> : null}
                        </div>
                    </div>
                </ReactGridLayout>
            </div>
        );
    }
}

Dashboard.propTypes = {};

const mapStateToProps = state => {
    return {
        homePage: state.homePage,
        hourDropdownOptions: state.dashboard.hourDropdownOptions,
        selectedDay: state.dashboard.selectedDay,
        userLoadType: state.dashboard.userLoadType,
        userLoadIMSHr: state.dashboard.userLoadIMSHr,
        userLoadIMSDay: state.dashboard.userLoadIMSDay,
        userLoadIMSMonth: state.dashboard.userLoadIMSMonth,
        allocDetailCount: state.dashboard.allocDetailCount,

        departments: state.dashboard.departments,
        POCardDetails: state.dashboard.POCardDetails,
        AllocCardDetails: state.dashboard.AllocCardDetails,
        ReplenCardDetails: state.dashboard.ReplenCardDetails,
        PODeptChart: state.dashboard.PODeptChart,
        AllocDeptChart: state.dashboard.AllocDeptChart,
        POTrend: state.dashboard.POTrend,
        POYearTrend: state.dashboard.POYearTrend,
        AllocTrend: state.dashboard.AllocTrend,
        AllocYearTrend: state.dashboard.AllocYearTrend,
        POTrendType: state.dashboard.POTrendType,
        AllocTrendType: state.dashboard.AllocTrendType,

        POCardDetailsFS: state.dashboard.POCardDetailsFS,
        AllocCardDetailsFS: state.dashboard.AllocCardDetailsFS,
        ReplenCardDetailsFS: state.dashboard.ReplenCardDetailsFS,
        PODeptChartFS: state.dashboard.PODeptChartFS,
        AllocDeptChartFS: state.dashboard.AllocDeptChartFS,
        POTrendFS: state.dashboard.POTrendFS,
        POYearTrendFS: state.dashboard.POYearTrendFS,
        AllocTrendFS: state.dashboard.AllocTrendFS,
        AllocYearTrendFS: state.dashboard.AllocYearTrendFS,
        userLoadIMSHrFS: state.dashboard.userLoadIMSHrFS,
        userLoadIMSDayFS: state.dashboard.userLoadIMSDayFS,
        userLoadIMSMonthFS: state.dashboard.userLoadIMSMonthFS
    }
}

const mapDispatchToProps = dispatch => ({
    selectDay: (v) => dispatch(selectDay(v)),
    toggleUserLoadType: (v) => dispatch(toggleUserLoadType(v)),
    togglePOTrendType:(v) => dispatch(togglePOTrendType(v)),
    toggleAllocTrendType:(v) => dispatch(toggleAllocTrendType(v))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);