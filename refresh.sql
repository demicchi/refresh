CREATE TABLE trip (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  date TEXT,
  status TEXT
);

CREATE TABLE member (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trip_id INTEGER NOT NULL,
  name TEXT,
  FOREIGN KEY (trip_id) REFERENCES trip(id)
);

CREATE TABLE payment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trip_id INTEGER NOT NULL,
  description TEXT,
  amount REAL,
  payer INTEGER,
  FOREIGN KEY (trip_id) REFERENCES trip(id),
  FOREIGN KEY (payer) REFERENCES member(id)
);

CREATE TABLE defrayer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payment_id INTEGER NOT NULL,
  member_id INTEGER NOT NULL,
  FOREIGN KEY (payment_id) REFERENCES payment(id),
  FOREIGN KEY (member_id) REFERENCES member(id)
);

