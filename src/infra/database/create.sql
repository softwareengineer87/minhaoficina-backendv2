
CREATE TABLE IF NOT EXISTS business (
  business_id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT,
  logo TEXT
);

CREATE TABLE IF NOT EXISTS customers (
  customer_id TEXT PRIMARY KEY,
  email TEXT,
  name TEXT,
  cpf TEXT,
  phone TEXT
);

CREATE TABLE IF NOT EXISTS notes (
  note_id TEXT PRIMARY KEY,
  business_id TEXT,
  customer_id TEXT,
  model TEXT,
  kilometer INTEGER,
  plate TEXT,
  observation TEXT,
  date TIMESTAMP,

  CONSTRAINT fk_business FOREIGN KEY(business_id) REFERENCES business(business_id),
  CONSTRAINT fk_customer FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE IF NOT EXISTS parts (
  part_id TEXT PRIMARY KEY,
  note_id TEXT,
  name TEXT,
  price NUMERIC,
  
  CONSTRAINT fk_notes FOREIGN KEY(note_id) REFERENCES notes(note_id)  
);

CREATE TABLE IF NOT EXISTS stocks (
  product_id TEXT PRIMARY KEY,
  business_id TEXT,
  title TEXT,
  price NUMERIC,
  quantity NUMERIC,
  created_at TIMESTAMP,

  CONSTRAINT fk_business FOREIGN KEY(business_id) REFERENCES business(business_id)
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id TEXT PRIMARY KEY,
  note_id TEXT,
  url TEXT,
  
  CONSTRAINT fk_notes FOREIGN KEY(note_id) REFERENCES notes(note_id)  
);

CREATE TABLE IF NOT EXISTS logos (
  photo_id TEXT PRIMARY KEY,
  business_id TEXT,
  url TEXT,
  
  CONSTRAINT fk_business FOREIGN KEY(business_id) REFERENCES business(business_id)  
);


