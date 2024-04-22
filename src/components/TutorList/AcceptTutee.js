import { acceptPendingRequest } from "../../redux/classRequestReducer"
import { useDispatch, useSelector } from "react-redux";

/*
Testing function.

In this function, all tutors accept all pending tutee requests.
*/
export function AcceptTutee() {

    const dispatch = useDispatch();

    const pendingRequest = useSelector(state => state.classRequest.pendingRequest);

    const onClick = () => {
        dispatch(acceptPendingRequest(pendingRequest));
    }


    return (
        <div className="accept-all regular-400 w-48 h-10 bg-gray-200 rounded-full shadow-lg inline-flex justify-center items-center mx-1 mt-10 hover:bg-ringle-purple hover:text-white"
            onClick={onClick}>튜터가 일절 수락하기</div>
    )
}