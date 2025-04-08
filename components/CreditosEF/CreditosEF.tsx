import { useState } from 'react';

interface Credito {
  month: string;
  monto: number;
  estado: 'positivo' | 'negativo';
}

function CreditosEF() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [creditos, setCreditos] = useState<Credito[]>([]);

  // Generate years array from 2022 to 2030
  const years = Array.from({ length: 9 }, (_, i) => 2022 + i);
  
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Generate random credit data
  const generateRandomCreditos = (): Credito[] => {
    return months.map(month => {
      const monto = parseFloat((Math.random() * 5000 - 1000).toFixed(2));
      const estado = monto >= 0 ? 'positivo' as const : 'negativo' as const;
      
      return { month, monto, estado };
    });
  };

  // Initialize data if empty
  if (creditos.length === 0) {
    setCreditos(generateRandomCreditos());
  }

  // Handle year change
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setCreditos(generateRandomCreditos());
  };

  const total = creditos.reduce((sum, { monto }) => sum + monto, 0);
  const totalEstado = total >= 0 ? 'positivo' : 'negativo';

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white rounded-xl shadow-md font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Total de Ingresos</h1>
      
      {/* Year selector */}
      <div className="flex gap-3 mb-6 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-[#253b4a] scrollbar-track-gray-100">
        {years.map(year => (
          <button
            key={year}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap text-sm ${
              selectedYear === year
                ? 'bg-[#253b4a] text-white font-medium shadow'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
            onClick={() => handleYearChange(year)}
          >
            {year}
          </button>
        ))}
      </div>
      
      {/* Credits table */}
      {selectedYear && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Créditos {selectedYear}</h2>
          <div className="rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-[#253b4a] text-white">
                    <th className="px-4 py-3 text-left font-medium">Mes</th>
                    <th className="px-4 py-3 text-left font-medium">Monto ($)</th>
                    <th className="px-4 py-3 text-left font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {creditos.map(({ month, monto, estado }) => (
                    <tr key={month} className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="px-4 py-3">{month}</td>
                      <td className="px-4 py-3">
                        {monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-3 py-1 rounded-md text-center min-w-[80px] font-medium ${
                          estado === 'positivo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {estado === 'positivo' ? 'Positivo' : 'Negativo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-gray-50">
                    <td className="px-4 py-3 border-t-2 border-gray-300">Total</td>
                    <td className="px-4 py-3 border-t-2 border-gray-300">
                      {total.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td className="px-4 py-3 border-t-2 border-gray-300">
                      <span className={`inline-block px-3 py-1 rounded-md text-center min-w-[80px] font-medium ${
                        totalEstado === 'positivo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {total >= 0 ? 'Positivo' : 'Negativo'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreditosEF;