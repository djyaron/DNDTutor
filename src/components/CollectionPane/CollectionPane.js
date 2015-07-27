import React from 'react';
import styles from './CollectionPane.css';
import withStyles from '../../decorators/withStyles';
import Expression from '../Expression';
import Collection from '../Collection';

var ExpSingle = "E_SINGLE";

@withStyles(styles)
class CollectionPane {

  render() {
  	var Collections = this.props.collections.map(function(collection) {
      return (
      	<Collection CollType={collection} />
      );
    }, this);
    return (
      <div className="CollectionTabs">
      	{Collections}
      </div>
    );
  }
}

export default CollectionPane;