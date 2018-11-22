import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./BulletinTable.css";

class BulletinTable extends Component {
  constructor(props) {
    super(props);
  }
  handleRowClick(b) {
    this.props.selectHandler(b);
    this.props.history.push("/bulletin");
  }

  handleParamClick(paramName) {
    this.props.changeSortParams(paramName);
  }

  render() {
    return (
      <div className="wholeTable">
        <table>
          <caption>Объявления</caption>
          <thead>
            <tr>
              <th onClick={() => this.handleParamClick("number")}>Номер</th>
              <th onClick={() => this.handleParamClick("created")}>Создано</th>
              <th onClick={() => this.handleParamClick("text")}>Объявление</th>
              <th onClick={() => this.handleParamClick("rating")}>Рейтинг</th>
              <th onClick={() => this.handleParamClick("user")}>
                Пользователь
              </th>
            </tr>
          </thead>

          <tbody>
            {this.props.bulletins.map(b => (
              <tr onClick={() => this.handleRowClick(b)}>
                <td>{b.number}</td>
                <td>{b.created.toLocaleString()}</td>
                <td>{b.text}</td>
                <td>{b.rating}</td>
                <UserName users={this.props.users} bulletin={b} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class UserName extends Component {
  constructor(props) {
    super(props);
    const userId = this.props.bulletin.userId;
    this.user = this.props.users.filter(function(u) {
      if (u.id === userId) return u;
    })[0];
  }

  render() {
    return <td>{this.user.name}</td>;
  }
}

BulletinTable = withRouter(BulletinTable);
export default BulletinTable;
