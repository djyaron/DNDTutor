import React, { PropTypes } from 'react';
import styles from './Collection.css';
import withStyles from '../../decorators/withStyles';

import { selectCollection } from '../../actions/CollectionPaneActionCreators'

@withStyles(styles)
class Collection extends React.Component {
  static propTypes = {
    CollType: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.selCol = this.selCol.bind(this);
  }

  selCol() {
    selectCollection(this.props.CollType);
  }

  render() {
    var coll_name = this.props.CollType;
    return (
      <div onClick={this.selCol.bind(this)}>
      	{coll_name}
      </div>
    );
  }
}

export default Collection;