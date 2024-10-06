import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import './Carousel.css';


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import footboler1 from '../images/footboler1.png';

import back from '../images/icons/Vector 5.png'
import next from '../images/icons/Vector 4.png'

interface Item {
  id: number;
  title: string;
  image: string;
}

const items: Item[] = [
  { id: 1, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 2, title: 'Погребняк Павел Викторович', image: footboler1 },
  { id: 3, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 4, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 5, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 6, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 7, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 8, title: 'Погребняк Павел Викторович', image: footboler1 },
  { id: 9, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 10, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 11, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 12, title: 'Погребняк Павел Викторович', image: footboler1 },
  { id: 13, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 14, title: 'Погребняк Павел Викторович', image: footboler1 },
  { id: 15, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 16, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 17, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 18, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 19, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 20, title: 'Погребняк Павел Викторович', image: footboler1 },
  { id: 21, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 22, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 23, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 24, title: 'Погребняк Павел Викторович', image: footboler1 },
  { id: 25, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 26, title: 'Погребняк Павел Викторович', image: footboler1 },
  { id: 27, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 28, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 29, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 30, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 31, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 32, title: 'Погребняк Павел Викторович', image: footboler1 },
  { id: 33, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 34, title: 'Лидинёв Олег Васильевич', image: footboler1 },
  { id: 35, title: 'Марьяшин Павел Андреевич', image: footboler1 },
  { id: 36, title: 'Погребняк Павел Викторович', image: footboler1 },
];

const Carousel: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 10;

  const maxPages = Math.ceil(items.length / itemsPerPage) - 1;

  const handleNextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="carousel-container">
         <div  className="carousel-buttons" style={{ minWidth: '30px', padding: '0',width: '91px', height: '182px' }}>
         {currentPage > 0 && ( // Отображаем кнопку "Назад" только если это не первая страница
          <Button
            onClick={handlePrevPage}
            style={{ minWidth: '30px', padding: '0',width: '91px', height: '182px' }} // Убираем лишние отступы
          >
            <img src={back} alt='Назад'  />
          </Button>
        )}</div>

      <Box className="carousel-content">
        {visibleItems.map((item) => (
          <Card key={item.id} className="carousel-item" onClick={() => console.log(item.id)}>
            <img src={item.image} alt={item.title} className="carousel-image" />
            <CardContent>
              <Typography variant="h5">{item.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      
       
        <div className="carousel-buttons" style={{ minWidth: '30px', padding: '0',width: '91px', height: '182px' }}>
      {currentPage < maxPages && ( // Отображаем кнопку "Вперёд" только если это не последняя страница
          <Button
            onClick={handleNextPage}
            
          >
            <img src={next} alt='Вперёд'  />
          </Button>
        )}
        </div>
      </div>
    
  );
};

export default Carousel;
