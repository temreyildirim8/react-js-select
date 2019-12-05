import React, { Component } from "react";

class PaymentSelect extends Component {
  constructor(props) {
    super();
    this.state = {
      formLineCss: "form-line",
      value: "",
      selectedLabel: "",
      isOpened: false,
      data: null,
      searchText: ""
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.refresh) {
      this.handleClick("", "");
    }
    // console.log('[Select] in the componentWillReceiveProps', nextProps)
    // if (nextProps.value) {
    //   let selectedLabel = '';
    //   if (nextProps.data.length > 0) {

    //     for (var option of nextProps.data) {
    //       console.log(option)
    //       if (nextProps.value === option.value) {
    //         console.log('Found')
    //         selectedLabel = option.label;
    //         break;
    //       }
    //     }
    //     this.setState({
    //       selectedLabel: selectedLabel
    //     })
    //     console.log('[Select] selected label', selectedLabel)
    //   };

    // }
  }

  openMenu = () => {
    this.setState({
      isOpened: !this.state.isOpened
    });
    this.txtbox.focus(); //input ref
  };

  handleClick = (val, label) => {
    this.setState({
      value: val,
      selectedLabel: label
    });
    if (this.props.onSelected) {
      this.props.onSelected(val, label);
    }
  };

  getOptions = searchText => {
    let data = this.props.data.slice();
    if (searchText) {
      data = data.filter(option => option.label.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    }
    let options = data.map((option, index) => {
      return this.getOption(option.value, option.label, index);
    });
    return options;
  };

  getOption = (val, label, key) => {
    return (
      <li key={key} onClick={() => this.handleClick(val, label)}>
        <a tabIndex="0" data-tokens="null">
          <span className="text">{label}</span>
          <span className="glyphicon glyphicon-ok check-mark" />
        </a>
      </li>
    );
  };

  filterData = evt => {
    this.setState({
      searchText: evt.target.value
    });
  };

  render() {
    const options = this.getOptions(this.state.searchText);

    const selectMenuCss = "btn-group bootstrap-select form-control show-tick";
    return (
      <div className={selectMenuCss}>
        <button
          type="button"
          className="btn dropdown-toggle btn-default"
          data-toggle="dropdown"
          title={this.state.value}
          onClick={this.openMenu}
          aria-expanded="false"
        >
          <span className="filter-option pull-left" style={{ textAlign: "center" }}>
            {this.state.selectedLabel ? this.state.selectedLabel : this.props.label}
          </span>
          <span className="bs-caret">
            <span className="caret" />
          </span>
        </button>
        <div className="dropdown-menu open" style={{ maHeight: "559px", overflow: "hidden", minHeight: "40px" }}>
          <div>
            <input
              type="text"
              className="form-control"
              autoComplete="off"
              value={this.props.textBox ? this.props.textBox : " "}
              onChange={this.filterData}
              ref={txtbox => {
                this.txtbox = txtbox;
              }}
            />
          </div>
          <ul
            className="dropdown-menu inner"
            role="menu"
            style={{ maxHeight: "509px", overflowY: "auto", minHeight: "0px" }}
            data-live-search="true"
          >
            {options}
          </ul>
        </div>
      </div>
    );
  }
}

export default PaymentSelect;
