import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl  from './BuildControl/BuildControl'

export default function BuildControls(props) {
    const controls = [
        {label:'Salad', type:'salad'},
        {label:'Chicken', type:'chicken'},
        {label:'Cheese', type:'cheese'},
        {label:'Meat', type:'meat'},

    ]
  return (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>₹ {props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl 
        key={ctrl.label} 
        label={ctrl.label}
        added={()=>props.ingredientAdd(ctrl.type)}
        removed={()=>props.ingeredientRemove(ctrl.type)}
        disabled = {props.disabled[ctrl.type]}/>
      ))}
      <button className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>OREDER NOW</button>
    </div>
  )
}
