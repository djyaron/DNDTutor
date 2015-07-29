import React from 'react';
import styles from './Collection.css';
import withStyles from '../../decorators/withStyles';
import Expression from '../Expression';

var ExpSingle = "E_SINGLE";

@withStyles(styles)
class Collection {

  render() {
    return (
      <div>
      	{this.props.CollType}
      </div>
    );
  }
}

export default Collection;