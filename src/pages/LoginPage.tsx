import React from 'react'
import LoginForm from '../components/LoginForm'
import { User } from '../types'

interface LoginPageProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <LoginForm setUser={setUser} />
    </div>
  )
}

export default LoginPage
