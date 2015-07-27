import React from 'react';
import styles from './WorkSpace.css';
import withStyles from '../../decorators/withStyles';
import Expression from '../Expression';

var ExpSingle = "E_SINGLE";

@withStyles(styles)
class WorkSpace {

	render() {
    return (
      <div className="WorkSpaceBox">
        <Expression ExpType={ExpSingle} />
      </div>
    );
	}
}

export default WorkSpace;