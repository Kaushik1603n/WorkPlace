// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../features/auth/authHooks';
// import AuthForm from './AuthForm';
// import { loginSchema } from '../../utils/schemas';

// export default function Login() {
//   const { login, error } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (credentials) => {
//     await login(credentials);
//     navigate('/dashboard');
//   };

//   const fields = [
//     { name: 'email', label: 'Email', type: 'email' },
//     { name: 'password', label: 'Password', type: 'password' },
//   ];

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-6">Login</h2>
//       {error && <div className="text-red-500 mb-4">{error.message}</div>}
//       <AuthForm
//         schema={loginSchema}
//         onSubmit={handleLogin}
//         fields={fields}
//         submitText="Login"
//       />
//     </div>
//   );
// }

