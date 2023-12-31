import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export default function Layout(props) {
  return (
      <Aux>
        <SideDrawer/>
        <Toolbar/>
        <main className={classes.Content}>{props.children}</main>
      </Aux>
  )
}
