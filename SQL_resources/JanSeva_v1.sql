USE janseva;

CREATE TABLE customer(custID int NOT NULL,
custName VARCHAR(255) NOT NULL,
custAge INT NOT NULL,
custGender VARCHAR(1),
custContact VARCHAR(10),
custAddress VARCHAR(255),
PRIMARY KEY (custID)
);


CREATE TABLE package(packID int NOT NULL, 
packName VARCHAR(255) NOT NULL, 
packCost INT NOT NULL, 
packRel VARCHAR(1), 
packContent VARCHAR(255), 
packImg VARCHAR(255), 
PRIMARY KEY (packID)
);

CREATE TABLE pilgrimage(pilgID int NOT NULL,
pilgName VARCHAR(255) NOT NULL,
pilgLoc VARCHAR(255),
pilgCity VARCHAR(255),

PRIMARY KEY (pilgID)
);

CREATE TABLE ritual(ritID int NOT NULL,
ritName VARCHAR(255) NOT NULL,
ritRel VARCHAR(1),
ritDesc VARCHAR(255),
pilgID INT NOT NULL,
packID INT NOT NULL,

PRIMARY KEY (ritID),
FOREIGN KEY (packID) REFERENCES package(packID)
FOREIGN KEY (pilgID) REFERENCES pilgrimage(pilgID)
);


CREATE TABLE priest(priID int NOT NULL,
priName VARCHAR(255) NOT NULL,
priContact VARCHAR(10) NOT NULL UNIQUE,
pilgID int,

PRIMARY KEY (priID),
FOREIGN KEY (pilgID) REFERENCES pilgrimage(pilgID)
);

CREATE TABLE payment(
payID INT NOT NULL, 
payAmt INT NOT NULL, --payID will be equal to priest charges, package charges, convenience fee of pilgrimages and convenience fee of company +gst as a total.
custID INT NOT NULL,
priID INT NOT NULL,
packID INT NOT NULL,
pilgID INT NOT NULL,

PRIMARY KEY (payID),
FOREIGN KEY (custID) REFERENCES customer(custID),
FOREIGN KEY (priID) REFERENCES priest(priID),
FOREIGN KEY (packID) REFERENCES package(packID),
FOREIGN KEY (pilgID) REFERENCES pilgrimage(pilgID)
);


