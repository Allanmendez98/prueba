import { useState } from 'react';
import styles from './AportacionesMensuales.module.css';
import ModalPago from '@/components/ModalPago/ModalPago';


interface Aporte {
  month: string;
  aporte: number;
  pagado: boolean;
}

interface AportesData {
  [year: number]: Aporte[];
}

interface MontosData {
  [year: number]: {
    [monthIndex: number]: number;
  };
}

interface PagosData {
  [year: number]: {
    [monthIndex: number]: boolean;
  };
}

function AportacionesMensuales() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [aportes, setAportes] = useState<AportesData>({});
  const [montos, setMontos] = useState<MontosData>({});
  const [pagos, setPagos] = useState<PagosData>({});
  const [showModalPago, setShowModalPago] = useState<boolean>(false);
  const [mesAPagar, setMesAPagar] = useState<number | null>(null);

  // Generate years array from 2022 to 2030
  const years = Array.from({ length: 9 }, (_, i) => 2022 + i);
  
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Initialize data
  const initializeData = (): AportesData => {
    const initialData: AportesData = {};
    years.forEach(year => {
      initialData[year] = months.map(month => {
        if (year < 2024) {
          const aporte = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
          return {
            month,
            aporte,
            pagado: true
          };
        } else {
          return {
            month,
            aporte: 0,
            pagado: false
          };
        }
      });
    });
    return initialData;
  };

  // Initialize data if empty
  if (Object.keys(aportes).length === 0) {
    setAportes(initializeData());
  }

  // Handle amount change
  const handleMontoChange = (year: number, monthIndex: number, value: string) => {
    const newMontos = { ...montos };
    if (!newMontos[year]) newMontos[year] = {};
    newMontos[year][monthIndex] = Number(value);
    setMontos(newMontos);
    
    // Update contributions
    const newAportes = { ...aportes };
    newAportes[year][monthIndex].aporte = Number(value) || 0;
    setAportes(newAportes);
  };

  // Open payment modal
  const handleAbrirModalPago = (monthIndex: number) => {
    setMesAPagar(monthIndex);
    setShowModalPago(true);
  };

  // Handle completed payment
  const handlePagoCompletado = () => {
    if (mesAPagar !== null) {
      // Individual payment
      const newPagos = { ...pagos };
      if (!newPagos[selectedYear]) newPagos[selectedYear] = {};
      newPagos[selectedYear][mesAPagar] = true;
      setPagos(newPagos);
    } else {
      // Full payment
      const newPagos = { ...pagos };
      if (!newPagos[selectedYear]) newPagos[selectedYear] = {};
      
      months.forEach((_, index) => {
        if (aportes[selectedYear][index].aporte > 0) {
          newPagos[selectedYear][index] = true;
        }
      });
      
      setPagos(newPagos);
    }
    setMesAPagar(null);
  };

  // Calculate pending total (ONLY MONTHS WITH AMOUNT > 0)
  const calcularPendiente = (): number => {
    if (!aportes[selectedYear]) return 0;
    
    return aportes[selectedYear].reduce((total, item, index) => {
      const estaPagado = selectedYear < 2024 || (pagos[selectedYear] && pagos[selectedYear][index]);
      const tieneMonto = item.aporte > 0;
      return (!estaPagado && tieneMonto) ? total + item.aporte : total;
    }, 0);
  };

  // Get months with pending amount
  const mesesConPendiente = (): number => {
    if (!aportes[selectedYear]) return 0;
    return aportes[selectedYear].filter((item, index) => {
      const estaPagado = selectedYear < 2024 || (pagos[selectedYear] && pagos[selectedYear][index]);
      return item.aporte > 0 && !estaPagado;
    }).length;
  };

  return (
    <div className="max-w-5xl mx-auto p-5 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Aportaciones Mensuales</h1>
      
      {/* Years list */}
      <div className="flex flex-wrap gap-3 mb-8 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-[#253b4a] scrollbar-track-gray-100">
        {years.map(year => (
          <button
            key={year}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedYear === year 
                ? 'bg-green-600 text-white font-bold shadow-md' 
                : 'bg-[#253b4a] text-white hover:bg-[#1a2d3a] hover:-translate-y-0.5'
            } whitespace-nowrap text-sm`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
      
      {/* Contributions table */}
      {selectedYear && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Aportaciones {selectedYear}</h2>
          <div className="rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-[#253b4a] text-white">
                    <th className="px-4 py-3 text-left">Mes</th>
                    <th className="px-4 py-3 text-left">Monto a Aportar ($)</th>
                    <th className="px-4 py-3 text-left">Aporte ($)</th>
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-left">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {aportes[selectedYear]?.map(({month, aporte}, index) => {
                    const estaPagado = selectedYear < 2024 || (pagos[selectedYear] && pagos[selectedYear][index]);
                    const tieneMonto = aporte > 0;
                    
                    return (
                      <tr key={month} className="hover:bg-gray-50 border-b border-gray-200">
                        <td className="px-4 py-3">{month}</td>
                        <td className="px-4 py-3">
                          {selectedYear >= 2024 && (
                            <input
                              type="number"
                              min="0"
                              value={montos[selectedYear]?.[index] || ''}
                              onChange={(e) => handleMontoChange(selectedYear, index, e.target.value)}
                              placeholder="Ingrese monto"
                              className="border border-gray-300 rounded px-3 py-2 w-32 focus:border-[#253b4a] focus:outline-none focus:ring-1 focus:ring-[#253b4a]"
                            />
                          )}
                        </td>
                        <td className="px-4 py-3">{aporte.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-3 py-1 rounded-md text-center min-w-[90px] font-medium ${
                            !tieneMonto && selectedYear >= 2024 
                              ? 'bg-gray-100 text-gray-600' 
                              : estaPagado 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {!tieneMonto && selectedYear >= 2024 ? 'Sin monto' : 
                            estaPagado ? 'Pagado' : 'Pendiente'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {selectedYear >= 2024 && tieneMonto && !estaPagado && (
                            <button 
                              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all hover:-translate-y-0.5 shadow hover:shadow-md font-medium"
                              onClick={() => handleAbrirModalPago(index)}
                            >
                              Pagar
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="font-bold bg-gray-50">
                    <td className="px-4 py-3 border-t-2 border-[#253b4a]" colSpan={2}>Total Pendiente</td>
                    <td className="px-4 py-3 border-t-2 border-[#253b4a]" colSpan={3}>
                      {selectedYear >= 2024 && calcularPendiente() > 0 ? (
                        <span className="text-red-600">
                          ${calcularPendiente().toLocaleString()} ({mesesConPendiente()} meses pendientes)
                        </span>
                      ) : (
                        <span className="text-green-600">Todos los aportes están pagados</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {selectedYear >= 2024 && mesesConPendiente() > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-right">
              <button 
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl font-bold disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                onClick={() => {
                  setMesAPagar(null);
                  setShowModalPago(true);
                }}
                disabled={mesesConPendiente() === 0}
              >
                Pagar Todo (${calcularPendiente().toLocaleString()})
              </button>
              <p className="text-gray-600 text-sm mt-2">
                Se marcarán como pagados los {mesesConPendiente()} meses con aporte registrado
              </p>
            </div>
          )}
        </div>
      )}

      {/* Payment modal */}
      {showModalPago && (
        <ModalPago 
          onClose={() => setShowModalPago(false)}
          onPagoCompletado={handlePagoCompletado}
          montoAportaciones={
            mesAPagar !== null 
              ? aportes[selectedYear][mesAPagar].aporte 
              : calcularPendiente()
          }
        />
      )}
    </div>
  );
}

export default AportacionesMensuales;