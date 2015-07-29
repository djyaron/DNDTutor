import React, { PropTypes } from 'react';
import styles from './TutPage.css';
import withStyles from '../../decorators/withStyles';
import ProblemStatement from '../ProblemStatement';
import WorkSpace from '../WorkSpace';
import CollectionPane from '../CollectionPane';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

var SampleProblemStatement = "This is a sample problem statement.";
var SampleCollections = ["TEMPLATES","GIVENS","MW"];

@withStyles(styles)
class TutPage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'Drag and Drop Tutor';
   	this.context.onSetTitle(title);
	return (
	  <div className="TutPage">
		<ProblemStatement statement={SampleProblemStatement} />
		<WorkSpace />
		<CollectionPane collections={SampleCollections} />
	  </div>
	);
  }
}

export default DragDropContext(HTML5Backend)(TutPage);