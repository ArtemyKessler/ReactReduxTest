import React, { Component } from "react";
import DatePicker from "react-datepicker";
import SearchInput, { createFilter } from "react-search-input";
import { Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import "./Filters.css";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.filter.userId;
    this.startDate = this.props.filter.startDate;
    this.endDate = this.props.filter.endDate;
    this.searchText = this.props.filter.searchText;
    this.rowsSelected = this.props.filter.pageFilter.pageSize;
    this.page = this.props.filter.pageFilter.page;

    this.onUserChange = this.onUserChange.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onTextSearchChange = this.onTextSearchChange.bind(this);
    this.onRowsSelectedChange = this.onRowsSelectedChange.bind(this);
  }

  onUserChange(e) {
    this.user = e.target.value;
    this.changeFilter();
  }

  onStartDateChange(e) {
    this.startDate = e;
    this.changeFilter();
  }

  onEndDateChange(e) {
    this.endDate = e;
    this.changeFilter();
  }

  onTextSearchChange(e) {
    this.searchText = e.value;
    this.changeFilter();
  }

  onRowsSelectedChange(e) {
    this.rowsSelected = e.target.value;
    this.changeFilter();
  }

  pageMinus() {
    if (this.page > 1) {
      this.page--;
      this.changeFilter();
    }
  }

  pagePlus() {
    if (this.page < 99) {
      this.page++;
      this.changeFilter();
    }
  }

  changeFilter() {
    this.props.changeFilter({
      sortParams: this.props.sortParams,
      pageFilter: {
        page: this.page,
        pageSize: this.rowsSelected
      },
      userId: this.user,
      startDate: this.startDate,
      endDate: this.endDate,
      searchText: this.searchText,
      rowsSelected: this.rowsSelected
    });
  }

  render() {
    return (
      <div className="filtersWithPages">
        <div className="filters">
          <div>
            <Link to="./bulletin">
              <button className="addButton">Добавить</button>
            </Link>
          </div>
          <div>
            <div>Пользователь</div>
            <input
              onChange={this.onUserChange}
              type="text"
              list="users"
              value={this.user}
            />
            <datalist id="users">
              {this.props.users.map(u => (
                <option>{u.name}</option>
              ))}
            </datalist>
          </div>
          <div className="datepickers">
            <div> От </div>
            <DatePicker
              onChange={this.onStartDateChange}
              selected={this.startDate}
            />
            <div> До </div>
            <DatePicker
              onChange={this.onEndDateChange}
              selected={this.endDate}
            />
            <div />
          </div>
          <div className="search">
            <SearchInput
              onChange={this.onTextSearchChange}
              value={this.searchText}
            />
          </div>
          <div className="rowsSelect">
            <select
              onChange={this.onRowsSelectedChange}
              value={this.rowsSelected}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        </div>
        <div className="pageSelector">
          <button onClick={() => this.pageMinus()} className="addButton">
            Назад
          </button>
          <input disabled type="number" defaultValue="1" value={this.page} />
          <button onClick={() => this.pagePlus()} className="addButton">
            Вперед
          </button>
        </div>
      </div>
    );
  }
}

export default Filters;
