USE janseva;
SHOW TABLES;





CREATE TABLE customer(
custID int NOT NULL AUTO_INCREMENT,
custName VARCHAR(255) NOT NULL,
custAge INT NOT NULL,
custGender VARCHAR(1),
custEmail VARCHAR(50) UNIQUE,
custContact VARCHAR(10) NOT NULL UNIQUE,
custAddress VARCHAR(255) NOT NULL,
custPassword VARCHAR(128) NOT NULL,
custPin VARCHAR(7) NOT NULL,
PRIMARY KEY (custID),
CHECK(custAge>18)
);

DESC customer;


INSERT INTO customer (custName, custAge, custGender, custEmail, custContact, custAddress, custPassword, custPin)
VALUES
    ('Test User', 25, 'M', 'test@gmail.com', '1234567890', '123 Main St', '12345', '781007');

select * from customer;
desc customer;

INSERT INTO customer (custName, custAge, custGender, custEmail, custContact, custAddress, custPassword, custPin)
VALUES ('TestUSer', 25, 'M', 'test@gmail.com', '1234567891', '123 Main St', '1234', '1234567');




CREATE TABLE pilgrimage(
pilgID int NOT NULL AUTO_INCREMENT,
pilgName VARCHAR(100) NOT NULL,
pilgLoc VARCHAR(255) NOT NULL,
pilgPin VARCHAR(7) NOT NULL,
pilgCity VARCHAR(255) NOT NULL,
pilgType VARCHAR(25) NOT NULL,
userExp FLOAT(2) NOT NULL,
img1 VARCHAR(100) NOT NULL,
img2 VARCHAR (100) NOT NULL,
PRIMARY KEY (pilgID)
);

DESC pilgrimage;

-- temple data
INSERT INTO pilgrimage (pilgName,pilgLoc,pilgPin,pilgCity,pilgType,userExp,img1,img2) VALUES 
("Kedarnath Temple","Garhwal Himalayan range","246445","Kedarnath","temple",4.5,"Dr8vHZ7/k3.jpg","R0sfcZ1/74285807.jpg"),
("Kamakhya Temple","Nilachal Hills","781010","Guwahati","temple",4.1,"ZJ6ygzN/Kamakhya-Guwahati.jpg","LZ0ktN5/Kamakhya41.jpg"),
("Venkateshwara Temple","Tirumala Tirupati","517504","Tirupati", "temple",4.0,"VLG8011/800px-Tirumala-090615.jpg","QbkDHgw/3479482.jpg"),
("Dwarkadhish Temple","Dwarka","361335","Dwarka","temple",3.9,"348hd3X/Dwarkadheesh-temple.jpg","7nXgfht/image3.png");
-- church data
INSERT INTO pilgrimage (pilgName,pilgLoc,pilgPin,pilgCity,pilgType,userExp,img1,img2) VALUES 
("St. Paul's Cathedral","Cathedral Rd, Maidan","700071","Kolkata","church",4.7,"RTN85QY/38293940552-cd3e78de29-k-20171214175140.jpg","HXK8L60/30c.jpg"),
("Basilica of Bom Jesus","Old Goa Rd, Konkan region","403402","Old Goa","church",4.2,"jZBTLN6/shutterstock-1073481062-20190822145857.jpg","NnHcXC6/600-X400-3-1280x720.jpg"),
("Immaculate Conception Cathedral","204, Mission St, MG Road Area","605001","Puducherry", "church",4.4,"1JdxWRv/Puducherry-Immaculate-Conception-Cathedral-2.jpg","5MwN8KN/shutterstock-1015155727.jpg"),
("St. John in the Wilderness Church","McLeod Ganj","176215","Dharamshala","church",3.6,"KbsRGNc/Nainital-stjohnchurch.jpg","bNxVM2Q/14681027494-1995e5d393-b.jpg");
-- masjid data
INSERT INTO pilgrimage (pilgName, pilgLoc, pilgPin, pilgCity, pilgType, userExp, img1, img2) VALUES
("Jama Masjid", "Meena Bazaar, Jama Masjid, Chandni Chowk", "110006", "New Delhi", "mosque", 4.5, "mJw54gW/jama-masjid-delhi.jpg","mHKZtqQ/Jama-Masjid-Delhi.jpg"),
("Charminar Mosque", "Charminar, Ghansi Bazaar", "500002", "Hyderabad", "mosque", 4.2, "0BWDF13/ZCEVDh-Fk5dj-NGYHn-Rug-M674kzgw-T5b-HSk-Nvgf-Zom.jpg", "CVTnSWv/d6307bd26ed7a3e42c7cc8b28713890c.jpg"),
("Taj-ul-Masjid", "Bhopal Railway Station Road, Kohefiza", "462001", "Bhopal", "mosque", 3.4, "6HQfFYq/optimized-tuar-1200x900.jpg", "myZzMNG/Bhopal-Tajulmasajid-20200315-104044.jpg"),
("Haji Ali Dargah Mosque", "Dargah Road, Haji Ali", "400026", "Mumbai", "mosque", 4.4, "x8gTFdQ/haji-ali-dargah2.jpg", "rQkkPQG/haji-ali-mosque-2-0.jpg");
-- gurudwara data
INSERT INTO pilgrimage (pilgName, pilgLoc, pilgPin, pilgCity, pilgType, userExp, img1, img2) 
VALUES 
("Golden Temple", "Golden Temple Rd, Atta Mandi", "143006", "Amritsar", "gurudwara", 4.9, "588QD4z/The-Golden-Temple-of-Amrithsar-7.jpg","yFzkKqg/D8R9MT.jpg"),
("Harmandir Sahib", "Sri Darbar Sahib, Guru Ram Das Ji Rd", "143006", "Amritsar", "gurudwara", 4.7, "Hx3pXZ1/Harmandir-Sahib-Amritsar-India-Punjab.jpg","0mT2tnz/3602506.jpg"),
("Bangla Sahib Gurudwara", "Ashoka Rd, Connaught Place", "110001", "New Delhi", "gurudwara", 4.6, "Yhh1QS6/Front-view-of-Gurudwara-Bangla-Sahib-Delhi.jpg","hsgDMRz/Getty-Images-1154390020.jpg"),
("Hazur Sahib Nanded", "Hazur Sahib Rd", "431601", "Nanded", "gurudwara", 3.7, "8gwPCSp/Hazur-Sahib.jpg","9Gs14xc/nanded-gurudwara-1.jpg");

