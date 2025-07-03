
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { searchParams } = new URL(req.url)
    const equipmentType = searchParams.get('equipmentType')
    const pickupCity = searchParams.get('pickupCity')
    const pickupState = searchParams.get('pickupState')
    const dropoffCity = searchParams.get('dropoffCity')
    const dropoffState = searchParams.get('dropoffState')
    const pickupDate = searchParams.get('pickupDate')

    const doftApiKey = Deno.env.get('DOFT_API_KEY')
    if (!doftApiKey) {
      throw new Error('DOFT API key not configured')
    }

    // Build query parameters for DOFT API
    const queryParams = new URLSearchParams()
    if (equipmentType) queryParams.append('equipment_type', equipmentType)
    if (pickupCity) queryParams.append('pickup_city', pickupCity)
    if (pickupState) queryParams.append('pickup_state', pickupState)
    if (dropoffCity) queryParams.append('dropoff_city', dropoffCity)
    if (dropoffState) queryParams.append('dropoff_state', dropoffState)
    if (pickupDate) queryParams.append('pickup_date', pickupDate)

    console.log('Fetching loads from DOFT API with params:', queryParams.toString())

    const response = await fetch(`https://api.doft.com/api/v3/loads?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${doftApiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`DOFT API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('DOFT API response:', data)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

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
          })
      }
    }

    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error fetching DOFT loads:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
