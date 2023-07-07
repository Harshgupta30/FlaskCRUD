import * as types from './actionType';
import axios from 'axios';

const API = 'http://localhost:5000';

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
});

const addUser = (msg) => ({
    type: types.ADD_USER,
    payload: msg
})

const userDelete = (msg) => ({
    type: types.UPDATE_USER,
    payload: msg
})

const userUpdate = (msg) => ({
    type: types.DELETE_USER,
    payload: msg
})

const getUser = (users) => ({
    type: types.GET_SINGLE_USER,
    payload: users
});

export const loadUsers = () => {
    return function(dispatch){
    axios.get(`${API}/users`).then((resp) => dispatch(getUsers(resp.data))).catch(err => console.log(err));
    };
};

export const addUsers = (user) => {
    return function(dispatch){
    axios.post(`${API}/users`,user).then((resp) => {dispatch(addUser(resp.data.msg)),
    dispatch(loadUsers());
    })
    .catch(err => console.log(err));
    };
};

export const deleteUser = (id) => {
    return function(dispatch){
    axios.delete(`${API}/user/${id}`).then((resp) => {dispatch(userDelete(resp.data.msg)),
    dispatch(loadUsers());
    })
    .catch(err => console.log(err));
    };
}

export const getSingleUser = (id) => {
    return function(dispatch){
    axios.get(`${API}/user/${id}`).then((resp) => {dispatch(getUser(resp.data))})
    .catch(err => console.log(err));
    };
};

export const updateUser = (user , id) => {
    return function(dispatch){
    axios.put(`${API}/users/${id}`,user).then((resp) => {dispatch(userUpdate(resp.data.msg)),
    dispatch(loadUsers());
    })
    .catch(err => console.log(err));
    };
};