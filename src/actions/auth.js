import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, navigate, checked) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({
            type: AUTH,
            data
        });
        navigate('/');

        if(!checked){
          localStorage.clear();
        }
    } catch (e) {
        console.log(e);
    }
}

export const signup = (formData, navigate, checked) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({
            type: AUTH,
            data
        });

        navigate('/');
        if(!checked){
          localStorage.clear();
        }
    } catch (e) {
        console.log(e);
    }
}
