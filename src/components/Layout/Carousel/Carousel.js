import { useHistory } from 'react-router';
import shortid from 'shortid';
import SliderCarousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import classes from './Carousel.module.css';

const Carousel = ({ title, items, category }) => {
  const history = useHistory();

  // const { title, items, category } = props;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const categoryHandler = (category, name) => {
    switch (category) {
      case 'artists':
        history.push(`/artist/${name}`);
        break;
      case 'albums':
        history.push(`/album/${name}`);
        break;
      default:
        history.push('/');
    }
  }

  return (
    <section className={classes.category}>
      {title && <h2>{title}</h2>}
      <SliderCarousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {items.map(item =>
          <div key={shortid.generate()} className={classes.item}>
            <img
              src={item.imgURL}
              alt={item.artist || item.album}
              className={classes[`${category}`]}
              onClick={(e) => categoryHandler(category, e.target.alt)}
            />
            <h4>{category === 'artists' ? item.artist : item.album}</h4>
            <p>{item.subscribers || item.artist || null}</p>
          </div>
        )}
      </SliderCarousel>
    </section>
  );
}

export default Carousel;