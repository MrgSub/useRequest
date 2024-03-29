## useRequest - A "Lazy" dev's hook

### Dependencies:

- We use `camelCase` `capitalize` from `lodash`
- We use `AxiosError` from `axios` (We assume you're using Axios)
- We use `createContext` `useContext` `useReducer` from `react`

### Example:

```typescript jsx

// Simple login function using Axios
interface ILogin {
    username: string;
    password: string;
}

const handleLogin = ({username, password}:ILogin) => {
    return axios.post('/auth/login', {username, password})
}

const MyComponent = () => {
    // Typescript friendly return type
    const {
        handleLoginRequest,
        handleLoginLoading,
        handleLoginResponse,
        handleLoginError,
    } = useRequest(handleLogin, 'handleLogin');
    
    
    // Handle API success
    useEffect(()=>{
        if (handleLoginResponse) {
            // Login successful 
        }
    },[handleLoginResponse])

    // Handle API errors
    useEffect(()=>{
        if (handleLoginError) {
            // Login failed 
        }
    },[handleLoginError])
    
    // Submit the form
    const onSubmit = (data: ILogin) => handleLoginRequest({username: data.username, password: data.password})
    
    // Example button that's disabled while loading
    return <div>
        <button disabled={handleLoginLoading} onClick={onSubmit}></button>
    </div>
}

```

### Quickstart:

`npm i @ajxb/userequest`

```typescript
import {useRequest} from '@ajxb/userequest'
```

```typescript
const {} = useRequest<MyInterface,'myFunction'>(myFunction, 'myFunction')
```

#### Known ughs:

- `function.name` is an es6 feature which doesn't exist anymore, might make a workaround. For now, you should pass the function name as a second argument
