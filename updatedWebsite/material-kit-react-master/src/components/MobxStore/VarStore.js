import { action, observable, decorate } from 'mobx';
import axios from 'axios';

class VarStore {
	traitList = ['Achiever', 'Activator', 'Adaptability', 'Analytical', 'Arranger', 'Belief', 'Command', 'Communication', 'Competition', 'Connectedness', 'Consistency', 'Context', 'Deliberative', 'Developer', 'Discipline', 'Empathy', 'Focus', 'Futuristic', 'Harmony', 'Ideation', 'Includer', 'Individualization', 'Input', 'Intellection', 'Learner', 'Maximizer', 'Positivity', 'Relator', 'Responsibility', 'Restorative', 'SelfAssurance', 'Significance', 'Strategic', 'Woo'];
	temp = 'asdf';
	currentTraits = [];
	selectedTraits = [];
	hasChosenTraits = false;
	currentUser = '';
	currentPass = '';
	visibleName = '';
	loggedIn = false;
	traitsWithDescriptions = [];
	traitTabSection = [];
	goToTimerPage = false;
	descriptionForTimer = '';
	currentTime = 30;
	activityPage = '';
	activityTitle = '';
	activityParagraph = '';
	activityTimerTitle = '';
	timerButtonText = 'Start Timer';
	textValue: '';
	textPageTitle = '';
	goToWhoAmIPage = false;
	firstTrait = '';
	firstNoun = '';
	secondTraits = [];
	secondBackupTraits = [];
	whoAmINames = [];
	whoAmIAdjs = [];
	whoAmILines = [];
	shouldResetTimer = false;
	testVar = 'a';
	loadingResponse = false;
	incorrectLogin = false;
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
		if(inputList.length === 5){
			this.selectedTraits = []
			for(i = 0; i <inputList.length; i++){
				this.selectedTraits.push(inputList[i])
			}
			this.hasChosenTraits = true
			this.getTraitInfo()
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
		this.loadingResponse = true
		axios.post(apiEndpoint, {
			'command': this.currentTraits,
			'username': this.currentUser,
			'password': this.currentPass
		})
			.then(response => this.loginHelper(response));
	}
	async loginHelper(serverResponse){
		var authenticationStatus = serverResponse.data['AUTH']
		this.loadingResponse = false
		console.log(this.loadingResponse)
		if(authenticationStatus){
			this.loggedIn = true
			this.incorrectLogin = false
			this.visibleName = serverResponse.data['ID']
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
		var authenticationStatus = responseFromServer['AUTH']
		if(!authenticationStatus){
			this.loggedIn = false
			this.visibleName = ''
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
	async getTraitInfo(){
		//Below endpoint is for testing
		//var apiEndpoint = 'http://127.0.0.1:5000/returnTraits'

		//Below endpoint is for prod/when on AWS
		var apiEndpoint = 'http://3.82.207.245/returnTraits'
		axios.post(apiEndpoint, {
			'command': 'giveMeInfo',
			'traitList': this.currentTraits
		})
			.then(response => this.traitInfoHelper(response));
	}
	traitInfoHelper(httpResponse){
		this.traitsWithDescriptions = httpResponse.data['traitList']
	}
	updateActivityInfo(){
		this.currentTime = 30
		this.goToTimerPage = false
		if(this.activityPage === 'personalValues'){
			this.activityTitle = 'Whats worse?'
			this.activityParagraph = 'I Hate '
			this.activityTimerTitle = 'Talk about why you hate:'
		}else if (this.activityPage === 'teamContribution'){
			this.activityTitle = 'What resonates with you?'
			this.activityParagraph = 'I Bring '	
			this.activityTimerTitle = 'Talk about how you bring:'	
		} else if (this.activityPage === 'personalEnergizers'){
			this.activityTitle = 'What feels right?'
			this.activityParagraph = 'I Need '	
			this.activityTimerTitle = 'Talk about why you need:'
		}else if (this.activityPage === 'myMindSet1'){
			this.activityTitle = 'For your next task, which strength will be most useful?'
			this.activityParagraph = ''	
			this.activityTimerTitle = 'Consider how you can be a '
		}
	}
	selectLines(currentOne) {
      var tempLine = currentOne
      this.testVar = tempLine
      if(!this.whoAmILines.includes(tempLine)){
        this.whoAmILines.push(tempLine)
      }else{
        var lineIndex = this.whoAmILines.indexOf(tempLine)
        this.whoAmILines.splice(lineIndex, 1)
      }
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
    traitsWithDescriptions: observable,
    goToTimerPage: observable,
    currentTime: observable,
    activityPage: observable,
    activityTitle: observable,
    activityParagraph: observable,
    activityTimerTitle: observable,
    timerButtonText: observable,
    textValue: observable,
    textPageTitle: observable,
    goToWhoAmIPage: observable,
    firstTrait: observable,
    firstNoun: observable,
    secondTraits: observable,
    secondBackupTraits: observable,
    whoAmINames: observable,
    whoAmIAdjs: observable,
    shouldResetTimer: observable,
    testVar: observable,
    loadingResponse: observable,
    incorrectLogin: observable,
    addTrait: action,
    setTraits: action,
    loginFunc: action,
    loginHelper: action,
    logoutFunc: action,
    logoutHelper: action,
    setUsername: action,
    setPassword: action,
    resetTraits: action,
    getTraitInfo: action,
    traitInfoHelper: action,
    updateActivityInfo: action,
    selectLines: observable,
})

const varSet = new VarStore();
export default varSet;