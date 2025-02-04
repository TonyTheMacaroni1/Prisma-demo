import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import * as CatService from '../../services/';
import { useNavigate, useParams } from 'react-router-dom';


export const EditCat = ({ initialCount = 0 }) => {
    const { register, control, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    const [cat, setCat] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('fetching cat')
        const fetchData = async () => {
            const cat = await CatService.getCat(id)
            console.log(cat)
            setCat(cat)
            setIsLoading(false)
        }
        fetchData();
    }, [])


    const sexOptions = [
        { value: 1, label: 'Female' },
        { value: 2, label: 'Male' },
    ];

    const breedOptions = [
        { value: 1, label: 'Siamese' },
        { value: 2, label: 'British Shorthair' },
        { value: 3, label: 'Maine Coon' },
        { value: 4, label: 'Persian' }
    ]

    const onSubmit = async (data) => {
        const newCat = {
            age: data.age,
            breed_id: data.breed.value,
            fur_color: data.fur,
            name: data.name,
            sex_id: data.sex.value
        }
        console.log(`here`)
        await CatService.updateCat(id, newCat)
        console.log(`here2`)
        navigate("/")
        console.log(`here3`)
    };

    return (
        <>
            {
                isLoading ?
                    <h1>Data Loading</h1> :
                    <>
                        <h1>Edit {cat.name}'s Information</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Name:</label><br />
                            <input className="w-100 form-control" {...register('name')} defaultValue={cat.name} />
                            <label>Age:</label><br />
                            <input className="w-100 form-control" {...register('age')} defaultValue={cat.age}/>
                            <label>Sex:</label><br />
                            <Controller
                                name="sex"
                                control={control}
                                defaultValue={sexOptions.find(option => option.value === cat.sexes.id)}
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
                                defaultValue={breedOptions.find(option => option.value === cat.breeds.id)}
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
                            <input className="w-100 form-control" {...register('fur')} defaultValue={cat.fur_color}/>< br />
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    </>
            }
        </>
    );
};