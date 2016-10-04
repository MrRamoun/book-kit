import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  screenshot: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number,
};
function Tile(props) {
  const style = {
    backgroundImage: `url(${props.screenshot})`,
  };

  const title = props.title.length > 50 ? props.title.slice(0, 50).concat('...') : props.title;

  return (
    <li className="bookmark-tile col-md-3">
      <Link to={`/bookmarks/${props.id}`}>
        <h3>
          <div className="bg" style={style} />
          <span>
            {title}
          </span>
        </h3>
      </Link>
    </li>
  );
}

Tile.propTypes = propTypes;

module.exports = Tile;
