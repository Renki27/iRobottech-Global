import React, { Component } from 'react';
import Navbar from '../components/Navbar.js';
import FooterPage from '../components/Footer.js';
import HomeCarousel from '../components/Carousel';

class Home extends Component {
    render() {
        return (
            <div >
                <Navbar />
                <HomeCarousel />
                <div className="container">
                
                </div>
                <FooterPage />
            </div>
        );
    }
}

export default Home;