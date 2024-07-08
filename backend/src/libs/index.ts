import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ICatDTO {
    age: number | null;
    name: string| null;
    breed_id: number | null;
    sex_id: number | null;
    fur_color: string | null;
};

export type IUpdateCatDTO = ICatDTO & { id: number };

export const getCat = async (id: number) => {
    return prisma.cats.findUnique({
        where: {
            id
        },
        include: {
            breeds: true,
            sexes: true
        },
    });
}

export const getCats = async () => {
    return prisma.cats.findMany({
        include: {
            breeds: true,
            sexes: true
        },
        orderBy: {
            id: 'asc'
        }
    });
}

export const createCat = async ({
    age,
    name,
    breed_id,
    sex_id,
    fur_color,
}: ICatDTO) => {
    return prisma.cats.create({
        data: {
            age,
            name,
            breed_id,
            sex_id,
            fur_color,
        }
    })
};

export const updateCat = async ({
    id,
    age,
    name,
    breed_id,
    sex_id,
    fur_color
}: IUpdateCatDTO) => {
    const cat = await prisma.cats.findUnique({
        where: {
            id
        }
    });

    if (!cat) {
        throw new Error('Cat not found');
    }

    return prisma.cats.update({
        where: {
            id
        },
        data: {
            age: age ?? cat.age,
            name: name ?? cat.name,
            breed_id: breed_id ?? cat.breed_id,
            sex_id: sex_id ?? cat.sex_id,
            fur_color: fur_color ?? cat.fur_color,
        }
    });
};

export const deleteCat = async (id: number) => {
    return prisma.cats.delete({
        where: {
            id
        }
    });
};