SELECT * FROM pilgrimage;

CREATE TABLE priest(
priID int NOT NULL AUTO_INCREMENT,
priName VARCHAR(255) NOT NULL,
priContact VARCHAR(10) NOT NULL UNIQUE,
pilgID int,

PRIMARY KEY (priID),
FOREIGN KEY (pilgID) REFERENCES pilgrimage(pilgID)
);


desc priest;
insert into priest (priName,priContact,pilgID) values
("Pandit Ravi Shankar","9876543210",1),
("Acharya Rajendra Prasad","8765432109",1),
("Swami Vivekananda","7654321098",1),
("Pt. Harish Chandra","6543210987",1),
("Brahmarshi Vishwamitra","5432109876",2),
("Acharya Chanakya","4321098765",2),
("Pt. Keshav Sharma","3210987654",2),
("Swami Dayanand Saraswati","2109876543",2);

insert into priest (priName,priContact,pilgID) values
("Pt. Devi Lal","4875708097",3),
("Shri Shankaracharya","9876543211",3),
("Pt. Ramakrishna","8765432101",3),
("Swami Ramdev","7654321091",3),
("Pt. Govind Mishra","6543210981",4),
("Acharya Bhikshu","5432109871",4),
("Pt. Krishan Sharma","4321098761",4),
("Swami Chinmayananda","3210987651",4),
('Imam Ahmad Ali', '2420403064', 13),
('Sheikh Mohammed Rahman', '9029468738', 13),
('Maulana Abdul Qadir', '5553333090', 13),
('Mufti Abdul Aziz', '5554444990', 13),
('Imam Abdul Hamid', '9960442039', 14),
('Hafiz Ahmed Khan', '555666612', 14),
('Maulvi Ibrahim Khan', '555777790', 14),
('Sheikh Mustafa Ahmed', '555888890', 14),
('Mufti Abdul Rahman', '555999912', 15),
('Qari Abdul Wali', '555000045', 15),
('Hafiz Muhammad Ali', '3375524659', 15),
('Maulana Khalid Hussain', '555222390', 15),
('Sheikh Abdullah Hassan', '5553334', 16),
('Imam Muhammad Usman', '5433967825', 16),
('Mufti Muhammad Yusuf', '8432647265', 16),
('Qari Abdul Qayyum', '9797864989', 16),
('Father John Smith', '6333984868', 5),
('Father Michael Johnson', '6434108881',  5),
('Reverend James Brown', '55533332',  5),
('Reverend William Davis', '55544443',  5),
('Pastor Robert Wilson', '555555785', 6),
('Pastor David Jones', '555666690', 6),
('Father Mark Thomas', '555777734', 6),
('Reverend Joseph Anderson', '55588881', 6),
('Father Paul Mitchell', '9014546231',7),
('Reverend Daniel Parker', '2119293191', 7),
('Pastor Timothy Green', '8512958995', 7),
('Father Christopher Lee', '6471081059', 7),
('Reverend Matthew White', '3423653524', 8),
('Pastor Benjamin Wright', '8694913365', 8),
('Father Samuel King', '4345224055', 8),
('Reverend Jonathan Baker', '55566677', 8),
('Bhai Baldev Singh', '666111145', 17),
('Bhai Gurdas Singh', '666222221', 17),
('Giani Jaswant Singh', '666333312', 17),
('Bhai Harbans Singh', '8232157483', 17),
('Giani Sant Singh', '9718719652', 18),
('Bhai Sukhdev Singh', '3678712970', 18),
('Baba Seva Singh', '6413392692', 18),
('Giani Jarnail Singh', '7399723689', 18),
('Baba Surinder Singh', '9676444487', 19),
('Giani Santokh Singh', '5540348403', 19),
('Bhai Mohinder Singh', '6661112', 19),
('Baba Nihal Singh', '66622235', 20),
('Giani Gurbachan Singh', '6663334', 20),
('Bhai Harjinder Singh', '66644453', 20),
('Baba Joginder Singh', '666555612', 20);




