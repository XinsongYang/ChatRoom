import React from 'react'
import { Card, Content } from 'reactbulma'

function Users(props) {
    const usernames = props.users.map((user) =>
        <li key={user.username}>{user.username}</li>
    );
    return (
        <Card className="room-card">
            <Card.Header>
                <Card.Header.Title>
                    Users
                </Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <Content>
                    <ul>{usernames}</ul>
                </Content>
            </Card.Content>
        </Card>
    )
}


export default Users