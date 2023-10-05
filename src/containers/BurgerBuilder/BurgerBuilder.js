import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 15,
  cheese: 25,
  meat: 30,
  chicken: 20
};
export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
          salad:0,
          chicken:0,
          cheese:0, 
          meat:0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false
      }

    purchaseHandler = () => {
      this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
      alert('you continue')
    }

    updatePurchaseState = (ingredients) => {
      
      const sum = Object.keys(ingredients).map(igKey => {
        return ingredients[igKey];
      }).reduce((sum,el) =>{
        return sum + el;
      },0);
      this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount+1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      if (oldCount <= 0){
        return;
      }
      const updatedCount = oldCount-1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceAddition;
      this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
      this.updatePurchaseState(updatedIngredients);

    }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <div>
        <Aux>
            <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
              <OrderSummary 
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
              />
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
            ingredientAdd={this.addIngredientHandler}
            ingeredientRemove = {this.removeIngredientHandler}
            disabled = {disabledInfo}
            purchasable = {this.state.purchasable}
            ordered = {this.purchaseHandler}
            price={this.state.totalPrice}/>
        </Aux>
      </div>
    )
  }
}
