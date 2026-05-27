export type UserRole = 'ADMIN' | 'WORKER' | 'CUSTOMER';

export interface Profile {
  id: number;
  full_name: string | null;
  phone_number: string | null;
  address: string | null;
  role: UserRole;
  type_job_id: number | null;
  status: number;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface TypeJob {
  id: number;
  name: string;
  created_at: string;
}

export interface Service {
  id: number;
  name: string;
  description: string | null;
  status: boolean;
  type_job_id: number | null;
  type_service_id: number | null;
  image_url: string | null;
  created_at: string;
}

export interface ServiceRequest {
  id: number;
  customer_id: number;
  customer_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  description: string | null;
  status: number;
  package_type: number | null;
  promotion_id: number | null;
  reference_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface Material {
  id: number;
  name: string;
  unit: string | null;
  created_at: string;
}

export interface Contract {
  id: number;
  customer_id: string;
  service_request_id: number;
  title: string | null;
  url: string | null;
  start_date: string | null;
  end_date: string | null;
  deposit: number | null;
  total_price: number | null;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: number;
  service_request_id: number;
  contract_id: number;
  total_cost: number | null;
  total_cost_update: number | null;
  promotion_id: number | null;
  created_at: string;
  updated_at: string;
}
