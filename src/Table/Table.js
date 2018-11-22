import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { select } from "../_actions/select.js";
import { changeFilter } from "../_actions/changeFilter.js";
import "./Table.css";

import Filters from "./Filters/Filters.js";
import BulletinTable from "./BulletinTable/BulletinTable.js";

class Table extends Component {
  constructor(props) {
    super(props);
    this.selectHandler = this.selectHandler.bind(this);
    this.sortParams = this.props.filter.sortParams;
    this.changeSortParams = this.changeSortParams.bind(this);
  }
  selectHandler(b) {
    this.props.select(b);
  }

  changeSortParams(paramName) {
    var isParamExists = false;
    this.sortParams.forEach(param => {
      if (param.fieldName === paramName) {
        param.inDesc = !param.inDesc;
        isParamExists = true;
      }
    });
    if (!isParamExists) {
      this.sortParams.push({
        fieldName: paramName,
        inDesc: true
      });
    }
  }

  render() {
    return (
      <div>
        <div className="infoPanel">{this.props.info}</div>
        <header>
          <Filters
            sortParams={this.sortParams}
            changeFilter={this.props.changeFilter}
            filter={this.props.filter}
            users={this.props.users}
          />
        </header>
        <div>
          <BulletinTable
            changeSortParams={this.changeSortParams}
            bulletins={this.props.bulletins}
            users={this.props.users}
            sortParams={this.sortParams}
            selectHandler={this.selectHandler}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bulletins: state.bulletins,
    filter: state.filter,
    users: state.users,
    info: state.info
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      select: select,
      changeFilter: changeFilter
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Table);
