import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddNoteForm({ open, setOpen, setRender }) {
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [birthdate, setBirthdate] = useState('')
    
    const stateRefresh = () => {
        setRender(false)
        setFirstname('')
        setLastname('')
        setEmail('')
        setBirthdate('')
    }

    const createEvent = async () => {
        try {
            const response = await axios.post('http://localhost:3001/addNote', {
                body: {
                    firstName, lastName, email, birthdate
                }
            })

            if (response.status === 200) {
                toast.success("Запись добавлена!", {
                    position: toast.POSITION.TOP_CENTER
                })
                stateRefresh()
                setRender(true)
                setTimeout(() => {
                    setOpen(false)
                }, 1000)
            } else {
                toast.error("Что-то пошло не так !", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch (err) {
            stateRefresh()
            toast.error("Что-то пошло не так !", {
                position: toast.POSITION.TOP_CENTER
            });
            console.error(err.message);
        }
    }

    const checkValidInput = (firstname, lastname, email, birthdate) => {
        const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (firstname !== '' && firstname.length >= 2 && lastname !== '' && lastname.length >= 2 && email !== '' && email.match(emailFormat) && birthdate !== '') {
            return createEvent()
        }

        return toast.error("Поля нельзя оставлять пустыми, каждое поле должно иметь минимум 2 символа", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    useEffect(() => {
    }, [firstName, lastName, email, birthdate])

    return (

        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <ToastContainer />

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div className="isolate -space-y-px rounded-md shadow-sm flex flex-col space-y-4">
                                    <div className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Jane"
                                            onChange={e => setFirstname(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Smith"
                                            onChange={e => setLastname(e.target.value)}
                                        />
                                    </div>
                                    <div className="block mt-2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="JaneSmith@gmail.com"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                            Birthday
                                        </label>
                                        <input
                                            type="date"
                                            name="birthdate"
                                            id="birthdate"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Jane Smith"
                                            onChange={e => setBirthdate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={() => checkValidInput(firstName, lastName, email, birthdate)}
                                    >
                                        Добавить запись
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Вернуться назад
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>


    )
}
