import React, { createContext, useEffect, useState } from 'react'
import { SAT_STATUS, SAT_TYPE } from '../helpers/constants'
import { client, setAuthHeader } from '../helpers/axiosClient'

// Create the Context
export const MyContext = createContext()

const MyContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null)
  const [starlinkData, updateStarlinkData] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [selectedSat, updateSelectedSat] = useState(null)
  const [globeTexture, updateGlobalTexture] = useState(3)
  const [satInfoModal, setSatInfoModal] = useState({
    open: false,
    id: null
  })

  const handleSatInfoModal = (id) => {
    setSatInfoModal({
      id, open: !!id
    })
  }

  const [dataFilters, setDataFilters] = useState({
    status: SAT_STATUS.BOTH,
    search: null,
    type: SAT_TYPE.ALL,
    dateRange: null
  })

  // Load the token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
      setAuthToken(storedToken)
    }
  }, [])

  useEffect(() => {
    console.log('authToken: ', authToken)
    if (authToken) {
      setAuthHeader(authToken)
      postQuery({})
    }
  }, [authToken])

  // Update the token and store it in localStorage
  const updateAuthToken = (token) => {
    setAuthToken(token)
    localStorage.setItem('authToken', token)
  }

  // Remove the token from state and localStorage
  const handleLogout = () => {
    setAuthToken(null)
    localStorage.removeItem('authToken')
  }

  const postQuery = ({
    page = (starlinkData?.page || 1),
    limit = (starlinkData?.limit || 10),
    status = (dataFilters?.status),
    type = (dataFilters?.type || SAT_TYPE.ALL),
    // search = ( dataFilters?.search || undefined ),
    dateRange = (dataFilters?.dateRange || undefined)
  }, actionType) => {
    console.log({ page, limit, status, type, dateRange }, actionType)

    setDataLoading(true)

    const resetPage = actionType !== 'page'
    console.log('resetPage: ', actionType, resetPage)

    client.post('/starlink/query', {
      page: resetPage ? 1 : page,
      limit,
      status,
      type,
      dateRange
    }).then(res => {
      // console.log(res.data)
      const data = res.data
      console.log(data)

      updateStarlinkData(data)
    }).finally(() => {
      setDataLoading(false)
    })
  }

  const updateDataFilters = (newFilters, actionType) => {
    const { page, limit, status, type, search, dateRange } = newFilters
    setDataFilters({
      ...dataFilters,
      ...newFilters
    })
    postQuery({ page, limit, status, type, search, dateRange }, actionType)
  }

  return (
    <MyContext.Provider
      value={{
        authToken,
        updateAuthToken,
        handleLogout,
        starlinkData,
        updateStarlinkData,
        dataFilters,
        updateDataFilters,
        dataLoading,
        setDataLoading,
        selectedSat,
        updateSelectedSat,
        globeTexture,
        updateGlobalTexture,
        satInfoModal,
        handleSatInfoModal
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export default MyContextProvider
