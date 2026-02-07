
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://szfoxvvqqtfzbwbuacgk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Zm94dnZxcXRmemJ3YnVhY2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTQ1MjYsImV4cCI6MjA4NDY3MDUyNn0.HOb0Qn3I0QisisyHGGN-koR4Ac6tL9pPVz4jxNKEFRk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testFetch() {
    console.log("Testing fetch from 'boxes'...");
    const { data: boxes, error: boxError } = await supabase.from('boxes').select('*');
    if (boxError) console.error("Boxes Error:", boxError);
    else console.log("Boxes Data:", boxes);

    console.log("Testing fetch from 'partners'...");
    const { data: partners, error: partnerError } = await supabase.from('partners').select('*');
    if (partnerError) console.error("Partners Error:", partnerError);
    else console.log("Partners Data:", partners);
}

testFetch();
