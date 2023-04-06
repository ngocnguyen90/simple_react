import React from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom';

class UserLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false,
    };
  }

  componentWillReceiveProps(props) {
    const { users } = props;
    if (_.isEmpty(users)) this.setState({ notFound: true });
    else this.setState({ notFound: false });
  }

  remove(id){
    const {handleRemove} = this.props
    handleRemove(id)
  }

  render() {
    const { users } = this.props;
    const { notFound } = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Job</th>
              <th>Age</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {!notFound && (
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.job}</td>
                    <td>{user.age}</td>
                    <td>
                      <Link to={`/users/edit/${user.id}`}>
                        <button type="button">edit</button>
                      </Link>
                    </td>
                    <td>
                      <button type="button" onClick={()=>this.remove(user.id)}>remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {notFound && <span style={{margin: '20px'}}>Not Found!</span>}
      </div>
    );
  }
}

export default UserLists;
