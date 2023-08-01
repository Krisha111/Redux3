import redux from 'redux'
import { createStore,applyMiddleware,combineReducers } from 'redux';
import logger from 'redux-logger'
import axios from "axios"
import thunk from 'redux-thunk'

const incre="incre"
const decre="decre"
const increByAmount="increByAmount"
const init="init"
const mahir="mahir"

const store=createStore(combineReducers({
    account:AccountReducer,
    bonus:BonusReducer
}),applyMiddleware(logger.default,thunk.default))

const history=[]

function AccountReducer(state={amount:1},action){
    switch(action.type){
        case init:
            return {amount:action.payload}
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
    case mahir:
        return {points:state.points+1}
    default:
        return state
  }
}
store.getState() 

store.subscribe(()=>{
    history.push(store.getState())
    console.log(history)
  }
  )

 function krisha(){
    return {type:incre}
}
function uv(){
    return {type:mahir}
}
function bella(){
    return{type:decre}
}
function initUser(value){
    return {type:init,payload:value}
}
function getUser(id){
    return async(dispatch,getState)=>{
        const {data}=await axios.get(`http://localhost:3000/accounts/${id}`)
        dispatch(initUser(data.amount))
    }
 }
function vish(value){
    return{type:increByAmount,payload:value}
}

setInterval(()=>{ 
  store.dispatch(uv())
},2000)

