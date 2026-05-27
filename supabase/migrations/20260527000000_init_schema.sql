-- Migration: 20260527000000_init_schema.sql
-- Description: Initialize AnServices schema (Simplified Auth)

-- 1. Roles & Profiles (Self-managed Auth)
CREATE TYPE user_role AS ENUM ('ADMIN', 'WORKER', 'CUSTOMER');

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- Stored as plain text for extreme simplicity as requested
  full_name TEXT,
  phone_number TEXT UNIQUE,
  address TEXT,
  role user_role DEFAULT 'CUSTOMER',
  type_job_id INTEGER,
  status INTEGER DEFAULT 1,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Master Data Tables
CREATE TABLE type_jobs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE type_services (
  id SERIAL PRIMARY KEY,
  description TEXT,
  value INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status BOOLEAN DEFAULT TRUE,
  type_job_id INTEGER REFERENCES type_jobs(id),
  type_service_id INTEGER REFERENCES type_services(id),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE materials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  unit TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for extreme simplicity (as requested for manual auth)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE contracts DISABLE ROW LEVEL SECURITY;
ALTER TABLE invoices DISABLE ROW LEVEL SECURITY;
ALTER TABLE materials DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY; -- Added explicitly
ALTER TABLE type_jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE type_services DISABLE ROW LEVEL SECURITY;
ALTER TABLE request_details DISABLE ROW LEVEL SECURITY;
ALTER TABLE repair_details DISABLE ROW LEVEL SECURITY;
ALTER TABLE reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE used_materials DISABLE ROW LEVEL SECURITY;
ALTER TABLE media DISABLE ROW LEVEL SECURITY;
ALTER TABLE invite_codes DISABLE ROW LEVEL SECURITY;
ALTER TABLE promotions DISABLE ROW LEVEL SECURITY;

-- 3. Core Business Tables
CREATE TABLE service_requests (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES profiles(id),
  customer_name TEXT,
  customer_phone TEXT,
  customer_address TEXT,
  description TEXT,
  status INTEGER DEFAULT 1,
  package_type INTEGER,
  promotion_id INTEGER,
  reference_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE request_details (
  id SERIAL PRIMARY KEY,
  service_request_id INTEGER REFERENCES service_requests(id) ON DELETE CASCADE,
  service_id INTEGER REFERENCES services(id),
  status INTEGER DEFAULT 1,
  price DECIMAL(18, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE repair_details (
  id SERIAL PRIMARY KEY,
  request_detail_id INTEGER REFERENCES request_details(id) ON DELETE CASCADE,
  worker_id INTEGER REFERENCES profiles(id),
  date_begin TIMESTAMPTZ,
  date_end TIMESTAMPTZ,
  is_primary BOOLEAN DEFAULT FALSE,
  priority INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES profiles(id),
  service_request_id INTEGER REFERENCES service_requests(id),
  title TEXT,
  url TEXT,
  start_date DATE,
  end_date DATE,
  deposit DECIMAL(18, 2),
  total_price DECIMAL(18, 2),
  status INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  service_request_id INTEGER REFERENCES service_requests(id),
  contract_id INTEGER REFERENCES contracts(id),
  total_cost DECIMAL(18, 2),
  total_cost_update DECIMAL(18, 2),
  promotion_id INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  request_detail_id INTEGER REFERENCES request_details(id),
  worker_id INTEGER REFERENCES profiles(id),
  title TEXT,
  description TEXT,
  report_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  service_request_id INTEGER REFERENCES service_requests(id),
  report_id INTEGER REFERENCES reports(id),
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE used_materials (
  id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES materials(id),
  request_detail_id INTEGER REFERENCES request_details(id),
  worker_id INTEGER REFERENCES profiles(id),
  quantity DECIMAL(18, 2),
  quantity_new DECIMAL(18, 2),
  status INTEGER DEFAULT 1,
  note TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Utility Tables
CREATE TABLE invite_codes (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES profiles(id),
  code VARCHAR(10) UNIQUE,
  is_used BOOLEAN DEFAULT FALSE,
  expire_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE promotions (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES profiles(id),
  code VARCHAR(10) UNIQUE,
  description TEXT,
  value DECIMAL(18, 2),
  is_active BOOLEAN DEFAULT TRUE,
  expire_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
