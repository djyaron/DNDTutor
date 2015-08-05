import React, { PropTypes } from 'react';
import styles from './CollectionPane.css';
import withStyles from '../../decorators/withStyles';
import Collection from '../Collection';
import Expression from '../Expression';
import Term from '../Term';

import CollectionPaneStore from '../../stores/CollectionPaneStore';

var ExpPlus = "+";
var TermValueZero = 0;
var TermValueOne = 1;
var TermUnitZero = "UZ";
var TermUnitOne = "UO";

function getStateFromStores() {
  return {
    currentCollection: CollectionPaneStore.getCurrentCollection()
  };
}

@withStyles(styles)
class CollectionPane extends React.Component {
  static propTypes = {
    collections: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CollectionPaneStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    CollectionPaneStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getStateFromStores());
  }

  render() {
  	var Collections = this.props.collections.map(function(collection) {
      return (
      	<Collection CollType={collection} key={collection} currColl={this.state.currentCollection} />
      );
    }, this);
    switch (this.state.currentCollection) {
      case "TEMPLATES":
        return (
          <div className="CollectionPane">
            <div className="CollectionTabs">
              {Collections}
            </div>
            <div className="CollectionCurrent">
              <Expression ExpType={ExpPlus} ExpA={"Empty"} ExpB={"Empty"} />
            </div>
          </div>
        );

      case "GIVENS":
        return (
          <div className="CollectionPane">
            <div className="CollectionTabs">
              {Collections}
            </div>
            <div className="CollectionCurrent">
              <Term TermValue={TermValueZero} TermUnit={TermUnitZero} />
            </div>
          </div>
        );

      case "MW":
        return (
          <div className="CollectionPane">
            <div className="CollectionTabs">
              {Collections}
            </div>
            <div className="CollectionCurrent">
              <Term TermValue={TermValueOne} TermUnit={TermUnitOne} />
            </div>
          </div>
        );

      default:
        return (
          <div className="CollectionPane">
            <div className="CollectionTabs">
              {Collections}
            </div>
            <div className="CollectionCurrent">
            </div>
          </div>
        );
    }
  }
}

export default CollectionPane;