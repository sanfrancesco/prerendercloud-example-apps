window.App = React.createClass({
  getInitialState() {
    return {
      ajax: '',
      numbers: Array.apply(null, Array(5)).map((n,i) => i)
    }
  },

  doAjaxReq() {
    window.fetch('/ajax')
        .then(res => res.text())
        .then(body => this.setState(state => ({ ajax: state.ajax + body })));
  },

  componentDidMount() {
    setTimeout(this.doAjaxReq, 500);
    setTimeout(this.doAjaxReq, 1);
  },

  render() {
    let els = this.state.numbers.map(n => (<span key={n}>{n}</span>));
    return (
      <div>
        <h1>ReactJS test for http://www.prerender.cloud</h1>
        <p>with 2 React roots, 2 ajax requests and dangerouslySetInnerHTML</p>
        <div>{this.state.ajax}</div>
        <div dangerouslySetInnerHTML={{__html: `'<&>'`}} />
        {els}
      </div>
    )
  }
});

