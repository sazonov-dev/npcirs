import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditNoteForm({ edit, setEdit, setRender, userData }) {
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [birthdate, setBirthdate] = useState('')

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [selected, setSelected] = useState(userData[0])

    const stateRefresh = () => {
        setRender(false)
        setFirstname('')
        setLastname('')
        setEmail('')
        setBirthdate('')
    }

    const createEvent = async () => {
        const id = selected?.id
        try {
            const response = await axios.post('http://localhost:3001/editNote', {
                body: {
                    id, firstName, lastName, email, birthdate
                }
            })

            if (response.status === 200) {
                toast.success("Запись изменена!", {
                    position: toast.POSITION.TOP_CENTER
                })
                stateRefresh()
                setRender(true)
                setTimeout(() => {
                    setEdit(false)
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
    }, [firstName, lastName, email, birthdate, selected])

    return (

        <Transition.Root show={edit} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setEdit}>
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
                                    <Listbox value={selected} onChange={setSelected}>
                                        {({ open }) => (
                                            <>
                                                <Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                                        <span className="block truncate">{selected?.id ? 'ID ' + selected?.id + ' ' + selected?.first_name + ' ' + selected?.last_name : 'Выберите человека'}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {userData.map((person) => (
                                                                <Listbox.Option
                                                                    key={person.id}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                        )
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                                {'ID ' + person.id + ' ' + person.first_name + ' ' + person.last_name}
                                                                            </span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                    <div className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder={selected?.first_name ? selected.first_name : 'John'}
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
                                            placeholder={selected?.last_name ? selected.last_name : 'Snow'}
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
                                            placeholder={selected?.email ? selected.email : 'johnsnow@gmail.com'}
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
                                            placeholder={selected?.birthdate}
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
                                        Изменить запись
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={() => setEdit(false)}
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
