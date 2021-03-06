import React, { useState, useContext } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import { AuthContext } from '../context/auth';

function MenuBar() {
  const {user, logout} = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const menuBar = user ? (
    <Menu pointing secondary size='massive' stackable>
      <Menu.Item
        name={user.username}
        as={Link}
        active={activeItem === user.username}
        onClick={handleItemClick}
        to={`/profile/${user.username}`} 
        >
      <div>
        <Image src={user.img} avatar />
        <span>{user.username}</span>
      </div>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item
          name='meditators'
          active={activeItem === 'meditators'}
          onClick={handleItemClick}
          as={Link}
          to="/meditators"
        />
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
            name='logout'
            onClick={logout}
            as={Link}
            to="/"
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position='right'>
        <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  )

    return menuBar;
} 

export default MenuBar;