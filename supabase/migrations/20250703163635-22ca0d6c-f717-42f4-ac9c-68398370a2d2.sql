
-- Create a table to cache load data for better performance
CREATE TABLE public.freight_loads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  doft_load_id TEXT UNIQUE NOT NULL,
  origin_city TEXT NOT NULL,
  origin_state TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  destination_state TEXT NOT NULL,
  equipment_type TEXT NOT NULL,
  rate DECIMAL(10,2),
  distance INTEGER,
  pickup_date DATE NOT NULL,
  broker_name TEXT,
  broker_phone TEXT,
  broker_email TEXT,
  load_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_freight_loads_pickup_date ON public.freight_loads(pickup_date);
CREATE INDEX idx_freight_loads_equipment ON public.freight_loads(equipment_type);
CREATE INDEX idx_freight_loads_origin ON public.freight_loads(origin_city, origin_state);
CREATE INDEX idx_freight_loads_destination ON public.freight_loads(destination_city, destination_state);

-- Enable RLS (optional - you might want this public for load board viewing)
ALTER TABLE public.freight_loads ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to loads
CREATE POLICY "Anyone can view freight loads" 
  ON public.freight_loads 
  FOR SELECT 
  TO public
  USING (true);

-- Create policy for authenticated users to manage loads (admin/dispatcher only)
CREATE POLICY "Authenticated users can manage loads" 
  ON public.freight_loads 
  FOR ALL 
  USING (auth.role() = 'authenticated');
