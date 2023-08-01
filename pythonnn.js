// const redux=require('redux')
// const { createStore } = require('redux');
import redux from 'redux'
import { createStore,applyMiddleware,combineReducers } from 'redux';
import logger from 'redux-logger'
import axios from "axios"
import thunk from 'redux-thunk'


//the stye we have defined is string so there can be typo error so defining constants can automaticaaly make you aware about
//error and this consts must be declaerd before store
const incre="account/incre"
const decre="account/decre"
const increByAmount="account/increByAmount"
const userAccFulfilled="account/Fulfilled"
const userAccRejected="account/Rejected"
const userAccPending="account/Pending"
const increment="bonus/increment"

//store creation and passing reducer
// applyMiddleware will contain all the middleware names in its parameter
const store=createStore(combineReducers({
    account:AccountReducer,
    bonus:BonusReducer
}),applyMiddleware(logger.default,thunk.default))
//here when logger only is put it will give error so put logger.default

//this is the ouput of logger middleware it gives prev state,
//action and next state  this states is given by logger middleware other middlewares do other functions
// [ { amount: 2 } ]
//  action incre @ 10:56:02.227
//    prev state { amount: 1 }
//    action     { type: 'incre' }
//    next state { amount: 2 }
// [ { amount: 2 }, { amount: 3 } ]
//  action incre @ 10:56:04.234
//    prev state { amount: 2 }
//    action     { type: 'incre' }
//    next state { amount: 3 }


//ASYNC API CALL
// async function getUser(){
//     const {data}=await axios.get("http://localhost:3000/accounts/2")
//     console.log(data)
// }
// getUser()
// but we want by reducer and not just javascrit functions

//firstofall store is created here we are creating store by create store but now it is not used nowadays configurestore
//is used but for starting we are using createstore 
//here passing reducer is compulsory

//to push every state in this array
const history=[]

function AccountReducer(state={amount:1},action){
    switch(action.type){
        case userAccFulfilled:
            
            return {amount:action.payload,pending:false}
        case userAccRejected:
            //do not forget to write action.error in key of error
            return {...state,error:action.error,pending:false}
        case userAccPending:
            return {...state,pending:true}
        case incre:
            return {amount:state.amount+1}
        case decre:
            return {amount:state.amount-1}
        case increByAmount:
            return {amount:state.amount+action.payload}
        default:
            return state
    }
}

function BonusReducer(state={points:0},action){
  switch(action.type){
    //case incre://so when this case is incre which is same name as in account reducer so when you run this bonusreducers
    //incre account reducers incre will also run so to avoid that donnot give the same name
    case increment:
          return {points:state.points+1}
    case increByAmount:
        if(action.payload>100)
        return {points:state.points+10}
    
//     action increByAmount @ 18:06:41.328
//       prev state { account: { amount: 601 }, bonus: { points: 30 } }
//       action     { type: 'increByAmount', payload: 200 }
//       next state { account: { amount: 801 }, bonus: { points: 40 } }
//    [
//      { account: { amount: 201 }, bonus: { points: 10 } },
//      { account: { amount: 401 }, bonus: { points: 20 } },
//      { account: { amount: 601 }, bonus: { points: 30 } },
//      { account: { amount: 801 }, bonus: { points: 40 } },
//      { account: { amount: 1001 }, bonus: { points: 50 } }
//    ]
//     action increByAmount @ 18:06:43.328
//       prev state { account: { amount: 801 }, bonus: { points: 40 } }
//       action     { type: 'increByAmount', payload: 200 }
//       next state { account: { amount: 1001 }, bonus: { points: 50 } }
    default:
        return state
  }
}

//reducer accepts action and state and return state this state which it returns is called new state  
// function reducer(state={amount:1},action){
//     if(action.type===incre){
        
//             return{ amount:state.amount+1}
//             //immutability---the below statement is wrong bcoz by doing this the initail state is changed and
//             //now the new state is 2 which should not be done
//     //         return {state.amount :state.amount+1}
//     }
// //now making more actions
// if(action.type===decre){
//     return {amount:state.amount-1}
// }
// if(action.type===increByAmount){
//     return{amount:state.amount+action.payload}
// }
//     return state
// }
//out put will be
// action decre @ 11:03:27.394
// prev state { amount: 0 }
// action     { type: 'decre' }
// next state { amount: -1 }
// [ { amount: 0 }, { amount: -1 }, { amount: -2 } ]
// action decre @ 11:03:29.409
// prev state { amount: -1 }
// action     { type: 'decre' }
// next state { amount: -2 }



