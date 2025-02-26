/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getInstructions } from "../services/InstructionsService";
import { getVisitations } from "../services/VisitationsService";

interface DataContextType {
  instructions: any[];
  visitations: any[];
  loading: boolean;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [instructions, setInstructions] = useState<any[]>([]);
  const [visitations, setVisitations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [instructionsData, visitationsData ] = await Promise.all([
        getInstructions(user.role, user.id),
        getVisitations(user.role, user.id),
      ]);

      setInstructions(instructionsData);
      setVisitations(visitationsData);
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
    <DataContext.Provider value={{ instructions, visitations, loading, refreshData: fetchData }}>
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
