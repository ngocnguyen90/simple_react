import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class UserAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      userData: {
        name: '',
        job: '',
        age: 1,
      },
    };
  }

  submit() {
    const { userData } = this.state;
    const { addUser } = this.props;
    addUser(userData);
    this.setState({ redirect: true });
  }

  render() {
    const { userData, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/users" />;
    }
    let options = [];
    for (let i = 1; i < 101; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return (
      <div className="learn-react">
        <input
          type="text"
          value={userData.name}
          onChange={(e) =>
            this.setState({
              userData: { ...userData, name: e.target.value },
            })
          }
        />
        <input
          type="text"
          value={userData.job}
          onChange={(e) =>
            this.setState({
              userData: {
                ...userData,
                job: e.target.value,
              },
            })
          }
        />
        <select
          value={userData.age}
          onChange={(e) =>
            this.setState({
              userData: {
                ...userData,
                age: e.target.value,
              },
            })
          }
        >
          {options}
        </select>
        <button onClick={() => this.submit()}>Save</button>
        <Link to="/users">
          <button type="button">Cancel</button>
        </Link>
      </div>
    );
  }
}

export default UserAdd;
