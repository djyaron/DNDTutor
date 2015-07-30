import React, { PropTypes } from 'react';
import styles from './ProblemStatement.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class ProblemStatement {

  static PropTypes = {
    statement: PropTypes.string.isRequired
  }

  render() {
  	return (
  	  <div className="ProblemStatementHeader">
  		  {this.props.statement}
  	  </div>
  	);
  }
}

export default ProblemStatement;