import { useHistory, useParams } from 'react-router';
import classes from './Carousel.module.css';
import shortid from 'shortid';
import SliderCarousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const Carousel = ({ title, items, category }) => {
  const history = useHistory();
  const params = useParams();

  const responsive = {
    bigDesktop: {
      breakpoint: { max: 3000, min: 1500 }, items: 6, slidesToSlide: 6,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1235 }, items: 5, slidesToSlide: 5,
    },
    smallDesktop: {
      breakpoint: { max: 1235, min: 790 }, items: 4, slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 790, min: 544 }, items: 3, slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 544, min: 0 }, items: 3, slidesToSlide: 3
    }
  };

  const categoryHandler = (category, artist = params.artist, album) => {
    switch (category) {
      case 'artists':
        history.push(`/artist/${artist}`);
        break;
      case 'albums':
        history.push(`/artist/${artist}/${album}`);
        break;
      default:
        history.push('/');
    }
  }

  return (
    <section className={classes.carousel}>
      {title && <h2>{title}</h2>}
      <SliderCarousel
        responsive={responsive}
      // removeArrowOnDeviceType={['tablet', 'mobile']}
      >
        {items.map(item =>
          <div key={shortid.generate()} className={classes.item}>
            <img
              src={item.imgURL}
              alt={item.artist || item.album}
              className={classes[`${category}`]}
              onClick={() => categoryHandler(category, item.artist, item.album)}
            />
            <h4>{category === 'artists' ? item.artist : item.album}</h4>
            <p>{item.followers || item.artist || null}</p>
          </div>
        )}
      </SliderCarousel>
    </section>
  );
}

export default Carousel;