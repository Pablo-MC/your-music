import { useHistory, useParams } from 'react-router';
import shortid from 'shortid';
import SliderCarousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import classes from './Carousel.module.css';

const Carousel = ({ title, items, category }) => {
  const history = useHistory();
  const params = useParams();

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

  // function CustomRightArrow({ onClick }) {
  //   return (
  //     <button
  //       // onClick={handleClick}
  //       aria-label="Go to next slide"
  //       className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
  //     // className={classes['react-multiple-carousel__arrow]['react-multiple-carousel__arrow--right']}
  //     // className={classes['react-multiple-carousel__arrow--right']}

  //     />
  //   );
  // }


  return (
    <section className={classes.carousel}>
      {title && <h2>{title}</h2>}
      <SliderCarousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      // itemClass={}
      // centerMode={true}
      // focusOnSelect={true}
      // customRightArrow={<CustomRightArrow />}
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
            <p>{item.subscribers || item.artist || null}</p>
          </div>
        )}
      </SliderCarousel>
    </section>
  );
}

export default Carousel;