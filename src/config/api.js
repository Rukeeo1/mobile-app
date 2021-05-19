import axios from 'axios'
import { AsyncStorage, Alert } from 'react-native'

import { API_URL } from '../constants'

export const apiRequest = async (endpoint, method = 'get', body = {}, contentType = 'application/json') => {
  try {
    const token = await AsyncStorage.getItem('token')
    
    const url = `${API_URL}${endpoint}`

    const request = await axios(url, {
      data: method === 'get' ? null : { ...body },
      method: method.toUpperCase(),
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
        'Content-Type': contentType,
        Accept: '*/*',
      },
    })

    return Promise.resolve(request)
  } catch (error) {
    console.log(endpoint, error)

    return Promise.reject(error)
  }
}

export const showApiError = (err, tryAgain = true, tryAgainFunc = null, tryAgainText = 'Try Again', title = '') => {
  const message = err?.response?.data?.message || err?.response?.data?.error || err?.message

  if (err.response?.status !== 401 || err.response?.config?.url?.includes('signin')) {
    Alert.alert(
      title,
      message,
      [
        { text: 'Dismiss' },
        tryAgain && {
          text: tryAgainText,
          onPress: tryAgainFunc,
        },
      ],
    )
  }
  return message
}
