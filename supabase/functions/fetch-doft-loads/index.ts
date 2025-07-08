
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const app = express();
app.use(express.json());

import type { Request, Response, NextFunction } from 'express';

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type');
  if (req.method === 'OPTIONS') {
    res.status(200).send('ok');
  } else {
    next();
  }
});

app.get('/', async (req, res) => {
  try {
    const equipmentType = req.query.equipmentType as string | undefined;
    const pickupCity = req.query.pickupCity as string | undefined;
    const pickupState = req.query.pickupState as string | undefined;
    const dropoffCity = req.query.dropoffCity as string | undefined;
    const dropoffState = req.query.dropoffState as string | undefined;
    const pickupDate = req.query.pickupDate as string | undefined;

    const doftApiKey = process.env.DOFT_API_KEY;
    if (!doftApiKey) {
      throw new Error('DOFT API key not configured');
    }

    // Build query parameters for DOFT API
    const queryParams = new URLSearchParams();
    if (equipmentType) queryParams.append('equipment_type', equipmentType);
    if (pickupCity) queryParams.append('pickup_city', pickupCity);
    if (pickupState) queryParams.append('pickup_state', pickupState);
    if (dropoffCity) queryParams.append('dropoff_city', dropoffCity);
    if (dropoffState) queryParams.append('dropoff_state', dropoffState);
    if (pickupDate) queryParams.append('pickup_date', pickupDate);

    console.log('Fetching loads from DOFT API with params:', queryParams.toString());

    const response = await fetch(`https://api.doft.com/api/v3/loads?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${doftApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`DOFT API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('DOFT API response:', data);

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Cache loads in our database
    if (data.loads && Array.isArray(data.loads)) {
      for (const load of data.loads) {
        await supabase
          .from('freight_loads')
          .upsert({
            doft_load_id: load.id || `doft_${Date.now()}_${Math.random()}`,
            origin_city: load.origin_city || '',
            origin_state: load.origin_state || '',
            destination_city: load.destination_city || '',
            destination_state: load.destination_state || '',
            equipment_type: load.equipment_type || '',
            rate: load.rate ? parseFloat(load.rate) : null,
            distance: load.distance ? parseInt(load.distance) : null,
            pickup_date: load.pickup_date || new Date().toISOString().split('T')[0],
            broker_name: load.broker_name || '',
            broker_phone: load.broker_phone || '',
            broker_email: load.broker_email || '',
            load_details: load,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'doft_load_id'
          });
      }
    }

    res.status(200).json(data);

  } catch (error: any) {
    console.error('Error fetching DOFT loads:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
