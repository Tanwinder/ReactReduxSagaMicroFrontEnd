import React, { Component } from 'react';
import {Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import moment from 'moment';
import './HomePage.scss';

function chunk(array, size) {
    if (!array) return [];
    const firstChunk = array.slice(0, size);
    if (!firstChunk.length) {
        return array;
    }
    return [firstChunk].concat(chunk(array.slice(size, array.length), size)); 
}

class UserBrowsingHistoryCards extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
    }

    next() {
        const {browsingHistory} = this.props.userData;
        const items = chunk(browsingHistory, 3);
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        const {browsingHistory} = this.props.userData;
        const items = chunk(browsingHistory, 3);
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        this.setState({ activeIndex: newIndex });
    }

    render() {    
        let { userDetailsObj, appErrors, userData } = this.props;        
        let {browsingHistory, browsingHistoryCards} = userData;
        browsingHistory && browsingHistory.length > 1 && browsingHistory.sort(function(historyOne, historyTwo) {
            let timeOne = historyOne.access_time;
            let timeTwo = historyTwo.access_time;
            return timeOne > timeTwo ? -1 : timeOne < timeTwo ? 1 : 0;
        }); 
        const chunkedItems = chunk(browsingHistory, 3);        
        let carouselIndicatorsItems = chunkedItems.map((cIt, cIn) => {
            let obj = {};
            obj['src'] = cIn;
            return obj;
        });
        const { activeIndex } = this.state;
        const svgPath = {'Demand': "../../../../public/svg/demand.svg", 'Optimization': "../../../../public/svg/optimize2.svg", 'OPC Admin': "../../../../public/svg/opc-admin.svg", 'Maintain Allocations': "../../../../public/svg/delivery.svg"};
        
        let slides = chunkedItems.map((chunkedItem, chunkedIndex) => {
            let chunkedSlides = chunkedItem.map(item =>
                <Card style={{ width:'33.33%', borderRadius:'5px'}} key={item.page_name}>
                    <CardHeader style={{padding: '4px'}}>
                        <span style={{display: 'flex', padding: '6px 10px'}}><ReactSVG svgStyle={{ width: 17, height: 'auto' }} src={svgPath[item.page_name]} /><span style={{paddingLeft: '10px'}}>{item.page_name}</span></span>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>Access Time: {moment(item.access_time).format('MMMM Do YYYY, h:mm:ss a')}</CardTitle>
                        <CardText>Lorem ipsum dolor sit amet, consectetur</CardText>
                        <Button color="link" style={{fontSize:'12px'}}>
                            <NavLink to={item.page_url}>See more...</NavLink>
                        </Button>
                    </CardBody>
                </Card>
            )
            return (
                <CarouselItem className="custom-tag" tag="div" key={chunkedIndex++}>
                    <div style={{display:'flex', overflowX:'auto'}}>
                        {chunkedSlides}
                    </div>
                </CarouselItem>
            );
        });

        return (
            <div>
                <style>
                    {
                        `.custom-tag {
                            max-width: 100%;
                            height: 210px;
                            // background: #EAEDED;
                            overflow: hidden;
                        }`
                    }
                </style>
                <div className="browsing-history-header">{'Browsing History'}</div>
                <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous} interval={false}>
                    {carouselIndicatorsItems.length > 1 && <CarouselIndicators items={carouselIndicatorsItems} activeIndex={activeIndex} onClickHandler={this.goToIndex} />}
                    {slides}
                    {carouselIndicatorsItems.length > 1 && <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />}
                    {carouselIndicatorsItems.length > 1 && <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />}
                </Carousel>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    userData: store.homePage.userData    
})

export default connect(mapStateToProps)(UserBrowsingHistoryCards);