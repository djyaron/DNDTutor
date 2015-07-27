import React from 'react';
import styles from './Expression.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Expression {

  render() {
	return (
	  <div>
	    {this.props.ExpType}
	  </div>
	);
  }
}

export default Expression;