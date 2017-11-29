import os
from flask import *
from dam import *
import sqlite3

app = Flask(__name__)
global accountID
accountID=0
global gameIDs
gameIDs=[]
@app.route('/',methods=['POST', 'GET'])
def index():
	path = "C:\Users\Administrator\Desktop\DAMProject\data.db"
	if request.method == 'POST':
		global accountID
		global gameIDs
		mydata = json.loads(request.form.get('data'))
		if(mydata['cmd']=='login'):
			userName = mydata['account'];
			password = mydata['password'];
			(result, ID)=logIn(userName, password);
			print result
			if result == True:
				result = 'true'
				accountID=ID
				(balance, count, headURL)=getUserInfo(ID);
				userImg = url_for('static', filename=headURL)
			else:
				result = 'false'
			return jsonify(result=result, 
				userName=userName,
				userImg=userImg,
				balanceInfo='$'+str(balance),
				stockSizeInfo=count,
				userID=accountID)
		elif(mydata['cmd']=='gameInfo'):
			print mydata
			num = mydata['num']
			cate = mydata['array']
			(gameID, n, gameIDs) = getGameID(num,cate,gameIDs)
			print gameIDs
			print accountID
			print gameID
			if accountID>0:
				if ownGame(accountID,gameID):
					isBought=1;
				else:
					isBought=0;
			else:
				isBought=0
			(gameURL, gameName, price, gameImgUrl, classification, gameVideoURL, good, bad, soldNum) = getGameInfo(gameID);
			gameURL = url_for('static',filename=gameURL);
			gameImgUrl = url_for('static',filename=gameImgUrl);
			gameVideoURL = "static/videos/1.mp4"
			#gameVideoURL = "../static/"+gameVideoURL;
			#	gameVideoURL = url_for('static',filename=gameVideoURL);
			#print(gameURL, gameName, price, gameImgUrl, classification, gameVideoURL, good, bad, soldNum) 
			#for test
			classificationIcon = url_for('static', filename='images/ui/classificationIcon.png')
			return jsonify(isBought=isBought, gameURL=gameURL, gameName=gameName,
				price=price, gameImgURL=gameImgUrl, gameVideoURL=gameVideoURL,
				classification=classification, 
				goodNum=good, badNum=bad, soldNum=soldNum,
				classificationIcon=classificationIcon)
		elif(mydata['cmd']=="isBad"):
			num = mydata['num']
			cate = mydata['array']
			(gameID, n, gameIDs) = getGameID(num,cate,gameIDs)
			gameID=gameIDs[num-1][0]
			(result, good, bad) = evaluateGame(accountID, gameID, -1)
			print(result)
			print(good)
			return jsonify(goodNum=good,
				badNum=bad)
		elif(mydata['cmd']=="isGood"):
			num = mydata['num']
			cate = mydata['array']
			(gameID, n, gameIDs) = getGameID(num,cate,gameIDs)
			(result, good, bad) = evaluateGame(accountID, gameID, 1)
			print(result)
			print(good)
			return jsonify(goodNum=good,
				badNum=bad)
		elif(mydata['cmd']=='Buy'):
			print "buying!!!"
			num = mydata['num']
			cate = mydata['array']
			(gameID, n, gameIDs) = getGameID(num,cate,gameIDs)
			(result, msg, stock, balance)=buyGame(accountID, gameID)
			print(result)
			if result:
				result="true"
			else:
				result="false"
			print(result, msg, stock, balance)
			return jsonify(result=result, stockSizeInfo=stock, balanceInfo=int(balance))
		elif(mydata['cmd']=='CategoryToList'):
			print mydata
			cate = mydata['category']
			(gameID, n, gameIDs) = getGameID(1,cate,gameIDs)
			return jsonify(len = n)
		elif(mydata['cmd']=='Lib'):
			accountID = mydata['userID']
			n, gameIDs = getGameIDbyAccountID(accountID)
			return jsonify(len = n)
		elif(mydata['cmd']=='Search'):
			searchInfo = mydata['text']
			n,gameIDs = search(searchInfo)
			return jsonify(len = n)
		elif(mydata['cmd']=='gameInfoInit'):
			num = mydata['num']
			cate = mydata['array']
			N, gameIDs = getGameID(num,cate,gameIDs)
			n=num-2
			while(n<0):
				n+=N
			isBoughts=[];gameURLs=[];gameNames=[];prices=[];
			gameImgURLs=[];gameVideoURLs=[];classifications=[];
			goodNums=[];badNums=[];soldNums=[];classificationIcons=[]
			for i in range(7):
				tmp=n+i
				while(tmp>N-1):
					tmp-=N
				gameID=gameIDs[tmp][0]
				if accountID>0:
					if ownGame(accountID,gameID):
						isBought=1;
					else:
						isBought=0;
				else:
					isBought=0
				(gameURL, gameName, price, gameImgURL, classification, gameVideoURL, good, bad, soldNum) = getGameInfo(gameID);
				gameURL = url_for('static',filename=gameURL);
				gameImgURL = url_for('static',filename=gameImgURL);
				gameVideoURL = url_for('static',filename=gameVideoURL);
				classificationIcon = url_for('static', filename='images/ui/classificationIcon.png')
				isBoughts.append(isBought);gameURLs.append(gameURL);gameNames.append(gameName);
				prices.append(price);gameImgURLs.append(gameImgURL);gameVideoURLs.append(gameVideoURL)
				classifications.append(classification);goodNums.append(good);badNums.append(bad);
				soldNums.append(soldNum);classificationIcons.append(classificationIcon)
			print(isBoughts,gameURLs,gameNames,prices,gameImgURLs,gameVideoURLs,classifications,goodNums,badNums,soldNums,classificationIcons)
			return jsonify(isBought=isBoughts, gameURL=gameURLs, gameName=gameNames,
				price=prices, gameImgURL=gameImgURLs, gameVideoURL=gameVideoURLs,
				classification=classifications, 
				goodNum=goodNums, badNum=badNums, soldNum=soldNums,
				classificationIcon=classificationIcons)
	else:
		return render_template('index.html')


if __name__ == '__main__':
	app.run()