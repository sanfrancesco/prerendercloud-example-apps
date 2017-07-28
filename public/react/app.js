if (!window.__PRELOADED_STATE__) window.__PRELOADED_STATE__ = {};
// must pass callback instead of promise
// because if we already have the data from server
// we must return it synchronously
const fetchRemote = (path, cb) => {
  if (window.__PRELOADED_STATE__ && window.__PRELOADED_STATE__[path])
    return cb(null, window.__PRELOADED_STATE__[path]);

  return window.fetch(path).then(buff => buff.text()).then(data => {
    window.__PRELOADED_STATE__[path] = data;
    cb(null, data);
  });
};

const RootSibling1 = React.createClass({
  getInitialState() {
    return {};
  },
  componentWillMount() {
    fetchRemote("/xhr/ajax" + this.props.id, (err, data) => {
      this.setState(state => ({ body: data + " for Root Sibling 1" }));
    });
  },
  render() {
    return <div>RootSibling1: {this.state.body || "Empty State"}</div>;
  }
});
const RootSibling2 = React.createClass({
  getInitialState() {
    return {};
  },
  componentWillMount() {
    fetchRemote("/xhr/ajax" + this.props.id, (err, data) => {
      this.setState(state => ({ body: data + " for Root Sibling 2" }));
    });
  },
  render() {
    return <div>RootSibling2: {this.state.body || "Empty State"}</div>;
  }
});

window.App = React.createClass({
  getInitialState() {
    return {};
  },

  componentWillMount() {
    fetchRemote("/xhr/ajax" + this.props.id, (err, data) => {
      this.setState(state => ({ ajax: data }));
    });
  },

  render() {
    return (
      <div>
        <h1>
          React SSR Test ID: {this.props.id}: {this.state.ajax || "Empty State"}
        </h1>
        <RootSibling1 id={this.props.id} />
        <RootSibling2 id={this.props.id} />
        <div dangerouslySetInnerHTML={{ __html: `'<&>'` }} />
      </div>
    );
  }
});

// this HOC will have the same depth as what it wraps (<App />) so
// it tests that our server-side renderer can handle HOCs
function EmptyWrapperHoc(Component) {
  return React.createClass({
    get displayName() {
      return "EmptyWrapperHOC";
    },
    componentWillMount() {
      // give it enough delay so it updates state AFTER
      // the other instance at depth 0 so we know that our
      // state tree can disambiguate between nodes at same
      // depth
      setTimeout(() => this.setState({ ready: true }), 500);
    },
    render() {
      return <Component {...this.props} />;
    }
  });
}

window.App = EmptyWrapperHoc(window.App);
// this React tree will look like:
//   EmptyWrapperHoc or App
//     RootSibling1
//     RootSibling2
