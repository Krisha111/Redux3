//creating our first store
const redux=require('redux')
const { createStore } = require('redux');

//first redux action
const BUY_CAKE='BUY_CAKE'

function buycake(){
    return{//curly brackets bcoz action is an obj 
        type:'BUY_CAKE',
        info:'this is redux action'//you can add anything after type
}
}

//making first reducers
const initialState={
    noOfCakes:10
}
//takes two parameters initial state of app and action to be done on it
const reducer=(state=initialState,action)=>{
  switch(action.type){
    case('BUY_CAKE'):return{//CURLY BRACKETS as it is an obj
       ...state,//if there are more parameters in initialState than if we want to change only one parameter reducer will create the replica of cuuernt state and only changes one parameter
       noOfCakes:state.noOfCakes-1
    }
    default : return state
  }
}

//first store
const store = createStore(reducer)
console.log(store.getState())
const unsubscribe=store.subscribe(()=>console.log("Updated state" , store.getState()))
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())
store.dispatch(buycake())
unsubscribe()