//global state
 store.getState()  //-------> this is a function which is used to check or get the current state of the store

//getting state
//subscribe method of store is used to when the reducer runs the of course will change so
//the state will change so now bydefault subscribe will run and now we can see new state 
// store.subscribe(()=>console.log(store.getState()))


//to push the store to history array made above

store.subscribe(()=>{
  history.push(store.getState())
  console.log(history)
}
)//---->output----[ { amount: 2 } ]
// [ { amount: 2 }, { amount: 3 } ]
// [ { amount: 2 }, { amount: 3 }, { amount: 4 } ]

//action creator ----bcoz writing this store.dispatch({type:"increByAmount",payload:4}) can cause error

function krisha(){
    return {type:incre}
    //output will be same
}
function uv(){
    return {type:increment}
    // return {type:incre}//the reason why this should not be used is written in its reducer
}
function mahir(value){
    return {type:increByAmount,payload:value}
}
function bella(){
    return{type:decre}
}
function userAccountRejected(error){
    return{type:userAccRejected,error:error}
}
function userAccountPending(){
    return{type:userAccPending}
}
//writing directly async await will give error that actions must be plain objects and not async await so to remove
//this error we use thunk middleware 

//dispatch and get state is given bcoz we are using thunk to remove the error of async and await
// async function initial(dispatch,getState){
//     const {data} = await axios.get("http://localhost:3000/accounts/1")
//     dispatch({type:init,payload:data.amount})

   //}
      //OOOOOOOOOOOOOORRRRRRRRRRRR

function userAccountFulfilled(value){
    return {type:userAccFulfilled,payload:value}
}
    //output when the value is 500
//     [ { amount: 500 }, { amount: 500 } ]
//     action init @ 15:48:03.675
//       prev state { amount: 500 }
//       action     { type: 'init', payload: 500 }
//       next state { amount: 500 }
//    [ { amount: 500 }, { amount: 500 }, { amount: 500 } ]
//     action init @ 15:48:05.684
//       prev state { amount: 500 }
//       action     { type: 'init', payload: 500 }
//       next state { amount: 500 }
// async function getUser(dispatch,getState){
//     const {data}=await axios.get("http://localhost:3000/accounts/1")

   
//     dispatch(initUser(data.amount))
 //} 

  //if id have to put dynamically
  function getUserAcc(id){
    return async(dispatch,getState)=>{
        try{
            dispatch(userAccountPending())
            const {data}=await axios.get(`http://localhost:3000/accounts/${id}`)
            dispatch(userAccountFulfilled(data.amount))
        }catch(error){
            dispatch(userAccountRejected(error.message))
        }
   
    }
 }
 //output
//  action undefined @ 16:53:08.288
//  prev state { amount: 1 }
//  action     [AsyncFunction (anonymous)]
//  next state { amount: 1 }
// [ { amount: 100 } ]
// action init @ 16:53:08.484
//  prev state { amount: 1 }
//  action     { type: 'init', payload: 100 }
//  next state { amount: 100 }



// function vish(){
//     return{type:increByAmount,payload:3}
// }
//OR
function vish(value){
    return{type:increByAmount,payload:value}
    //return{type:"increByAmount",payload:value} type is string without constant is make so there cn be typo error so constants are used
}

setTimeout(()=>{
    //without thunck------this will take input object which is returned by the function(action creator)
//    store.dispatch(initial())

   //while using thunck------will directly return the function
//   store.dispatch(initial)

//write this when u split the axios function into 2
// store.dispatch(getUserAcc(1))
// store.dispatch(mahir(200))
store.dispatch(getUserAcc(2))

//    store.dispatch(vish(7)) ------when payload is by value
   //payload is the extra information
   //below is there output
   //[ { amount: 5 } ]
//  action increByAmount @ 11:08:49.110
//  prev state { amount: 1 }
//  action     { type: 'increByAmount', payload: 4 }
//  next state { amount: 5 }
// [ { amount: 5 }, { amount: 9 } ]
// action increByAmount @ 11:08:51.111
//  prev state { amount: 5 }
//  action     { type: 'increByAmount', payload: 4 }
//  next state { amount: 9 }

},2000)
//----output--{ amount: 2 }
// { amount: 3 }
// { amount: 4 }
// { amount: 5 }
// { amount: 6 }
// { amount: 7 }
// { amount: 8 }




//but now creating an action
// store.dispatch({type:"incre"}) // dispatch is in interval so from here it is commented out

