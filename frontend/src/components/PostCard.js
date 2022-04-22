import React, {useContext} from 'react';
import {Button, Card, Icon, Label,Image} from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';

import {Link} from 'react-router-dom';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';


function PostCard({post: {body, createdAt, id, username, likeCount, commentCount, likes, userimg}}) {
    
    const {user} = useContext(AuthContext);

    return (
        <Card fluid onClick={() => {}} >
            <Card.Content as={Link} to={user ? `/posts/${id}` : '/login'}>
                <Image
                floated='right'
                size='mini'
                src={userimg}
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description style={{fontWeight: 'bold',fontSize: 25, textColor:'black', marginTop: 25, textAlign: 'center', "overflow":"hidden", "text-overflow": "ellipsis"}}>
                    {body}
                </Card.Description>
                <Card.Description style={{textAlign:"center", marginTop:25}}>
                    <Image src='https://cdn-icons-png.flaticon.com/128/4207/4207253.png'/>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <LikeButton user={user} post={{id, likes, likeCount}} />
            <MyPopup
                content="Comment on post"
                >
                    <Button labelPosition='right' as={Link} to={user ? `/posts/${id}` : '/login'}>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
            </MyPopup>
            {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    )
}

export default PostCard;