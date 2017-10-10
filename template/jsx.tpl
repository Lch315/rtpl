import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';<% if (needRedux) { %>
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';<% } %><% if (!isComponent) { %>
import JSBridge from 'za-jsbridge';<% } %>

class <%=name%> extends Component {<% if (isComponent) { %>
  static propTypes = {

  };

  static defaultProps = {

  };<% } else { %>
  static contextTypes = {
    router: PropTypes.object.isRequired
  };<% } %>

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <article className="">
        
      </article>
    );
  }
}
<% if (needRedux) { %>
export default connect(
  state => ({

  }),
  dispatch => (
    {
      actions: bindActionCreators(
        {
          
        },
        dispatch
      ),
    }
  )
)(<%=name%>);<% } else { %>
export default <%=name%>;<% } %>
