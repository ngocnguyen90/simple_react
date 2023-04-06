import React from 'react';
import { USER_DATA } from '../constants/constants';
import UserLists from '../components/users/userLists';
import UserSearch from '../components/users/userSearch';
import { Switch, Link, Route } from 'react-router-dom';
import _ from 'lodash';
import UserAdd from '../components/users/userAdd';
import UserEdit from '../components/users/userEdit';

class User extends React.Component {
  constructor(props) {
    super(props);
    const users = USER_DATA.sort((a, b) => b.id - a.id);
    this.state = {
      users,
      searchData: users,
      timeout: null,
      title: null,
    };
  }

  componentWillMount() {
    this.setState({ title: 'User Lists' });
  }

  searchDelay(query) {
    const { users, timeout } = this.state;
    if (timeout) clearTimeout(timeout);
    const searchTimeout = setTimeout(() => {
      if (!_.isEmpty(query)) {
        this.setState({
          searchData: this.searching(query),
        });
      } else this.setState({ searchData: users });
    }, 300);
    this.setState({ timeout: searchTimeout });
  }

  searching(query) {
    const { users } = this.state;

    return users.filter((item) => {
      return (
        +item.id === +query ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.age.toString().includes(query) ||
        item.job.toLowerCase().includes(query)
      );
    });
  }

  addUser(data) {
    const { users } = this.state;
    const newUsers = [
      {
        ...data,
        id:
          users.length > 0
            ? users.reduce((acc, item) =>
                acc.id > item.id ? acc.id : item.id
              ) + 1
            : 1,
      },
      ...users,
    ];
    this.setState({
      users: newUsers,
      searchData: newUsers,
    });
  }

  handleRemove(id) {
    const { users } = this.state;
    const newUsers = users.filter((item) => item.id !== id);
    this.setState({
      users: newUsers,
      searchData: newUsers,
    });
  }

  handleEdit(id, data) {
    const { users } = this.state;
    const newUsers = users.reduce((acc, item) => {
      if (parseInt(id) === item.id) acc.push(data)
      else acc.push(item)
      return acc
    }, []);
    this.setState({
      users: newUsers,
      searchData: newUsers,
    });
  }

  render() {
    const { users, searchData, title } = this.state;
    return (
      <div>
        <h3 style={{ margin: '20px' }}>{title}</h3>
        <Switch>
          <Route
            path="/users"
            exact
            render={() => (
              <div>
                <Link to="/users/add">
                  <button
                    style={{ marginLeft: '20px' }}
                    type="button"
                  >
                    Add User
                  </button>
                </Link>
                <UserSearch
                  searchDelay={(query) => this.searchDelay(query)}
                />
                <UserLists
                  users={searchData}
                  handleRemove={(id) => this.handleRemove(id)}
                />
              </div>
            )}
          />
          <Route
            path="/users/add"
            exact
            render={() => (
              <UserAdd addUser={(data) => this.addUser(data)} />
            )}
          />
          <Route
            path="/users/edit/:id"
            exact
            render={() => (
              <UserEdit
                users={users}
                handleEdit={(id, data) => this.handleEdit(id, data)}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default User;
