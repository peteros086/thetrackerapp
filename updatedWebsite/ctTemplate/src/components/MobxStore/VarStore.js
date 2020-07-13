import { action, observable, decorate } from 'mobx';
import axios from 'axios';

class VarStore {
	currentUser = '';
	currentPass = '';
	visibleName = '';
	loggedIn = false;
	shouldResetTimer = false;
	loadingResponse = false;
	incorrectLogin = false;
	emailUser = '';
	emailPass = '';
	emailList = [];
	emailSubject = '';
	emailBody = '';
	emailRecipient = '';
	pushPageChange = '';
	setEmailUser(name){
		this.emailUser = name
		//console.log(this.emailUser)
	}
	setEmailPass(pass){
		this.emailPass = pass
		//console.log(this.emailPass)
	}
	setEmailSubject(subject){
		this.emailSubject = subject
	}
	setEmailBody(body){
		this.emailBody = body
	}
	setEmailRecipient(addr){
		this.emailRecipient = addr
	}
	switchPage(pageName){
		if(this.loggedIn){
			this.pushPageChange.push(pageName)
		}else{
			this.pushPageChange.push('/')
		}
		
	}
	async getEmailList(historyProps){
		//Below endpoint is for testing
		var apiEndpoint = 'http://127.0.0.1:5000/returnEmails'

		//Below endpoint is for prod/when on AWS
		//var apiEndpoint = 'https://www.thetrackerapp.net/login'

		this.loadingResponse = true
		axios.post(apiEndpoint, {
			'username': this.currentUser,
			'command' : 'getEmails'
		})
			.then(response => this.listHelper(response, historyProps));
	}
	async listHelper(serverResponse, historyProps){
		// Returns a list of emails that need to be sent 
		var isHTML = false
		console.log(serverResponse)
		console.log(serverResponse.data)
		this.emailSubject = serverResponse.data['subject']
		this.emailBody = serverResponse.data['body']
		this.emailRecipient = serverResponse.data['recipient']
		this.pushPageChange = historyProps
		historyProps.push('/landing-page')
	}
	async sendEmail(){
		//Below endpoint is for testing
		var apiEndpoint = 'http://127.0.0.1:5000/sendEmail'

		//Below endpoint is for prod/when on AWS
		//var apiEndpoint = 'https://www.thetrackerapp.net/sendEmail'

		this.loadingResponse = true
		axios.post(apiEndpoint, {
			'user': this.emailUser,
			'pwd': this.emailPass,
			'subject': this.emailSubject,
			'body': this.emailBody,
			'recipient': this.emailRecipient,
			'command' : 'send'
		})
			.then(response => this.emailHelper(response));
	}
	async emailHelper(serverResponse){
		console.log(serverResponse)
		console.log(serverResponse.data['Status'])
	}
	async loginFunc(historyProps){
		//Below endpoint is for testing
		var apiEndpoint = 'http://127.0.0.1:5000/login'

		//Below endpoint is for prod/when on AWS
		//var apiEndpoint = 'https://www.thetrackerapp.net/login'

		this.loadingResponse = true
		axios.post(apiEndpoint, {
			'username': this.currentUser,
			'password': this.currentPass
		})
			.then(response => this.loginHelper(response, historyProps));
	}
	async loginHelper(serverResponse, historyProps){
		var authenticationStatus = serverResponse.data['AUTH']
		this.loadingResponse = false
		console.log(authenticationStatus)
		if(authenticationStatus){
			this.loggedIn = true
			this.incorrectLogin = false
			this.visibleName = serverResponse.data['ID']
			this.getEmailList(historyProps)
		}
	}
	async logoutFunc(){
		//Below endpoint is for testing
		var apiEndpoint = 'http://127.0.0.1:5000/logout'

		//Below endpoint is for prod/when on AWS
		//var apiEndpoint = 'https://www.thetrackerapp.net/logout'

		//Below endpoint is for prod when on GATECH Virtual Machine
		//var apiEndpoint = 'https://teamdynamics.mse.gatech.edu/logout'

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
}

decorate(VarStore, {
    currentUser: observable,
    currentPass: observable,
    loadingResponse: observable,
    incorrectLogin: observable,
    loginFunc: action,
    loginHelper: action,
    logoutFunc: action,
    logoutHelper: action,
    setUsername: action,
    setPassword: action,
    updateActivityInfo: action,
    selectLines: observable,
})

const varSet = new VarStore();
export default varSet;