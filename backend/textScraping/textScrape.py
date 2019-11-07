import json

def getWhoAmI():
	fullArray = []
	finalNameArray = []
	finalTraitArray = []
	reader = open('dynamicsText.txt', 'r')
	lastName = ''
	traitList = []
	tempLine = []
	for line in reader:
		if "who_am_i_" in line:
			if "string-array" not in line:
				thing = line
				newText = thing[32:-9]
				seperated = newText.split('_')
				tempName = seperated[0]
				tempTrait = seperated[1]
				if tempName == 'self':
					tempName = 'selfAssurance'
					tempTrait = seperated[2]
				if tempName == 'discpline':
					tempName = 'discipline'
				if tempName == lastName:
					if tempName == 'achiever' and len(traitList) == 5:
						traitList.append(tempTrait)
						tempLine.append(lastName)
						tempLine.append(traitList)
						fullArray.append(tempLine)
						finalNameArray.append(lastName)
						finalTraitArray.append(traitList)
					else:
						traitList.append(tempTrait)
				else:
					tempLine.append(lastName)
					tempLine.append(traitList)
					finalNameArray.append(lastName)
					finalTraitArray.append(traitList)
					traitList = [tempTrait]
					lastName = tempName
					tempLine = []
					fullArray.append(tempLine)
	reader.close()
	finalNameArray.pop(0)
	finalTraitArray.pop(0)
	return fullArray, finalTraitArray, finalNameArray

def getADJS():
	reader = open('dynamicsText.txt', 'r')
	finalNameADJ = []
	finalADJArray = []
	currentTraits = []
	for line in reader:
		thing = line
		if "adjective" in line:
			if 'string-array' not in line:
				tempSent = thing[34:-9]
				sept = tempSent.split('_')
				currentTraits.append(sept[1])
				if finalNameADJ[len(finalNameADJ)-1] == 'woo' and len(currentTraits) == 10:
					finalADJArray.append(currentTraits)
			else:
				finalNameADJ.append(thing[35:-3])
				finalADJArray.append(currentTraits)
				currentTraits = []
	reader.close()
	finalADJArray.pop(0)
	return finalNameADJ, finalADJArray

def getDescriptions():
	reader = open('secondTeamDynText.txt', 'r')
	nameList = []
	descriptionList = []
	for line in reader:
		if 'description_' in line:
			anotherVar = line
			messyName = anotherVar[30:50]
			name = messyName.split('"')[0]
			nameList.append(name)
			messyDescription = anotherVar[30:-10]
			description = messyDescription.split('>')[1]
			descriptionList.append(description)
	reader.close()
	return nameList, descriptionList

def getHates():
	reader = open('secondTeamDynText.txt', 'r')
	nameList = []
	hateList = []
	for line in reader:
		if 'hate_' in line:
			anotherTempLine = line
			messyName = anotherTempLine[23:50]
			if '_' not in messyName:
				name = messyName.split('"')[0]
				nameList.append(name)
				#print(name)
				descripVar = anotherTempLine[23:-10]
				descriptor = descripVar.split('>')[1]
				#print(descriptor)
				hateList.append(descriptor)
	reader.close()
	return nameList, hateList

def getBrings():
	reader = open('secondTeamDynText.txt', 'r')
	nameList = []
	bringList = []
	for line in reader:
		if 'bring_' in line:
			anotherTempLine = line
			messyName = anotherTempLine[24:-10]
			if '_' not in messyName:
				name = messyName.split('"')[0]
				nameList.append(name)
				bringDes = messyName.split('>')[1] 
				bringList.append(bringDes)
	reader.close()
	return nameList, bringList

def getNeeds():
	reader = open('secondTeamDynText.txt', 'r')
	nameList = []
	needList = []
	counter = 0
	for line in reader:
		if 'need_' in line:
			anotherTempLine = line
			messyName = anotherTempLine[23:-10]
			if '_' not in messyName:
				counter = counter + 1
				name = messyName.split('"')[0]
				needDescription = messyName.split('>')[1]
				nameList.append(name)
				needList.append(needDescription)
	reader.close()
	return nameList, needList

def toJSON():
	a,b,c = getWhoAmI()
	first, second = getADJS()
	varNames, varDescriptions = getDescriptions()
	n,h = getHates()
	bringNames, bringDesc = getBrings()
	needNames, needDescr = getNeeds()
	data = {}
	data['traits'] = []
	counter = 0
	for i in range(len(b)):
		name = str(c[i])
		for j in range(len(first)):
			if name == first[j]:
				adjArr = second[j]
			if name.lower() == varNames[j].lower():
				descripArr = varDescriptions[j]
			if name.lower() == n[j].lower():
				hateVar = h[j]
			if name.lower() == bringNames[j].lower():
				bringVar = bringDesc[j]
			if name.lower() == needNames[j].lower():
				needVar = needDescr[j]
		data['traits'].append({
			'name':c[i],
			'description': descripArr,
			'hates': hateVar,
			'brings': bringVar,
			'needs': needVar,
			'whoAmI':b[i],
			'Adjectives':adjArr
		})
	with open('cliftonTraits.json', 'w') as outfile:
		json.dump(data, outfile, indent=4)

toJSON()







