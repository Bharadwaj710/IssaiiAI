const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const isNumberInRange = (value, min, max) => {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max;
};

const validators = {
  register: (body) => {
    const errors = [];
    if (!isNonEmptyString(body.name)) errors.push('Name is required.');
    if (!emailPattern.test(body.email || '')) errors.push('Valid email is required.');
    if (!isNonEmptyString(body.password) || body.password.length < 8) errors.push('Password must be at least 8 characters.');
    if (body.role && !['operator', 'manager', 'admin'].includes(body.role)) errors.push('Role must be operator, manager, or admin.');
    return errors;
  },
  login: (body) => {
    const errors = [];
    if (!emailPattern.test(body.email || '')) errors.push('Valid email is required.');
    if (!isNonEmptyString(body.password)) errors.push('Password is required.');
    return errors;
  },
  vehicle: (body) => {
    const errors = [];
    if (!isNonEmptyString(body.vehicleId)) errors.push('Vehicle ID is required.');
    if (!isNonEmptyString(body.driver)) errors.push('Driver name is required.');
    if (!isNumberInRange(body.fuelLevel, 0, 100)) errors.push('Fuel level must be between 0 and 100.');
    if (!isNumberInRange(body.capacity, 1, 200)) errors.push('Capacity must be between 1 and 200 tons.');
    return errors;
  },
  dispatch: (body) => {
    const errors = [];
    if (!isNonEmptyString(body.title)) errors.push('Dispatch title is required.');
    if (!isNonEmptyString(body.source)) errors.push('Source location is required.');
    if (!isNonEmptyString(body.destination)) errors.push('Destination is required.');
    if (!body.expectedDelivery || Number.isNaN(Date.parse(body.expectedDelivery))) errors.push('Valid expected delivery date is required.');
    if (body.priority && !['Low', 'Medium', 'High', 'Critical'].includes(body.priority)) errors.push('Priority is invalid.');
    return errors;
  },
  status: (body) => {
    const allowed = ['Pending', 'Assigned', 'In Transit', 'Delivered', 'Delayed'];
    return allowed.includes(body.status) ? [] : ['Status is invalid.'];
  },
  incident: (body) => {
    if (!isNonEmptyString(body.incidentDescription) || body.incidentDescription.trim().length < 10) {
      return ['Incident description must be at least 10 characters.'];
    }
    return [];
  },
};

export const validateRequest = (type) => (req, res, next) => {
  const errors = validators[type]?.(req.body) || [];
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  return next();
};
