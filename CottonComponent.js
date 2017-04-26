import React from 'react';
import warning from 'warning';
import UserActionPerformer from './UserActionPerformer';

export default class CottonComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	perform(userAction) {
		this.context.userActionPerformer.perform(this, userAction);
	}

	performSeries(userActions) {
		this.context.userActionPerformer.performSeries(this, userActions);
	}
}

CottonComponent.contextTypes = {
	userActionPerformer: React.PropTypes.instanceOf(UserActionPerformer)
};
