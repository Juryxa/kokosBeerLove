import React from 'react';
import "./ClubPreview.css"
import clubPic from '../images/Group 135.png'


const Shop = () => {
    return (
        <div className="about-club-container">
          <div className="image-container">
          
            <div className="text-overlay">
              <h2>О КЛУБЕ</h2>
              <p>
                Сентябрь принёс нам и запоминающиеся победы, и несколько досадных поражений.
                Но есть то, что остаётся неизменным, независимо от результата. Это игра.
                В каждом матче наши ребята оставляют все силы от первой до последней минуты,
                и не важно, какой счёт горит в этот момент на табло.
              </p>
              <a href="#">Узнать больше...</a>
            </div>
            <img 
              src={clubPic} 
              alt="team" 
              className="club-image" 
            />
          </div>
        </div>
      );
    };
export default Shop;