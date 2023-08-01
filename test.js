const state={account:{amount:1},bonus:{points:1}}
// const newState={accountL:state.account,bonus:state.bonus.points+1}

//to avoid changing the initial state value to something different is
const newState={accountL:{...state.account},bonus:state.bonus.points+1}

console.log(newState)//output --{ accountL: { amount: 1 }, bonus: 2 }
state.account.amount=100
console.log(state)
console.log(newState)
//here after adding state.account.amount=100 both states becomes 100  and account=1 is removed from initial state which 
//we should avoid doing
//{ accountL: { amount: 1 }, bonus: 2 }
// { account: { amount: 100 }, bonus: { points: 1 } }
// { accountL: { amount: 100 }, bonus: 2 }