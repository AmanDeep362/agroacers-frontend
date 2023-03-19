import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Loader from "../Loader";

class UserData extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
      dataslice :10
    };
  
  }
  
  // ComponentDidMount is used to
  // execute the code
  componentDidMount() {
    fetch("/AdminAgroAcers362/UserDetails")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
  }

  render() {
    const { DataisLoaded, items } = this.state;
    
    items.reverse();
    if (!DataisLoaded)
      return (
         <Loader />
      );

    return (
      <div className="text-center">
       <h1 className="m-3 mb-4 text-decoration-underline"  style={{fontSize: '3rem', color: '#77bc3f'}}>User Details</h1>
        <table className="table table-light table-striped">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Time of register</th>
              <th>Admin Access</th>
            </tr>
          </thead>

          <tbody>
             {items.map((item) => (   
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>{item.time}</td>
                <td>{(item.isAdmin==true)?<button style={{backgroundColor:"lightgreen"}}>You Already Admin</button>:<button onClick={async ()=>{
                  const id = item._id;
                  const res =  await fetch("/makeAdmin" ,{
                    method : "POST",
                    headers : { 
                        "content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        id
                    })
                });
              }} style={{backgroundColor:"lightyellow"}}>Give Admin Access</button>}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserData;
