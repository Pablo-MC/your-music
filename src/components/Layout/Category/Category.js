import classes from './Category.module.css';

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const Category = (props) => {

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

  return (
    <section className={classes.category}>
      <h1>{props.title}</h1>
      {<Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {props.items.map(item =>
          <div key={item.id} className={classes.item}>
            <img src={item.imgURL} alt={item.name || item.album} className={classes[`${props.imgStyle}`]} />
            <h4>{item.name || item.album}</h4>
            <p>{item.subscribers || item.artist}</p>
          </div>
        )}
      </Carousel>}
    </section>
  );
}

export default Category;