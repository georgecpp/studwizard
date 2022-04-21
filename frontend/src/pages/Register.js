import React from "react";
import {Grid, Container, Card} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

function Register() {

    const history = useHistory();

    return (
        <Container style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <Grid columns={2} centered style={{marginBottom: 35}}>
                <Grid.Row>
                    <h1 style={{color:"black", fontSize: 35, marginBottom: 35}}>Who are you gonna be, wanderer?</h1>
                </Grid.Row>
                <Grid.Column width={6}>
                    <Card
                    fluid
                    image='https://cdn-icons-png.flaticon.com/512/560/560216.png'
                    header='User'
                    description='Regular user. Can see posts, like them, comment on them, rate the meditator etc.'
                    onClick={() => history.push('/register/user')}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Card
                    fluid
                    image='https://cdn-icons-png.flaticon.com/512/2332/2332801.png'
                    header='Meditator'
                    description='Meditator. Can post meditation announcements, receive stars, and has overall score.'
                    onClick={() => history.push('/register/meditator')}
                    />
                </Grid.Column>
            </Grid>  
        </Container>
      
    );
}
export default Register;