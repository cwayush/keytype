export declare const userDao: {
    createUser(data: any): Promise<{
        email: string;
        password: string | null;
        name: string | null;
        id: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    checkUserExist(id: string): Promise<boolean>;
    updateUser(id: string, data: any): Promise<{
        email: string;
        password: string | null;
        name: string | null;
        id: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserbyID(id: string): Promise<{
        email: string;
        password: string | null;
        name: string | null;
        id: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    getUserByEmail(email: string): Promise<{
        email: string;
        password: string | null;
        name: string | null;
        id: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    deleteUser(id: string): Promise<{
        email: string;
        password: string | null;
        name: string | null;
        id: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUsers(): Promise<{
        email: string;
        password: string | null;
        name: string | null;
        id: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
};
//# sourceMappingURL=dao.d.ts.map