import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import './Carousel.css';
import footboler1 from '../images/footboler1.png';

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
  const [currentPage, setCurrentPage] = React.useState(0); // Состояние для текущей страницы
  const itemsPerPage = 10; // Количество элементов на странице

  // Рассчитываем максимальное количество страниц
  const maxPages = Math.ceil(items.length / itemsPerPage) - 1;

  // Переключение на следующую страницу
  const handleNextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Переключение на предыдущую страницу
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage); // Видимые элементы

  return (
    <div className="carousel-container">
      <Box className="carousel-content">
        {visibleItems.map((item) => (
          <Card
            key={item.id}
            className="carousel-item"
            onClick={() => console.log(item.id)}
          >
            <img src={item.image} alt={item.title} className="carousel-image" />
            <CardContent>
              <Typography variant="h5">{item.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <div className="carousel-buttons">
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Предыдущие
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === maxPages}
        >
          Следующие
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
