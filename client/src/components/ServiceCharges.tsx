import React from 'react';
import ResponsiveTable from './ResponsiveTable';

const ServiceCharges = () => {
  const domesticColumns = [
    { header: 'SERVICE TYPE', accessor: 'type', isHeader: true },
    { header: 'CHARGES', accessor: 'charge', className: 'w-64 font-bold' },
  ];

  const domesticData = [
    { type: 'RO REPAIR', charge: '₹150 + Spare Parts Cost' },
    { type: 'RO SERVICE', charge: '₹150 + Spare Parts Cost' },
    { type: 'RO INSTALLATION', charge: '₹400 + Spare Parts Cost' },
    { type: 'RO UN-INSTALLATION', charge: '₹200' },
    { type: 'RO INSTALLATION & RO UN-INSTALLATION', charge: '₹500 + Spare Parts Cost' },
  ];

  const commercialData = [
    { type: 'RO MACHINE UPTO 50 LPH REPAIR & SERVICE', charge: '₹199' },
    { type: 'RO MACHINE UPTO 100 LPH TO 250 LPH REPAIR & SERVICE', charge: '₹249' },
    { type: 'RO MACHINE UPTO 500 LPH TO 1000 LPH REPAIR & SERVICE', charge: '₹499' },
    { type: 'RO MACHINE 1000 LPH AND ABOVE REPAIR & SERVICE', charge: '₹1499' },
  ];

  return (
    <div className="my-12 space-y-12" data-testid="table-service-charges">
      <div>
        <ResponsiveTable 
          columns={domesticColumns} 
          data={domesticData} 
          title="Domestic RO Service Charges in Delhi" 
        />
        <p className="text-center text-sm text-gray-500 mt-2 italic">RO Repair Service Charges in Delhi, RO Repair Cost in Delhi, RO Repair Price in Delhi, RO Service Cost In Delhi, RO Water Purifier Service Cost in Delhi.</p>
      </div>

      <ResponsiveTable 
        columns={domesticColumns} 
        data={commercialData} 
        title="Commercial RO Service Charges in Delhi" 
      />
    </div>
  );
};

export default ServiceCharges;
