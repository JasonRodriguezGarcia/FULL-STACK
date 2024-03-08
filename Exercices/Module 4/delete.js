class Home {
	constructor({ type, payment = "renting" }) {
		this.type = type;
		this.payment = payment;
	}

	static homeImprovement(yourHome) {
		return (yourHome.payment === 'mortgage')
	}
}

//Write your code here
let choice1 = new Home({type: "house", payment: "mortgage"}); //?
console.log (`${Home.homeImprovement(choice1)}`); //?
let choice2 = new Home({type: "aparment"}); //?
console.log (`${Home.homeImprovement(choice2)}`); //?