export const analyzeIncident = (description) => {
  const text = description.toLowerCase();
  
  let category = 'Other';
  let riskLevel = 'Low';
  
  if (text.includes('fuel') || text.includes('engine') || text.includes('leakage') || text.includes('mechanical')) {
    category = 'Mechanical';
    riskLevel = 'High';
  } else if (text.includes('weather') || text.includes('traffic') || text.includes('road')) {
    category = 'Route Delay';
    riskLevel = 'Medium';
  } else if (text.includes('warehouse') || text.includes('loading') || text.includes('dock')) {
    category = 'Operations Delay';
    riskLevel = 'Medium';
  } else if (text.includes('accident') || text.includes('crash') || text.includes('fire')) {
    category = 'Critical Incident';
    riskLevel = 'Critical';
  }

  return { category, riskLevel };
};
