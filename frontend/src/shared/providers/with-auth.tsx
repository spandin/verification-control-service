import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/use-auth"

const withAuth = (WrappedComponent: any) => {
  const navigate = useNavigate()
  return (props: any) => {
    const { isAuth } = useAuth()

    if (!isAuth) {
      navigate("/")
    }

    // if (userIsInactive) {
    //   logout()
    //   navigate("/")
    // }
    return <WrappedComponent {...props} />
  }
}

export default withAuth
