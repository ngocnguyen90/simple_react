import React from 'react';

class UserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {searchDelay}=this.props
    return (
      <div className="learn-react">
        <input onChange={(e) => searchDelay(e.target.value)}/>
      </div>
    );
  }
}

export default UserSearch;
