import { createContext, useContext } from "react"

const AppContext = createContext()

export const AppWrapper = ({ children }) => {
  let sharedState = {
    books: [
      {
        name: "Book 1"
      },
      {
        name: "Book 2"
      },
    ]
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
