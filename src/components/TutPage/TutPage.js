import React, { PropTypes } from 'react';
import styles from './TutPage.css';
import withStyles from '../../decorators/withStyles';
import ProblemStatement from '../ProblemStatement';
import WorkSpace from '../WorkSpace';
import CollectionPane from '../CollectionPane';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

/* Replace the following variables with your desired question, solution, and givens */

var SampleProblemStatement = "How many moles are in 100 grams of H2O?";
var SampleSolution = ["50mol","9"];
var SampleCollections = ["TEMPLATES","GIVENS","MW"];

var Templates = [
  {Type:"+",ExpA:"Empty",ExpB:"Empty"},
  {Type:"-",ExpA:"Empty",ExpB:"Empty"},
  {Type:"*",ExpA:"Empty",ExpB:"Empty"},
  {Type:"/",ExpA:"Empty",ExpB:"Empty"}
];

var Givens = [
  {ValueTop:100,UnitTop:["g","H2O"],UnitBot:[]},
  {ValueTop:50,UnitTop:["g","H2O"],UnitBot:[]},
  {ValueTop:50,UnitTop:["g","H2O"],ValueBot:3,UnitBot:[]}
];
var MolWt = [
  {ValueTop:34,UnitTop:["g","H2O2"],ValueBot:1,UnitBot:["mol"]},
  {ValueTop:18,UnitTop:["g","H2O"],ValueBot:1,UnitBot:["mol"]}
];

/****** ****** ******                                            ****** ****** ******/

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
    		<WorkSpace solution={SampleSolution} />
    		<CollectionPane collections={SampleCollections} templates={Templates} givens={Givens} molwt={MolWt} />
  	  </div>
  	);
  }
}

export default DragDropContext(HTML5Backend)(TutPage);