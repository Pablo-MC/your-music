import { useHistory } from 'react-router';
import classes from './Category.module.css';

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const Category = (props) => {
  const history = useHistory();

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
      <h2>{props.title}</h2>
      {<Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {props.items.map(item =>
          <div key={item.id} className={classes.item}>
            <img
              src={item.imgURL}
              alt={item.name || item.album}
              className={classes[`${props.category}`]}
              onClick={(e) => categoryHandler(props.category, e.target.alt)}
            />
            <h4>{item.name || item.album}</h4>
            <p>{item.subscribers || item.artist}</p>
          </div>
        )}
      </Carousel>}
    </section>
  );
}

export default Category;