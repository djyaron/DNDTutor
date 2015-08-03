import React, { PropTypes } from 'react';
import styles from './CollectionPane.css';
import withStyles from '../../decorators/withStyles';
import Collection from '../Collection';
import Expression from '../Expression';
import Term from '../Term';

var ExpPlus = "+";
var TermABC = "ABC";

@withStyles(styles)
class CollectionPane {

  static propTypes = {
    collections: PropTypes.array.isRequired
  };

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
          <Expression ExpType={ExpPlus} ExpA={"Empty"} ExpB={"Empty"} />
          <Term TermType={TermABC} />
        </div>
      </div>
    );
  }
}

export default CollectionPane;