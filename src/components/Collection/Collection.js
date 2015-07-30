import React, { PropTypes } from 'react';
import styles from './Collection.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Collection {

  static propTypes = {
    CollType: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
      	{this.props.CollType}
      </div>
    );
  }
}

export default Collection;