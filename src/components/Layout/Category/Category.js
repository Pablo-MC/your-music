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
    <div className={classes.category}>
      <h1>{props.title}</h1>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        className={classes.item}
      >
        {props.items.map(item =>
          <div key={item.id}>
            <img src={item.img} alt={item.artist} />
            <h4>{item.artist}</h4>
            <p>{item.subscribers}</p>
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Category;