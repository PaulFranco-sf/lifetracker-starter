import { createContext, useState, useContext, useEffect } from "react"
import { useAuthContext } from "./auth"
import apiClient from "../apiClient/apiClient"

const NutritionContext = createContext(null)

export const NutritionContextProvider = ({ children }) => {
  const { user } = useAuthContext()
  const [initialized, setInitialized] = useState(false)
  const [nutritions, setNutritions] = useState([])
  
  useEffect(() => {
    const fetchUserNutrition = async () => {
      const { data } = await apiClient.fetchUserNutrition()
      if (data?.userNutrition) setNutritions(data.userNutrition)
      setInitialized(true)
    }

    if (user?.username) {
      fetchUserNutrition()
    }
  }, [user])

  const nutritionValue = { nutritions, setNutritions, initialized }

  return (
    <NutritionContext.Provider value={nutritionValue}>
      <>{children}</>
    </NutritionContext.Provider>
  )
}

export const useNutritionContext = () => useContext(NutritionContext)
