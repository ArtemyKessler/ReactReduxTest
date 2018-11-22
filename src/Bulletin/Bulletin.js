import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import { addBulletin } from "../_actions/addBulletin.js";
import { saveBulletin } from "../_actions/addBulletin.js";
import { deleteBulletin } from "../_actions/deleteBulletin.js";
import { select } from "../_actions/select.js";
import { addUser } from "../_actions/addUser.js";

import "./Bulletin.css";

class Bulletin extends Component {
  constructor(props) {
    super(props);
    this.currentBulletin = this.props.currentBulletin;
    this.text = this.currentBulletin.text;
    this.number = this.currentBulletin.number;
    this.created = this.currentBulletin.created;
    this.rating = this.currentBulletin.rating;
    this.id = this.currentBulletin.id;
    this.userId = this.currentBulletin.userId;
    const id = this.userId;
    this.user = this.props.users.filter(function(u) {
      if (u.id === id) return u;
    })[0];
    this.onNumberChange = this.onNumberChange.bind(this);
    this.onCreatedChange = this.onCreatedChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  deleteButtonHandle() {
    this.props.deleteBulletin(this.currentBulletin);
    this.backToTable();
  }

  saveButtonHandle() {
    const uuidv1 = require("uuid/v1");
    var userId = this.user.id;

    userId = uuidv1();
    this.props.addUser({
      name: this.user.name,
      id: userId
    });

    const now = new Date();
    const nowUtc = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );

    this.props.saveBulletin({
      id: this.id,
      content: this.text,
      number: this.number,
      createdUtc: new Date(
        this.created.getUTCFullYear(),
        this.created.getUTCMonth(),
        this.created.getUTCDate(),
        this.created.getUTCHours(),
        this.created.getUTCMinutes(),
        this.created.getUTCSeconds()
      ),
      updatedUtc: nowUtc,
      deletedUtc: null,
      rating: this.rating,
      userId: this.user.id
    });

    this.backToTable();
  }

  addButtonHandle() {
    const uuidv1 = require("uuid/v1");
    var userId = this.user.id;

    userId = uuidv1();
    this.props.addUser({
      name: this.user.name,
      id: userId
    });

    const now = new Date();
    const nowUtc = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );

    this.props.addBulletin({
      id: uuidv1(),
      content: this.text,
      number: this.number,
      createdUtc: new Date(
        this.created.getUTCFullYear(),
        this.created.getUTCMonth(),
        this.created.getUTCDate(),
        this.created.getUTCHours(),
        this.created.getUTCMinutes(),
        this.created.getUTCSeconds()
      ),
      updatedUtc: nowUtc,
      deletedUtc: null,
      rating: this.rating,
      userId: "60557bf0-1607-4525-aaa5-33a1c81b7695"
    });

    this.backToTable();
  }

  cancelButtonHandle() {
    this.backToTable();
  }

  backToTable() {
    this.props.history.push("/");
  }

  onNumberChange(e) {
    this.number = e.target.value;
    this.select();
  }

  onCreatedChange(e) {
    this.created = e;
    this.select();
  }

  onUserChange(e) {
    this.user.name = e.target.value;
    this.select();
  }

  onTextChange(e) {
    this.text = e.target.value;
    this.select();
  }

  select() {
    const b = {
      text: this.text,
      number: this.number,
      created: this.created,
      rating: this.rating,
      id: this.id,
      user: this.userId
    };
    this.props.select(b);
  }

  render() {
    return (
      <div className="bulletin">
        <h2>Объявление</h2>
        <div className="itemContainer">
          <div className="item">
            <div>Номер</div>
            <input
              onChange={this.onNumberChange}
              type="number"
              min="0"
              value={this.number}
            />
          </div>
          <div className="item">
            <div>Создано</div>
            <DatePicker
              withPortal
              onChange={this.onCreatedChange}
              selected={this.created}
            />
          </div>
          <div className="item">
            <div>Пользователь</div>
            <input
              required
              list="users"
              value={this.user.name}
              onChange={this.onUserChange}
            />
            <datalist id="users">
              {this.props.users.map(u => (
                <option>{u.name}</option>
              ))}
            </datalist>
          </div>
          <div className="item">
            <div>Текст</div>
            <textarea
              cols="40"
              rows="3"
              value={this.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="item">
            <select value={this.rating}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
            <div className="hint">От 1 до 10</div>
          </div>
          <div className="item">
            <button
              onClick={() => this.deleteButtonHandle()}
              className="deleteButton"
            >
              Удалить
            </button>

            <button
              onClick={() => this.addButtonHandle()}
              className="acceptButton"
            >
              Добавить
            </button>

            <button
              onClick={() => this.saveButtonHandle()}
              className="acceptButton"
            >
              Сохранить
            </button>

            <button
              onClick={() => this.cancelButtonHandle()}
              className="acceptButton"
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentBulletin: state.changeCurrentBulletin,
    users: state.users
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addUser: addUser,
      addBulletin: addBulletin,
      saveBulletin: saveBulletin,
      deleteBulletin: deleteBulletin,
      select: select
    },
    dispatch
  );
}

Bulletin = withRouter(Bulletin);

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Bulletin);
