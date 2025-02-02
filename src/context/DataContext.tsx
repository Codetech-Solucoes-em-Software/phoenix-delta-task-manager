/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getInstructions } from "../services/InstructionsService";
import { getVisitations } from "../services/VisitationsService";
import { getReadings } from "../services/ReadingsService";
import { getCompletionWorks } from "../services/CompletionWorksService";

interface DataContextType {
  instructions: any[];
  visitations: any[];
  readings: any[];
  completionWorks: any[];
  loading: boolean;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [instructions, setInstructions] = useState<any[]>([]);
  const [visitations, setVisitations] = useState<any[]>([]);
  const [readings, setReadings] = useState<any[]>([]);
  const [completionWorks, setCompletionWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [instructionsData, visitationsData, readingsData, completionWorksData] = await Promise.all([
        getInstructions(user.role, user.id),
        getVisitations(user.role, user.id),
        getReadings(user.role, user.id),
        getCompletionWorks(user.role, user.id),
      ]);

      setInstructions(instructionsData);
      setVisitations(visitationsData);
      setReadings(readingsData);
      setCompletionWorks(completionWorksData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  return (
    <DataContext.Provider value={{ instructions, visitations, readings, completionWorks, loading, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext deve ser usado dentro de um DataProvider");
  }
  return context;
};
