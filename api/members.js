export default [
  {
    id: 1,
    date_of_service: Math.floor(Date.now() / 1000),
    insurance_name: 'Aetna',
    insurance_type: 'Primary',
    type_of_service: 'Surgery',
    other_insurances: '',
    total_charges: 400,
    pending_charges: 14
  },
  {
    id: 2,
    date_of_service: Math.floor(Date.now() / 1000),
    insurance_name: 'DCMA',
    insurance_type: 'Secondary',
    type_of_service: 'Surgery',
    other_insurances: '',
    total_charges: 500,
    pending_charges: 15
  },
  {
    id: 3,
    date_of_service: Math.floor(Date.now() / 1000) + 1200000,
    insurance_name: 'Aetna',
    insurance_type: 'Primary',
    type_of_service: 'Consultancy',
    other_insurances: '',
    total_charges: 600,
    pending_charges: 150
  },
  {
    id: 4,
    date_of_service: Math.floor(Date.now() / 1000) + 6000,
    insurance_name: 'Shouldice',
    insurance_type: 'Tertiary',
    type_of_service: 'Radiology',
    other_insurances: '',
    total_charges: 600,
    pending_charges: 50
  },
  {
    id: 5,
    date_of_service: Math.floor(Date.now() / 1000) + 500,
    insurance_name: 'Mem',
    insurance_type: 'Primary',
    type_of_service: 'Medicine',
    other_insurances: '',
    total_charges: 40,
    pending_charges: 0
  }
]
