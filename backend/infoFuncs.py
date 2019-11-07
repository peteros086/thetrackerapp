import json



def returnSelectedTraits(traitList):
	fileName = './textScraping/cliftonTraits.json'
	dataResponse = {}
	dataResponse['traitList'] = []
	with open(fileName, 'r') as file:
		data = json.load(file)
		for j in range(0, len(traitList)):
			cName = traitList[j].lower()
			for i in range(0,len(data['traits'])):
				jsonName = data['traits'][i]['name'].lower()
				if jsonName == cName:
					description = data['traits'][i]['description']
					brings = data['traits'][i]['brings']
					hates = data['traits'][i]['hates']
					needs = data['traits'][i]['needs']
					#print(data['traits'][i])
					dataResponse['traitList'].append(data['traits'][i])
		file.close()
		return(dataResponse)
 
