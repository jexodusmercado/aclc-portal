import Card from 'components/CardContainer';
import { useEffectOnce, useUpdateEffect } from 'hooks';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { isLoading } from 'redux/loading/selector';
import { getUserRequest } from 'redux/users/action';
import { getUser } from 'redux/users/selector';
import { GET_USER } from 'redux/users/types';

const FacultyProfile = () => {
    const dispatch      = useDispatch()
    const user          = useSelector(getUser)
    const loading       = useSelector(isLoading([GET_USER]))
    const navigate      = useNavigate()
    const {id: pageId}  = useParams()

    useEffectOnce(() => {
        if(pageId) {
            dispatch(getUserRequest({id: pageId.toString()}))
        }
    })

    useUpdateEffect(() => {
        if(!loading && user.type !== "FACULTY") {
            toast.error('User is not a faculty member')
            navigate('/dashboard/faculty')
        }
    },[user])

    return (
        <div className='containerized'>
            <Card>
                Profile here
            </Card>
        </div>
    )

}

export default FacultyProfile;