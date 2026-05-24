export const analyzeIncident = (description) => {
  const text = description.toLowerCase();
  
  let category = 'Other';
  let riskLevel = 'Low';
  let recommendedAction = 'Review the incident notes and monitor the route for further disruption.';
  let operationalImpact = 'Minor operational variance with limited network impact.';
  
  if (text.includes('fuel') || text.includes('engine') || text.includes('leakage') || text.includes('mechanical')) {
    category = 'Mechanical';
    riskLevel = 'High';
    recommendedAction = 'Assign maintenance support, notify the dispatcher, and prepare a backup vehicle.';
    operationalImpact = 'High chance of delivery delay and vehicle downtime.';
  } else if (text.includes('weather') || text.includes('traffic') || text.includes('road')) {
    category = 'Route Delay';
    riskLevel = 'Medium';
    recommendedAction = 'Recalculate ETA, notify receiving dock, and evaluate alternate route options.';
    operationalImpact = 'Expected schedule slippage on the current route.';
  } else if (text.includes('warehouse') || text.includes('loading') || text.includes('dock')) {
    category = 'Operations Delay';
    riskLevel = 'Medium';
    recommendedAction = 'Escalate to warehouse coordinator and re-sequence loading or unloading priority.';
    operationalImpact = 'Potential dock congestion and dispatch queue delay.';
  } else if (text.includes('accident') || text.includes('crash') || text.includes('fire')) {
    category = 'Critical Incident';
    riskLevel = 'Critical';
    recommendedAction = 'Trigger emergency escalation, pause route progression, and assign incident owner immediately.';
    operationalImpact = 'Critical disruption requiring immediate management attention.';
  }

  return { category, riskLevel, recommendedAction, operationalImpact };
};
