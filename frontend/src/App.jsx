import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
import axios from 'axios';
import { CommonHeader, CommonFooter, Banner, Room, LoginForm, SignupForm, NotFound } from './components/index';
import './style.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: null
        };

        this.setUser = this.setUser.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await axios.get('/api/user/info');
            this.setState({
                user: response.data.user
            });
        } catch(error) {
            console.log(error.response.data.message);
        }
        this.setState({
            loading: false
        });
    }
    
    setUser(user) {
        this.setState({ user: user });
    }

    async logout() {
        try {
            let response = await axios.get('/api/user/logout');
            this.setState({
                user: null
            });
        } catch(error) {
            message.error(error.message.error);
        }
    }

    render() {
        if (this.state.loading) {
            return (<div></div>)
        }
        return (
            <Router>
                <Layout>
                    {this.state.user && <CommonHeader user={this.state.user} onLogout={this.logout} />}
                    <Banner />
                    <Content className="container">
                        <Switch>
                            <Route exact path="/" render={() => (
                                this.state.user ? (
                                    <Room user={this.state.user}/>
                                ) : (
                                    <Redirect to="/login"/>
                                )
                            )}/>
                            <Route path="/login" render={() => (
                                this.state.user ? (
                                    <Redirect to="/"/>
                                ) : (
                                    <LoginForm setUser={this.setUser}/>
                                ) 
                            )}/>
                            <Route path="/signup" render={() => (
                                this.state.user ? (
                                    <Redirect to="/"/>
                                ) : (
                                    <SignupForm setUser={this.setUser}/>
                                )
                            )}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    <CommonFooter />
                </Layout>                   
            </Router>
        );
    }
}

export default App;