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
      	<Collection CollType={collection} key={collection} />
      );
    }, this);
    return (
      <div className="CollectionPane">
        <div className="CollectionTabs">
        	{Collections}
        </div>
        <div className="CollectionCurrent">
          <Expression ExpType={"dunno"} />
        </div>
      </div>
    );
  }
}

export default CollectionPane;