import React, {FC} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Matches.css';
import MatchesPreview from '../components/MatchesPreview';
import NewsPreview from '../components/NewsPreview';




const Matches: FC = () => {
    return (
        <div style={{height: '100%'}}>
            <Header />
            <div className='container'>
            <h1>Матчи</h1>

            <div className='content'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate temporibus,
                id in harum aspernatur hic fugiat exercitationem porro magnam obcaecati voluptatibus!
                Explicabo recusandae voluptatum molestiae inventore. Laborum laboriosam doloribus, quae
                totam dolor voluptatem cupiditate ratione provident nostrum deserunt natus minus pariatur,
                ducimus, iusto accusantium officiis! Corporis ipsum magnam laborum provident unde possimus
                quaerat, error inventore porro nostrum quisquam commodi voluptas. Ipsa nihil maiores fugit
                consectetur. Possimus nam ratione veniam quasi tempora non sunt facilis. Quos sit quae impedit
                 Voluptate inventore alias hic nobis, cum, vero nostrum quaerat aut consequuntur nesciunt vo
                 luptates, fugiat assumenda aliquid ratione ut totam quis mollitia quas?
                 </div>
                 <NewsPreview/>
                 </div>
                 
       <Footer/>
        </div>
    );
};

export default Matches;