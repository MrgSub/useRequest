import {useRequest} from "./index";

interface RequestData {
    username: string
    password: string
}

const myFunction = async () => {
    return new Promise((resolve, reject) => {
        resolve({data: true})
    })
}


const MyTestComponent = () => {
    const { myFunctionRequest, myFunctionStatuscode, myFunctionResponse } = useRequest<'myFunction', RequestData>(myFunction,'myFunction')

    // useEffect to trigger on myFunctionResponse or myFunctionStatuscode

    const onSubmit = (data: RequestData) => myFunctionRequest(data)
    //     ... return html below here
}


// This should work
