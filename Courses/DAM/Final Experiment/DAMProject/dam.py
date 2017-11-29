import sqlite3
path = "C:\Users\Administrator\Desktop\DAMProject\data.db"


global conn
conn = sqlite3.connect(path)
def saveHead(head, accountID):
	path = "defaultPath/"+accountID
	head.save(path,"JPEG")
	return path

	#add new user into database
def newUser(usernames, password, userinfo, head):
	count = conn.execute("select count(accountID) from Account")
	count += 1
	conn.execute("insert into Account values (?,?,?)", 
		(count, username, password))
	conn.execute("insert into Balance values (?,?)", 
		(count, 0))
	headURL = saveHead(head, count)
	conn.execute("insert into userInfo values (?,?,?)", 
		(count, userinfo, headURL))
	return

	#add several new users at one time
	#heads and userinfos should not be NULL
def lotsOfNewUsers(usernames, pasaswords, heads, userinfos):
	count = conn.execute("select count(accountID) from Account")
	count += 1
	for i in range(usernames.length):
		conn.execute("insert into Account values (?,?,?)",
			(count+i, usernames[i]), passwords[i])
		conn.execute("insert into Balance values (?,?)",
			(count+i, 0))
		headURL = saveHead(heads[i], count+i)
		conn.execute("insert into userInfo values (?,?,?)",
			(count, userfinfo, headURL))
	return

	#add user's balance
def reCharge(accountID, money):
	nowBalance = conn.execute("select balance from Balance where accountID=?",(accountID,)).fetchone()[0]
	conn.execute("update Balance set balance=? where accountID=?",(nowBalance+money, accountID))
	return

def ownGame(accountID, gameID):
	flag = conn.execute("select count(accountID) from ownGames where accountID=? and gameID=?",
		(accountID, gameID)).fetchone()[0]
	return flag;

def getGameInfo(gameID):
	(gameURL, gameName, price, gameImgUrl, classif, gameVideoURL) = conn.execute("select url, gameName, price, cell, category, video from Game where gameID=?",(gameID,)).fetchall()[0]
	soldNum = conn.execute("select count(accountID) from ownGames where gameID=?",
		(gameID,)).fetchone()[0]
	good = conn.execute("select count(accountID) from ownGames where gameID=? and evaluate=1",
		(gameID,)).fetchone()[0]
	bad = conn.execute("select count(accountID) from ownGames where gameID=? and evaluate=-1",
		(gameID,)).fetchone()[0]
	return(gameURL, gameName, price, gameImgUrl, classif, gameVideoURL, good, bad, soldNum)
	#
def buyGame(accountID, gameID):
	print(accountID,gameID)
	price = conn.execute("select price from Game where gameID=?", (gameID,)).fetchone()[0]
	nowBalance = conn.execute("select balance from Balance where accountID=?",(accountID,)).fetchone()[0]
	print(price,nowBalance)
	if conn.execute("select count(gameID) from ownGames where accountID=? and gameID=?",
		(accountID,gameID)).fetchone()[0] > 0:
		print "#already own the game"
		return (False, "Already own the Game!")
	if nowBalance < price:
		print "#dont have enough money"
		return (False, "Dont have enough balance!")
	else:
		#balance down and own a game
		conn.execute("update Balance set balance=? where accountID=?",(nowBalance-price, accountID))
		conn.execute("insert into ownGames values(?,?,0)", (accountID, gameID))
		stock = conn.execute("select count(gameID) from ownGames where accountID=?",
			(accountID,)).fetchone()[0]
		print(conn.execute("select * from owngames").fetchall())
		return (True, "Purchase Success!", stock, nowBalance-price)

def evaluateGame(accountID, gameID, isGood):
	print(conn.execute("select * from owngames").fetchall())
	print(accountID,gameID,isGood)
	if not conn.execute("select count(accountID) from ownGames where accountID=? and gameID=?",
		(accountID,gameID)).fetchone()[0]:
		return (False, "Haven't bought the game", "")
	E = conn.execute("select evaluate from ownGames where accountID=? and gameID=?",
		(accountID, gameID)).fetchone()[0]
	if E!=0:
		#already evaluated
		return (False, "Already evaluated!", "")
	else:
		conn.execute("update ownGames set evaluate=? where accountID=? and gameID=?",
			(isGood, accountID, gameID))
		good = conn.execute("select count(evaluate) from ownGames where gameID=? and evaluate=1",
			(gameID,)).fetchone()[0]
		bad = conn.execute("select count(evaluate) from ownGames where gameID=? and evaluate=-1",
			(gameID,)).fetchone()[0]
		#value = float(good) / float(bad)
		print(conn.execute("select * from owngames").fetchall())
		return (True, good, bad)

def getUserInfo(accountID):
	balance = conn.execute("select balance from Balance where accountID=?",
		(accountID,)).fetchone()[0]
	count = conn.execute("select count(gameID) from ownGames where accountID=?", 
		(accountID,)).fetchone()[0]
	headURL = conn.execute("select headURL from userinfo where accountID=?",
		(accountID,)).fetchone()[0]
	return (balance, count, headURL)

def newGame():
	return;
def deleteGame():
	return;


def logIn(userName, password):
	ID = conn.execute("select accountID from Account where username=? and password=?",
		(userName, password)).fetchone()[0]
	if ID==0:
		return (False, "Incorrect username or password!")
	else:
		return (True, ID)

def getGameID(num, cate, gameIDs):
	if cate=='Lib' or cate =="Search":
		print "sbsb"
		#gameIDs don't change
	else:
		gameIDs = conn.execute("select gameID from Game where category=?",
		(cate,)).fetchall()
	n=0
	for tmp in gameIDs:
		n+=1
	print gameIDs
	num = (num-1)%n
	gameID=gameIDs[num-1][0]
	return gameID,n,gameIDs

def getGameIDbyAccountID(accountID):
	gameIDs = conn.execute("select gameID from ownGames where accountID=?",
		(accountID,)).fetchall()
	i=0
	for tmp in gameIDs:
		i+=1
	return i,gameIDs

def search(text):
	gameIDs = conn.execute("select gameID from game where gamename like '%"+text+"%'").fetchall()
	print(gameIDs)
	i=0
	for tmp in gameIDs:
		i+=1
	return i,gameIDs