import { SignUpInput } from '../../config/zvalidate';
export declare const userService: {
    createUser(value: SignUpInput): Promise<{
        email: string;
        password: string | null;
        name: string | null;
        id: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
    getUserByID(id: string): Promise<{
        email: string;
        password: string | null;
        name: string | null;
        id: string;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    getUsers(): Promise<{
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
//# sourceMappingURL=service.d.ts.map