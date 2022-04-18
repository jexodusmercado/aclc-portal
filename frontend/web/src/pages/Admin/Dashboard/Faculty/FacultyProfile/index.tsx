import Card from 'components/CardContainer';
import { useEffectOnce, useGetUser, useUpdateEffect } from 'hooks';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserRequest } from 'redux/users/action';

const FacultyProfile = () => {
    const dispatch      = useDispatch()
    const user          = useGetUser()
    const navigate      = useNavigate()
    const {id: pageId}  = useParams()

    useEffectOnce(() => {
        if(pageId) {
            dispatch(getUserRequest({id: pageId.toString()}))
        }
    })

    useUpdateEffect(() => {
        if(!user.loading && user.type !== "FACULTY") {
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