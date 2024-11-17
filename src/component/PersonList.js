import React, { Component } from 'react';
import axios from 'axios';

class PersonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: []
        };
    }

    componentDidMount = () => {
        axios.get('https://randomuser.me/api/?results=10')
            .then(response => {
                this.setState({ persons: response.data.results });
            })
            .catch(error => {
                console.error("Some Error is occured while fetching the Data:", error);
            });
    };
    
    handleDetailsClick = (person) => {
        alert(`Details of $${person.name.first} ${person.name.last}:\n
        Email: ${person.email}\n
        Phone: ${person.phone}\n
        Address: ${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.country}`);
    };

    render() {
        return (
            <div>
                <h2 style={{ backgroundColor: 'Blue', textAlign: 'center' }}>User List</h2>
                {this.state.persons.map((person, index) => (
                    <div key={index} style={{ backgroundColor: 'skyblue' }}>
                        <img src={person.picture.large} alt={`${person.name.first} ${person.name.last}`} />
                        <h3>{person.name.title} {person.name.first} {person.name.last} - {person.login.uuid}</h3>
                        <p>User Name: {person.login.username}</p>
                        <p>Gender: {person.gender}</p>
                        <p>Time Zone: {person.location.timezone.description}</p>
                        <p>Address: {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.country}</p>
                        <p>Email: {person.email}</p>
                        <p>Birth Date: {person.dob.date} ({person.dob.age} years)</p>
                        <p>Register Date: {person.registered.date}</p>
                        <p>Phone: {person.phone}</p>
                        <p>Cell: {person.cell}</p>
                        <button onClick={() => this.handleDetailsClick(person)}>Details</button>
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}

export default PersonList;
