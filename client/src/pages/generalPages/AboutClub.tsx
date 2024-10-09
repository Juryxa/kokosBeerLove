import React from 'react';
import "./AboutClub.css";
import clubPic from '../../images/Group 135.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AboutClub = () => {
    return (
        <div className="about-club-container" >
            <Header/>
            <div className='aboutclub-content'>
                <div className='aboutclub-h1'>
            <h1>О КЛУБЕ</h1>
            </div>
            <div className="aboutclub-top-container">
            <div className="aboutclub-text-overlay">

                    <p>
                        Сентябрь принёс нам и запоминающиеся победы, и несколько досадных поражений.
                        Но есть то, что остаётся неизменным, независимо от результата. Это игра.
                        В каждом матче наши ребята оставляют все силы от первой до последней минуты,
                        и не важно, какой счёт горит в этот момент на табло.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore expedita laborum eos incidunt sunt libero. Natus soluta a reprehenderit tenetur nesciunt
                        provident animi, harum magnam molestiae aperiam inventore? Officia, vitae.
                    </p>

                </div>

                <img
                    src={clubPic}
                    alt="team"
                    className="aboutclub-club-image"
                />

            </div>
            <div className='aboutclub-content-low'>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, magnam aliquam reprehenderit non natus commodi dolores id voluptatum, quisquam vitae optio. Sint porro corporis excepturi nesciunt quisquam velit cupiditate inventore repellendus, in quo. Perspiciatis blanditiis qui hic cum, dolorum recusandae accusantium incidunt numquam assumenda quos nulla. Provident recusandae, repellendus minima reiciendis, sequi consequatur earum rerum corrupti voluptatum placeat vel nostrum alias commodi molestias beatae! Blanditiis ex inventore deleniti. Sed expedita fugiat quia rerum nisi soluta sapiente vero ea consequatur aliquid quidem libero, sequi sint id temporibus accusantium minima laboriosam quibusdam ipsam eos earum illo quas consectetur! Nihil rem nesciunt blanditiis!</p>
            </div>

                </div>
            <Footer/>
        </div>
    );
};

export default AboutClub;
