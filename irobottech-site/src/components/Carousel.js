import React, { Component } from 'react';
//import Slide1 from '../images/slide1.jpg';
//import Slide2 from '../images/slide2.jpg';
//import Slide3 from '../images/slide3.jpg';
import { Container, Carousel, CarouselInner, CarouselItem, View, Mask, CarouselCaption } from 'mdbreact';
import './Carousel.css';

class HomeCarousel extends Component {
    render() {
        return (

            <Container>
                <Carousel
                    activeItem={1}
                    length={3}
                    showControls={false}
                    showIndicators={true}
                    className="z-depth-1">
                    <CarouselInner>
                        <CarouselItem itemId="1">
                            <View>
                                <img className="d-block w-100"  alt="First slide" />
                                <Mask overlay="black-light"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Light mask</h3>
                                <p>First text</p>
                            </CarouselCaption>
                        </CarouselItem>
                        <CarouselItem itemId="2">
                            <View>
                                <img className="d-block w-100"  alt="Second slide" />
                                <Mask overlay="black-light"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Strong mask</h3>
                                <p>Second text</p>
                            </CarouselCaption>
                        </CarouselItem>
                        <CarouselItem itemId="3">
                            <View>
                                <img className="d-block w-100"  alt="Third slide" />
                                <Mask overlay="black-light"></Mask>
                            </View>
                            <CarouselCaption>
                                <h3 className="h3-responsive">Slight mask</h3>
                                <p>Third text</p>
                            </CarouselCaption>
                        </CarouselItem>
                    </CarouselInner>
                </Carousel>
            </Container>
        );
    }
}

export default HomeCarousel;