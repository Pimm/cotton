import warning from 'warning';

export default class UserActionPerformer {
	constructor(bubbleState) {
		this.bubbleState = bubbleState;
		this.mostRecentPerformanceIdentifier = -1;
	}

	/**
	 * Performs the single passed user action.
	 */
	perform(component, userAction) {
		const result = userAction(
			// Pass setState, which updates the state of the performing component.
			component.setState.bind(component),
			// Pass bubbleState, which updates the state of one of the parents of the component, likely the root component.
			this.bubbleState,
			{
				// Pass this function which allows the user action to block until competing user actions have completed.
				blockForCompetition: function() {
				},
				// Pass a unique performance identifier. In case the user action does not block, this identifier can help tell
				// apart the state changes of one performance from the state changes of another.
				performanceIdentifier: ++this.mostRecentPerformanceIdentifier
			}
		);
		if (process.env.NODE_ENV !== 'production') {
			warning(undefined === result || undefined !== result.then, 'A user action must return undefined or a promise');
		}
		return result;
	}

	/**
	 * Performs the passed user actions one after the other, stopping after the first user action which returns a promise
	 * which rejects.
	 */
	performSeries(component, userActions) {
		
	}
}
