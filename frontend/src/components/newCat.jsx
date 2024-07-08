import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import * as CatService from '../../services/';
import { useNavigate } from 'react-router-dom';


export const NewCat = ({ initialCount = 0 }) => {
    const { register, control, handleSubmit } = useForm();
    const navigate = useNavigate();


    const sexOptions = [
        { value: 1, label: 'Female' },
        { value: 2, label: 'Male' },
    ];

    const breedOptions = [
        { value: 1, label: 'Siamese' },
        { value: 2, label: 'British Shorthair'},
        { value: 3, label: 'Maine Coon' },
        { value: 4, label: 'Persian'}
    ]

    const onSubmit = async (data) => {
        const newCat = {
            age: data.age,
            breed_id: data.breed.value,
            fur_color: data.fur,
            name: data.name,
            sex_id: data.sex.value
        }
        console.log(newCat);
        await CatService.addCat(newCat)
        navigate("/")
    };

    return (
        <>
            <h1>Add New Cat</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name:</label><br />
                <input className="w-100 form-control" {...register('name')} />
                <label>Age:</label><br />
                <input className="w-100 form-control" {...register('age')} />
                <label>Sex:</label><br />
                <Controller
                    name="sex"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={sexOptions}
                            isSearchable
                            placeholder="What is the cat's sex?"
                        />
                    )}
                />
                <label>Breed:</label><br />
                <Controller
                    name="breed"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={breedOptions}
                            isSearchable
                            placeholder="What is the cat's breed?"
                        />
                    )}
                />
                <label>Fur Color:</label><br />
                <input className="w-100 form-control" {...register('fur')} />< br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};