CREATE TABLE payment(
payID INT NOT NULL, 
payAmt INT NOT NULL, -- payID will be equal to priest charges, package charges, convenience fee of pilgrimages and convenience fee of company +gst as a total.
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

drop table package;


create table package(
packID int primary key auto_increment,
packName varchar(50),
packCost float(2),
packContent varchar(200),
pilgID int,
foreign key(pilgID) references pilgrimage(pilgID)
);

-- ===================MANDIRS==========================================
-- kedarnath table
INSERT INTO package (packName, packCost, packContent, pilgID)
VALUES 
    ("Basic Puja Package", 500, "1 kg ghee, 1 kg rice, 10 incense sticks, 5 candles", 1),
    ("Special Puja Package", 1000, "2 kg ghee, 2 kg rice, 20 incense sticks, 10 candles, 5 flower garlands", 1),
    ("Deluxe Puja Package", 1500, "3 kg ghee, 3 kg rice, 30 incense sticks, 15 candles, 10 flower garlands, 1 brass diya", 1);

-- kamakhya table
INSERT INTO package ( packName, packCost, packContent, pilgID)
VALUES 
    ("Basic Puja Package", 300, "500 gm ghee, 500 gm rice, 5 incense sticks, 2 candles", 2),
    ("Special Puja Package", 700, "1 kg ghee, 1 kg rice, 10 incense sticks, 5 candles, 3 flower garlands", 2),
    ("Deluxe Puja Package", 1200, "2 kg ghee, 2 kg rice, 20 incense sticks, 10 candles, 5 flower garlands, 1 brass diya", 2);

-- venkateshwara table
INSERT INTO package ( packName, packCost, packContent, pilgID)
VALUES 
    ("Basic Puja Package", 200, "250 gm ghee, 250 gm rice, 2 incense sticks, 1 candle", 3),
    ("Special Puja Package", 500, "500 gm ghee, 500 gm rice, 5 incense sticks, 2 candles, 2 flower garlands", 3),
    ("Deluxe Puja Package", 1000, "1 kg ghee, 1 kg rice, 10 incense sticks, 5 candles, 5 flower garlands, 1 brass diya", 3);

-- dwarkadhish table
INSERT INTO package ( packName, packCost, packContent, pilgID)
VALUES 
    ("Basic Puja Package", 250, "500 gm ghee, 500 gm rice, 5 incense sticks, 2 candles", 4),
    ("Special Puja Package", 600, "1 kg ghee, 1 kg rice, 10 incense sticks, 5 candles, 3 flower garlands", 4),
    ("Deluxe Puja Package", 1100, "2 kg ghee, 2 kg rice, 20 incense sticks, 10 candles, 5 flower garlands, 1 brass diya", 4);

-- ===================MASJIDS==========================================

-- Insert packages for Jama Masjid pilgrimage
INSERT INTO package ( packName, packCost, packContent, pilgID)
VALUES 
('Basic Prayer Kit', 50, 'Prayer mat, tasbih, miswak', 13),
('Premium Prayer Kit', 100, 'Prayer mat, tasbih, miswak, Quran, prayer cap', 13),
('Scented Candle Set', 25, '3 scented candles (rose, sandalwood, lavender)', 13);

-- Insert packages for Charminar Mosque pilgrimage
INSERT INTO package ( packName, packCost, packContent, pilgID)
VALUES 
('Basic Prayer Kit', 50, 'Prayer mat, tasbih, miswak', 14),
('Premium Prayer Kit', 100, 'Prayer mat, tasbih, miswak, Quran, prayer cap', 14),
('Incense Sticks Set', 30, 'Assorted incense sticks (jasmine, rose, sandalwood)', 14);

-- Insert packages for Taj-ul-Masjid pilgrimage
INSERT INTO package ( packName, packCost, packContent, pilgID)
VALUES 
('Basic Prayer Kit', 50, 'Prayer mat, tasbih, miswak', 15),
('Premium Prayer Kit', 100, 'Prayer mat, tasbih, miswak, Quran, prayer cap', 15),
('Flower Bouquet', 40, 'Assorted flowers (roses, marigolds, lilies)', 15);

-- Insert packages for Haji Ali Dargah Mosque pilgrimage
INSERT INTO package ( packName, packCost, packContent, pilgID)
VALUES 
('Basic Prayer Kit', 50, 'Prayer mat, tasbih, miswak', 16),
('Premium Prayer Kit', 100, 'Prayer mat, tasbih, miswak, Quran, prayer cap', 16),
('Ghee Lamp Set', 35, '2 brass ghee lamps with wicks', 16);


-- ===================CHURCHES==========================================
-- St. Paul's Cathedral
INSERT INTO package( packName, packCost, packContent, pilgID) VALUES 
("Candle Package", 200, "2 candles, 1 candle stand", (SELECT pilgID FROM pilgrimage WHERE pilgName = "St. Paul's Cathedral")),
("Flower Package", 150, "1 bouquet of roses, 1 bouquet of lilies", (SELECT pilgID FROM pilgrimage WHERE pilgName = "St. Paul's Cathedral")),
("Incense Package", 100, "1 pack of incense sticks, 1 incense stand", (SELECT pilgID FROM pilgrimage WHERE pilgName = "St. Paul's Cathedral"));

-- Basilica of Bom Jesus
INSERT INTO package( packName, packCost, packContent, pilgID) VALUES 
("Ghee Package", 300, "500 grams of pure ghee", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Basilica of Bom Jesus")),
("Flower Package", 150, "1 bouquet of marigolds, 1 bouquet of chrysanthemums", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Basilica of Bom Jesus")),
("Candle Package", 200, "2 candles, 1 candle stand", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Basilica of Bom Jesus"));

-- Immaculate Conception Cathedral
INSERT INTO package( packName, packCost, packContent, pilgID) VALUES 
("Incense Package", 100, "1 pack of incense sticks, 1 incense stand", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Immaculate Conception Cathedral")),
("Candle Package", 200, "2 candles, 1 candle stand", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Immaculate Conception Cathedral")),
("Flower Package", 150, "1 bouquet of orchids, 1 bouquet of daisies", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Immaculate Conception Cathedral"));

-- St. John in the Wilderness Church
INSERT INTO package( packName, packCost, packContent, pilgID) VALUES 
("Flower Package", 150, "1 bouquet of carnations, 1 bouquet of tulips", (SELECT pilgID FROM pilgrimage WHERE pilgName = "St. John in the Wilderness Church")),
("Candle Package", 200, "2 candles, 1 candle stand", (SELECT pilgID FROM pilgrimage WHERE pilgName = "St. John in the Wilderness Church")),
("Incense Package", 100, "1 pack of incense sticks, 1 incense stand", (SELECT pilgID FROM pilgrimage WHERE pilgName = "St. John in the Wilderness Church"));







-- ===================GURUDWARAS==========================================
-- for the Golden Temple:
INSERT INTO package (packName, packCost, packContent, pilgID)
VALUES
("Basic Package", 100, "2 candles, 1 packet of incense sticks, 1kg ghee", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Golden Temple")),
("Premium Package", 500, "4 candles, 2 packets of incense sticks, 2kg ghee, 1kg almonds, 1kg raisins", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Golden Temple")),
("Deluxe Package", 1000, "6 candles, 3 packets of incense sticks, 5kg ghee, 2kg almonds, 2kg raisins, 1kg cashews, 1kg pistachios", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Golden Temple"));

-- for Harmandir Sahib:
INSERT INTO package (packName, packCost, packContent, pilgID)
VALUES
("Basic Package", 100, "2 candles, 1 packet of incense sticks, 1kg ghee", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Harmandir Sahib")),
("Premium Package", 500, "4 candles, 2 packets of incense sticks, 2kg ghee, 1kg almonds, 1kg raisins", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Harmandir Sahib")),
("Deluxe Package", 1000, "6 candles, 3 packets of incense sticks, 5kg ghee, 2kg almonds, 2kg raisins, 1kg cashews, 1kg pistachios", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Harmandir Sahib"));

-- for Bangla Sahib Gurudwara:
INSERT INTO package (packName, packCost, packContent, pilgID)
VALUES
("Basic Package", 100, "2 candles, 1 packet of incense sticks, 1kg ghee", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Bangla Sahib Gurudwara")),
("Premium Package", 500, "4 candles, 2 packets of incense sticks, 2kg ghee, 1kg almonds, 1kg raisins", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Bangla Sahib Gurudwara")),
("Deluxe Package", 1000, "6 candles, 3 packets of incense sticks, 5kg ghee, 2kg almonds, 2kg raisins, 1kg cashews, 1kg pistachios", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Bangla Sahib Gurudwara"));

-- for Hazur Sahib Nanded:
INSERT INTO package (packName, packCost, packContent, pilgID)
VALUES
("Basic Package", 100, "2 candles, 1 packet of incense sticks, 1kg ghee", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Hazur Sahib Nanded")),
("Premium Package", 500, "4 candles, 2 packets of incense sticks, 2kg ghee, 1kg almonds, 1kg raisins", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Hazur Sahib Nanded")),
("Deluxe Package", 1000, "6 candles, 3 packets of incense sticks, 5kg ghee, 2kg almonds, 2kg raisins, 1kg cashews, 1kg pistachios", (SELECT pilgID FROM pilgrimage WHERE pilgName = "Hazur Sahib Nanded"));


-- VIEW THE TABLES :

select * from package;
select * from pilgrimage;
select * from priest;



-- joining pilgrimage and package tablße for ordersummary page

SELECT pilgrimage.pilgName, pilgrimage.pilgLoc , pilgrimage.userExp , package.packName, package.packCost , package.packContent
FROM package
INNER JOIN pilgrimage ON package.pilgID=pilgrimage.pilgID
WHERE pilgrimage.pilgID = 1;


-- order table 



CREATE TABLE orders(
orderID int,
orderDate date,
pilgName varchar(255),
packName varchar(255),
priName varchar(255) default '',
custID int,
amount float(2),
orderStatus varchar(255), -- order placed , cancelled , priest allocated , divine in process , out for delivery , delivered 
payID varchar(255),
paymentstatus varchar(25), -- success / failed 
PRIMARY KEY (orderID),
FOREIGN KEY (custID) REFERENCES customer(custID)
);

desc orders;

select * from orders order by orderDate desc;
drop table orders;


create table feedback(
feedID int auto_increment primary key,
feedContent varchar(1024),
orderID int,
custID int,
foreign key (orderID) references orders(orderID),
foreign key (custID) references customer(custID)
);

select * from orders;
update orders set orderStatus='order placed' where orderID=4029;

-- Allocating priest in tracking order page //
select priName from priest where pilgID IN (select pilgID from pilgrimage where pilgName = "Kamakhya Temple");


show tables;
desc feedback;

select * from feedback;



