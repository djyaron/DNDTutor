import React, { PropTypes } from 'react';
import styles from './CollectionPane.css';
import withStyles from '../../decorators/withStyles';
import Collection from '../Collection';
import Expression from '../Expression';
import Term from '../Term';

import CollectionPaneStore from '../../stores/CollectionPaneStore';

function getStateFromStores() {
  return {
    currentCollection: CollectionPaneStore.getCurrentCollection()
  };
}

@withStyles(styles)
class CollectionPane extends React.Component {
  static propTypes = {
    collections: PropTypes.array.isRequired,
    templates: PropTypes.array.isRequired,
    givens: PropTypes.array.isRequired,
    molwt: PropTypes.array.isRequired
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
    var Templates = this.props.templates;
    var Givens = this.props.givens;
    var MolWt = this.props.molwt;
  	var Collections = this.props.collections.map(function(collection) {
      return ( <Collection CollType={collection} key={collection} currColl={this.state.currentCollection} /> );
    }, this);
    var TempPane = Templates.map(function(template) {
      return ( <Expression ExpType={template.Type} key={template.Type} ExpA={template.ExpA} ExpB={template.ExpB} /> );
    }, this);
    var GivPane = Givens.map(function(given) {
      return ( <Term ValueTop={given.ValueTop} UnitTop={given.UnitTop} ValueBot={given.ValueBot} UnitBot={given.UnitBot} key={given.ValueTop + given.UnitTop + given.ValueBot + given.UnitBot} /> );
    }, this);
    var MolWtPane = MolWt.map(function(mw) {
      return ( <Term ValueTop={mw.ValueTop} UnitTop={mw.UnitTop} ValueBot={mw.ValueBot} UnitBot={mw.UnitBot} key={mw.ValueTop + mw.UnitTop + mw.ValueBot + mw.UnitBot} /> );
    }, this);

    switch (this.state.currentCollection) {
      case "TEMPLATES":
        return (
          <div className="CollectionPane">
            <div className="CollectionTabs">
              {Collections}
            </div>
            <div className="CollectionCurrent">
              {TempPane}
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
              {GivPane}
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
              {MolWtPane}
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