import gql from "graphql-tag";
import React, {useContext,useRef,useState} from "react";
import { useQuery, useMutation } from "@apollo/client";
import {Button, Card,Grid, Form, Icon, Label,Image, Rating, Transition} from 'semantic-ui-react';
import moment from "moment";
import { AuthContext } from "../context/auth";
import { useHistory, Link } from "react-router-dom";
import MyPopup from "../util/MyPopup";
import Profile from "./Profile";


function Meditators(props) {
    const {
        loading,
        data
    } = useQuery(FETCH_MEDITATORS);
    var meditators;
    if(data) {
        meditators = data.getMeditators;
    }

    return (
        <Grid columns={1}>
            <Grid.Row className="page-title">
                <h1>The Wizards</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading meditators...</h1>
                ) : (
                    <Transition.Group>
                        {meditators && meditators.map(meditator => (
                            <Grid.Column key={meditator.username} style={{marginBottom:20}}>
                                <Profile username={meditator.username}/>
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_MEDITATORS = gql`
{
    getMeditators {
    username
  }
}
`;

export default Meditators;