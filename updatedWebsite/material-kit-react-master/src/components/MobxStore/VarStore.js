import { action, observable, decorate } from 'mobx';
import axios from 'axios';

class VarStore {
	traitList = ['Achiever', 'Activator', 'Adaptability', 'Analytical', 'Arranger', 'Belief', 'Command', 'Communication', 'Competition', 'Connectedness', 'Consistency', 'Context', 'Deliberative', 'Developer', 'Discipline', 'Empathy', 'Focus', 'Futuristic', 'Harmony', 'Ideation', 'Includer', 'Individualization', 'Input', 'Intellection', 'Learner', 'Maximizer', 'Positivity', 'Relator', 'Responsibility', 'Restorative', 'Self-assurance', 'Significance', 'Strategic', 'Woo'];
	temp = 'asdf';
	currentTraits = [];
	selectedTraits = [];
	hasChosenTraits = false;
	currentUser = '';
	currentPass = '';
	visibleName = '';
	loggedIn = false;
	addTrait(currentOne) {
		var traitName = currentOne.trait
		if(!this.currentTraits.includes(traitName)){
			if(this.currentTraits.length < 5){
				this.currentTraits.push(traitName)
			}
		}else{
			var traitIndex = this.currentTraits.indexOf(traitName)
			this.currentTraits.splice(traitIndex, 1)
		}
	}
	setTraits() {
		var i
		var inputList = this.currentTraits
		if(inputList.length ==5){
			this.selectedTraits = []
			for(i = 0; i <inputList.length; i++){
				this.selectedTraits.push(inputList[i])
			}
			this.hasChosenTraits = true
			this.loginFunc()
		}else{
			this.hasChosenTraits = false
			alert("PLEASE SELECT 5 TRAITS")
		}
	}
	async loginFunc(){
		//Below endpoint is for testing
		//var apiEndpoint = 'http://127.0.0.1:5000/login'

		//Below endpoint is for prod/when on AWS
		var apiEndpoint = 'http://3.82.207.245/login'
		axios.post(apiEndpoint, {
			'command': this.currentTraits,
			'username': this.currentUser,
			'password': this.currentPass
		})
			.then(response => this.loginHelper(response));
	}
	async loginHelper(serverResponse){
		console.log(serverResponse.data)
		var authenticationStatus = serverResponse.data['AUTH']
		console.log(authenticationStatus)
		if(authenticationStatus){
			this.loggedIn = true
			this.visibleName = serverResponse.data['ID']
			console.log(this.loggedIn)
			console.log(this.visibleName)
		}
	}
	async logoutFunc(){
		//Below endpoint is for testing
		//var apiEndpoint = 'http://127.0.0.1:5000/logout'

		//Below endpoint is for prod/when on AWS
		var apiEndpoint = 'http://3.82.207.245/logout'
		axios.post(apiEndpoint, {
			'command': 'logout'
		})
			.then(response => this.logoutHelper(response));
	}
	async logoutHelper(responseFromServer){
		console.log(responseFromServer)
		var authenticationStatus = responseFromServer['AUTH']
		if(!authenticationStatus){
			this.loggedIn = false
			this.visibleName = ''
			console.log(this.loggedIn)
		}
	}
	setUsername(newName){
		this.currentUser = newName
	}
	setPassword(newPass){
		this.currentPass = newPass
	}
	resetTraits(){
		this.currentTraits = []
		this.hasChosenTraits = false
	}
}

decorate(VarStore, {
    traitList: observable,
    temp: observable,
    currentTraits: observable,
    selectedTraits: observable,
    hasChosenTraits: observable,
    currentUser: observable,
    currentPass: observable,
    addTrait: action,
    setTraits: action,
    loginFunc: action,
    loginHelper: action,
    logoutFunc: action,
    logoutHelper: action,
    setUsername: action,
    setPassword: action,
    resetTraits: action
})

const varSet = new VarStore();
export default varSet;