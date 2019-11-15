import React from 'react';
import Client from "../../Clients/Client";
import { Table } from 'reactstrap'

class MatchTable extends React.Component{
    constructor(props){
            super(props)
            this.state = {
                matches: [],
                users: new Map()
            }
    }

    componentDidMount() {
        this.getMatches()
    }

    getMatches = () => {
        Client.matches()
            .then(response => {
                console.log(response);
                const user_ids = []
                response.data.forEach(element => {
                    user_ids.push(element.user1_id)
                    if(element.user2_id) {
                        user_ids.push(element.user2_id)
                    }
                })
                this.setState({ matches: response.data });
                this.getUserNames(user_ids)
            })
            .catch(console.log);
        setTimeout(this.getMatches, 2000);
    };

    getUserNames = (user_ids) => {
        user_ids.forEach(user_id => {
            if (!(this.state.users.get(user_id))) {
                Client.getUser(user_id)
                    .then(response => {
                        const { users } = this.state;
                        console.log(response);
                        users.set(user_id, response.data.name);
                        this.setState({ users });
                    })
                    .catch(console.log);
            }
        });
      };

    render() {

        const items = []
        for (const [index, value] of this.state.matches.entries()) {
            items.push(
                <tr>
                    <td scope="row">{value.user2_id ? 'Spectate' : 'Join'}</td>
                    <td>{this.state.users.get(value.user1_id)}</td>
                    <td>{this.state.users.get(value.user2_id)}</td>
                    <td>{value.game_configuration_id}</td>
                </tr>
            )
        }

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Join / Spectate</th>
                        <th>Player 1</th>
                        <th>Player 2</th>
                        <th>Configuration</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        );
    }
}

export default MatchTable;