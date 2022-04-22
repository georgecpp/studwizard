import gql from "graphql-tag";
import React, {useContext,useRef,useState} from "react";
import { useQuery, useMutation } from "@apollo/client";
import {Button, Card,Grid, Form, Icon, Label,Image, Rating} from 'semantic-ui-react';
import moment from "moment";
import { AuthContext } from "../context/auth";
import { useHistory, Link } from "react-router-dom";
import MyPopup from "../util/MyPopup";


function Profile(props) {

    const username = props.match.params.username;
    const {user} = useContext(AuthContext);
    const {data} = useQuery(FETCH_USER_QUERY, {
        variables: {
            username
        }
    });
    let profileMarkup;
    if(!data) {
        profileMarkup = <p>Loading profile...</p>   
    }
    else {
        const {id, email, username, createdAt, name, img, role,phoneNumber, aboutMe, educationHistory, experience} = data.getUser;
        profileMarkup = (role == 2) ? (
            <Card centered>
                <Image src={img} wrapped ui={false} />
                <Card.Content>
                <Card.Header>{name} ~ {username}</Card.Header>
                <Card.Meta>Joined {moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description style={{fontSize:15}}>
                    {aboutMe}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Label as='a'>
                        <Icon name='phone' />
                        {phoneNumber}
                    </Label>
                    <Label as='a'>
                        <Icon name='mail' />
                        {email}
                    </Label>
                    <Label as='a'>
                        <Icon name='building' />
                        {educationHistory.lastInstitution}
                    </Label>
                    <Label as='a'>
                        <Icon name='fork' />
                        {educationHistory.teachPlacePreference}
                    </Label>
                    <Label as='a'>
                        <Icon name='time' />
                        {experience.expYears}
                    </Label>
                    <Label as='a'>
                        <Icon name='user md' />
                        {experience.numberOfMeditations}
                    </Label>
                    <Label as='a'>
                        <Icon name='star' />
                        {experience.score}
                    </Label>
                </Card.Content>
                <Card.Content extra>
                  Rating: 
                 <Rating icon='star' defaultRating={5} maxRating={5} />
                </Card.Content>
            </Card>
        ) : (
            <Card centered>
                <Image src={img} wrapped ui={false} />
                <Card.Content>
                <Card.Header>{name} ~ {username}</Card.Header>
                <Card.Meta>Joined {moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                    
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Label as='a'>
                            <Icon name='mail' />
                            {email}
                    </Label>
                </Card.Content>
            </Card>
        )
    }
 return profileMarkup;
}


const FETCH_USER_QUERY = gql`
query($username: String!) {
    getUser(username: $username) {
      id
      email
      username
      createdAt
      name
      img
      role
      phoneNumber
      aboutMe
      educationHistory {
        lastInstitution
        teachPlacePreference
      }
      experience {
        expYears
        numberOfMeditations
        score
      }
    }
  }
`;

export default Profile;