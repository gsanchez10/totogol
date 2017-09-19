import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class Authentication extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if(!this.props.authenticated) {
				this.context.router.push('/entrar');				
			}
		}

		componentWillUpdate(nextProps) {
			if(!nextProps.authenticated) {
				this.context.router.push('/entrar');
			}
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	function mapStateToProps(state) {
		return { authenticated: state.auth.authenticated	};
	}

	return connect(mapStateToProps)(Authentication);
}

/*
// In some other location... Not in this file...
// We want to use this HOC
import Authentication // This is my HOC
import Resources // This is the component I want to wrap

const ComposedComponent = Authentication(Resources);

// In some render method...
<ComposedCompoent resources={resourceList} />
*/