import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import ClipLoader from "react-spinners/ClipLoader";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddNoteForm from '../Modal/AddNoteForm';
import EditNoteForm from '../Modal/EditNoteForm';
import DeleteNoteForm from '../Modal/DeleteNoteForm';


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
};

export default function Tables() {
    const getRowData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/tables')
            const { user, post } = response.data
            setUserData(user)
            setPostData(post)
        } catch (e) {
            console.error(e.message);
        }
    }

    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [del, setDelete] = useState(false)
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#ffffff");
    const [userData, setUserData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [render, setRender] = useState(false);

    const [postDefst] = useState([
        { field: 'id' },
        { field: 'user_id' },
        { field: 'title' },
        { field: 'description' },
        { field: 'rating' },
        { field: 'like_count' },
        { field: 'hidden' }
    ])

    const [userDefs] = useState([
        { field: 'id' },
        { field: 'first_name' },
        { field: 'last_name' },
        { field: 'email' },
        { field: 'birthdate' }
    ])

    useEffect(() => {
        getRowData();
        const overlay = document.querySelector('.ag-theme-alpine');
        const spinner = document.querySelector('.spinner');
        spinner.style.marginBottom = '200px'
        spinner.style.marginTop = '200px'
        overlay.style.display = 'none';
        setTimeout(() => {
            setLoading(false)
            overlay.style.display = 'block';
        }, 5000)

    }, [])

    useEffect(() => {
        setRender(false)
        getRowData();
    }, [render])
    return (
        <>
            <ClipLoader
                className='spinner'
                color={color}
                loading={loading}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader" />

            <div className="ag-theme-alpine" style={{ height: 400, width: 1000, paddingBottom: 50 }}>
                <div className="buttons mb-5">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="mr-3 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Добавить запись
                    </button>

                    <AddNoteForm open={open} setOpen={setOpen} setRender={setRender} />
                    <button
                        type="button"
                        className="mr-3 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setEdit(true)}
                    >
                        Изменить запись
                    </button>
                    <EditNoteForm edit={edit} setEdit={setEdit} setRender={setRender} userData={userData}/>
                    <button
                        type="button"
                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setDelete(true)}
                    >
                        Удалить запись
                    </button>
                    <DeleteNoteForm del={del} setDelete={setDelete} setRender={setRender} userData={userData}/>
                </div>

                <AgGridReact
                    rowData={userData}
                    columnDefs={userDefs}>
                </AgGridReact>

            </div>
            <div className="ag-theme-alpine" style={{ height: 400, width: 1200, marginTop: 50 }}>
                <AgGridReact
                    rowData={postData}
                    columnDefs={postDefst}>
                </AgGridReact>
            </div>
        </>
    );
};